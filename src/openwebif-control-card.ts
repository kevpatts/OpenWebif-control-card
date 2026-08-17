import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  piconUrls,
  cachedResolved,
  rememberResolved,
  markFailed,
  hasFailed,
  markUrlFailed,
} from "./picon";
import { loadFavourites, toggleFavourite } from "./favourites";
import "./editor";

interface Channel {
  name: string;
  sref: string;
  bouquet?: string;
}

interface Recording {
  name?: string;
  channel?: string;
  length?: string;
  begin?: string;
  size?: string;
  description?: string;
  serviceref?: string;
}

interface EpgEvent {
  sref: string;
  sname: string;
  title: string;
  begin: number; // unix seconds
  duration: number; // seconds
  shortdesc?: string;
  id?: number;
}

interface HassEntity {
  state: string;
  attributes: Record<string, any>;
}

interface Hass {
  states: Record<string, HassEntity>;
  themes?: { darkMode?: boolean };
  callService: (
    domain: string,
    service: string,
    data: Record<string, any>,
    target?: unknown,
    notify?: boolean,
    returnResponse?: boolean
  ) => Promise<any>;
}

interface CardConfig {
  type: string;
  channels_entity?: string;
  current_entity?: string;
  title?: string;
  rows?: number; // visible channel rows
  hours?: number; // hours of timeline visible per screen
  slot_minutes?: number; // time granularity for the header ticks
}

const DOMAIN = "openwebif_control";
const PX_PER_MINUTE = 6; // horizontal scale of the timeline
const ROW_HEIGHT = 56;

// OpenWebif EPG text arrives HTML-encoded (e.g. &#x27; &amp; &quot;). Decode it
// once for display. A textarea decodes all named/numeric entities safely.
const _decoder =
  typeof document !== "undefined" ? document.createElement("textarea") : null;
function decodeHtml(text: string | undefined): string {
  if (!text) return "";
  if (!_decoder) return text;
  _decoder.innerHTML = text;
  return _decoder.value;
}

@customElement("openwebif-control-card")
export class OpenWebifControlCard extends LitElement {
  @property({ attribute: false }) public hass!: Hass;
  @state() private _config!: CardConfig;
  @state() private _bouquet = ""; // bouquet name, or "__fav__" for favourites
  private _bouquetInitialised = false;
  @state() private _favs: Set<string> = new Set();
  @state() private _epg: Map<string, EpgEvent[]> = new Map();
  @state() private _loadingEpg = false;
  @state() private _selected?: EpgEvent;
  @state() private _windowStart = 0; // unix seconds, left edge of timeline
  // Vertical scroll offset of the guide, used to virtualise channel rows so a
  // large bouquet doesn't build hundreds of rows at once (the cause of the
  // browser "page unresponsive" freeze on tab switch).
  @state() private _scrollTop = 0;
  private _guideViewportH = 0;
  private _scrollRaf = 0;

  private _epgBouquetLoaded = "";
  private _epgLoadingKey = "";
  // Cache of grouped EPG per bouquet-key, with a fetch timestamp, so switching
  // tabs back and forth is instant and doesn't re-hit the box.
  private _epgCache: Map<
    string,
    { at: number; data: Map<string, EpgEvent[]> }
  > = new Map();
  // Background pre-fetch state: we warm every tab's EPG on idle so the first
  // switch to a tab is instant (no spinner, no first-visit fetch). Kept
  // throttled and single-flight so the box is never hammered.
  private _prefetchStarted = false;
  private _prefetching = false;
  private _prefetchTimer: number | null = null;
  // How long the card keeps its own EPG copy before asking the integration
  // again. The integration serves from a background-refreshed cache, so this
  // can be generous; the box is not hit on cache hits either side.
  private static EPG_TTL_MS = 10 * 60 * 1000;

  public setConfig(config: CardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = {
      rows: 8,
      hours: 3,
      slot_minutes: 30,
      title: "TV Guide",
      ...config,
    };
  }

  // Home Assistant visual editor hooks.
  public static getConfigElement(): HTMLElement {
    return document.createElement("openwebif-control-card-editor");
  }

  public static getStubConfig(): CardConfig {
    return { type: "custom:openwebif-control-card", title: "TV Guide" };
  }

  public getCardSize(): number {
    return (this._config?.rows || 8) + 2;
  }

  // Signatures of the entities we actually care about, so we can ignore the
  // constant stream of unrelated hass updates HA pushes.
  private _lastSig = "";

  connectedCallback(): void {
    super.connectedCallback();
    this._favs = loadFavourites();
    // Align the window start to the previous half hour.
    const now = Math.floor(Date.now() / 1000);
    this._windowStart = now - (now % (30 * 60));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._prefetchTimer != null) {
      window.clearTimeout(this._prefetchTimer);
      this._prefetchTimer = null;
    }
  }

  private _relevantSig(): string {
    // Build a cheap signature from only the entities/state this card renders,
    // so re-renders happen only when something we display actually changed.
    const chId = this._channelsEntityId();
    const curId = this._currentEntityId();
    const recId = this._recordingsEntityId();
    const ch = chId ? this.hass.states[chId] : undefined;
    const cur = curId ? this.hass.states[curId] : undefined;
    const rec = recId ? this.hass.states[recId] : undefined;
    return [
      ch?.state,
      (ch?.attributes.channels as unknown[] | undefined)?.length,
      cur?.attributes.service_reference,
      rec?.state,
      this._bouquet,
      this._loadingEpg ? "L" : "",
      this._epg.size,
      this._selected ? `${this._selected.sref}:${this._selected.begin}` : "",
      this._isStandby(),
      !!this.hass.themes?.darkMode,
    ].join("|");
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has("_config")) return true;
    // Local UI state always re-renders.
    if (
      changed.has("_bouquet") ||
      changed.has("_selected") ||
      changed.has("_epg") ||
      changed.has("_loadingEpg") ||
      changed.has("_favs") ||
      changed.has("_windowStart") ||
      changed.has("_scrollTop")
    ) {
      this._lastSig = this._relevantSig();
      return true;
    }
    // hass changed: only re-render if a relevant entity changed.
    if (changed.has("hass")) {
      const sig = this._relevantSig();
      if (sig === this._lastSig) return false;
      this._lastSig = sig;
      return true;
    }
    return true;
  }

  protected willUpdate(_changed: PropertyValues): void {
    // Pick a sensible default bouquet once, off the render path.
    if (!this._bouquetInitialised && this.hass && this._allChannels().length) {
      this._ensureDefaultBouquet();
    }
  }

  protected updated(changed: PropertyValues): void {
    // Load EPG only when the selected bouquet changes, or the first time we
    // have channel data. Never on routine hass pushes. _loadEpg itself serves
    // from cache instantly when possible, so tab switches don't re-fetch.
    if (changed.has("_bouquet")) {
      // New tab: reset the virtual-scroll position and the scroll container
      // itself, so a shorter list doesn't start scrolled off the top.
      this._scrollTop = 0;
      const guide = this.renderRoot?.querySelector(".guide") as HTMLElement | null;
      if (guide) guide.scrollTop = 0;
      this._loadEpg();
    } else if (
      !this._epgBouquetLoaded &&
      this._bouquet &&
      this._bouquet !== "__rec__" &&
      this._allChannels().length
    ) {
      this._loadEpg();
    }
    // Once we have channel/bouquet data, warm every tab's EPG in the
    // background so switching is instant. One-shot; internally throttled.
    if (!this._prefetchStarted && this.hass && this._bouquets().length) {
      this._startPrefetch();
    }
  }

  // ---- entity/data helpers ----------------------------------------------

  private _channelsEntityId(): string | undefined {
    if (this._config.channels_entity) return this._config.channels_entity;
    return Object.keys(this.hass.states).find(
      (id) => id.startsWith("sensor.") && id.endsWith("_channels")
    );
  }

  private _currentEntityId(): string | undefined {
    if (this._config.current_entity) return this._config.current_entity;
    return Object.keys(this.hass.states).find(
      (id) => id.startsWith("sensor.") && id.endsWith("_current_programme")
    );
  }

  private _allChannels(): Channel[] {
    const id = this._channelsEntityId();
    if (!id || !this.hass.states[id]) return [];
    return (this.hass.states[id].attributes.channels as Channel[]) || [];
  }

  private _bouquets(): string[] {
    const set = new Set<string>();
    for (const c of this._allChannels()) if (c.bouquet) set.add(c.bouquet);
    return Array.from(set).sort();
  }

  private _ensureDefaultBouquet(): void {
    if (this._bouquetInitialised) return;
    const bqs = this._bouquets();
    if (!bqs.length) return;
    // Default to the first category bouquet (skip the huge all-channels ones).
    const category =
      bqs.find(
        (n) => !/all channels/i.test(n) && !/last scanned/i.test(n)
      ) || bqs[0];
    this._bouquet = category;
    this._bouquetInitialised = true;
  }

  private _visibleChannels(): Channel[] {
    let list = this._allChannels();
    if (this._bouquet === "__fav__") {
      list = list.filter((c) => this._favs.has(c.sref));
    } else if (this._bouquet) {
      list = list.filter((c) => c.bouquet === this._bouquet);
    }
    return list;
  }

  private _currentSref(): string | undefined {
    const id = this._currentEntityId();
    return id ? this.hass.states[id]?.attributes?.service_reference : undefined;
  }

  // Best-effort standby state from the integration's standby binary_sensor,
  // used only to light up the power button. Returns undefined if not found.
  private _isStandby(): boolean | undefined {
    const id = Object.keys(this.hass.states).find(
      (i) => i.startsWith("binary_sensor.") && i.endsWith("_standby")
    );
    if (!id) return undefined;
    const st = this.hass.states[id]?.state;
    if (st === "on") return true;
    if (st === "off") return false;
    return undefined;
  }

  private _recordingsEntityId(): string | undefined {
    return Object.keys(this.hass.states).find(
      (i) => i.startsWith("sensor.") && i.endsWith("_recordings")
    );
  }

  private _recordings(): Recording[] {
    const id = this._recordingsEntityId();
    if (!id || !this.hass.states[id]) return [];
    return (this.hass.states[id].attributes.recordings as Recording[]) || [];
  }

  private _bouquetRefs(): Record<string, string> {
    const id = this._channelsEntityId();
    return (id && this.hass.states[id]?.attributes?.bouquet_refs) || {};
  }

  private _epgBouquetRefs(): string[] {
    // Which bouquet refs to fetch EPG for, based on the active tab.
    // Fetching is done one bouquet at a time to keep the box responsive;
    // "All channels" bouquets (2000+ services) are avoided as an EPG source.
    const refs = this._bouquetRefs();
    const names = Object.keys(refs);
    if (this._bouquet && this._bouquet !== "__fav__") {
      return refs[this._bouquet] ? [refs[this._bouquet]] : [];
    }
    // Favourites: fetch the (small set of) bouquets that hold the favourites.
    if (this._bouquet === "__fav__") {
      const favBouquets = new Set<string>();
      for (const c of this._allChannels()) {
        if (this._favs.has(c.sref) && c.bouquet) favBouquets.add(c.bouquet);
      }
      const list = [...favBouquets].filter(
        (n) => !/all channels/i.test(n) && refs[n]
      );
      return list.map((n) => refs[n]);
    }
    // Fallback: first reasonable category bouquet.
    const category = names.find(
      (n) => !/all channels/i.test(n) && !/last scanned/i.test(n)
    );
    return category ? [refs[category]] : names.length ? [refs[names[0]]] : [];
  }

  private async _loadEpg(): Promise<void> {
    // No EPG needed on the recordings tab.
    if (this._bouquet === "__rec__") return;

    // Never load EPG for a mega "All channels"/"Last Scanned" bucket — the
    // payload is huge and would freeze the page. Show the channel list only.
    if (this._bouquet && this._isMegaBouquet(this._bouquet)) {
      this._epg = new Map();
      this._epgBouquetLoaded = "";
      this._loadingEpg = false;
      return;
    }

    const refs = this._epgBouquetRefs();
    if (!refs.length) {
      this._epg = new Map();
      this._epgBouquetLoaded = "";
      this._loadingEpg = false;
      return;
    }
    const key = refs.join("|");

    // Serve from cache if fresh — instant, no network, no spinner. This is the
    // path a tab switch takes once the background pre-fetch has warmed it.
    const cached = this._epgCache.get(key);
    if (cached && Date.now() - cached.at < OpenWebifControlCard.EPG_TTL_MS) {
      this._epg = cached.data;
      this._epgBouquetLoaded = key;
      this._loadingEpg = false;
      return;
    }

    // Already showing this key's data and not stale? Nothing to do.
    if (key === this._epgBouquetLoaded && this._epg.size && !this._loadingEpg) {
      return;
    }
    // A load for this key is already in flight.
    if (this._loadingEpg && this._epgLoadingKey === key) return;

    this._loadingEpg = true;
    this._epgLoadingKey = key;
    try {
      const map = await this._fetchEpg(refs, key);
      if (map) {
        this._epg = map;
        this._epgBouquetLoaded = key;
      }
    } catch (err) {
      console.error("openwebif-control-card: get_epg failed", err);
    } finally {
      this._loadingEpg = false;
      this._epgLoadingKey = "";
    }
  }

  // Fetch + group + cache EPG for a set of bouquet refs. Shared by the active
  // tab loader and the background pre-fetcher. Serves from cache when fresh so
  // the box is never hit twice for the same warm key.
  private async _fetchEpg(
    refs: string[],
    key: string
  ): Promise<Map<string, EpgEvent[]> | null> {
    const cached = this._epgCache.get(key);
    if (cached && Date.now() - cached.at < OpenWebifControlCard.EPG_TTL_MS) {
      return cached.data;
    }
    const map = new Map<string, EpgEvent[]>();
    // Fetch category bouquets in parallel; merge (dedupe by sref+begin).
    const results = await Promise.all(
      refs.map((ref) =>
        this.hass
          .callService(
            DOMAIN,
            "get_epg",
            // Ask for a wide window (5h) so scrolling forward stays populated;
            // the integration caches and windows this server-side.
            { bouquet_reference: ref, hours: 5 },
            undefined,
            false,
            true
          )
          .catch(() => undefined)
      )
    );
    const seen = new Set<string>();
    for (const resp of results) {
      const events: EpgEvent[] = resp?.response?.events || resp?.events || [];
      for (const e of events) {
        if (!e.sref) continue;
        const k = `${e.sref}:${e.begin}`;
        if (seen.has(k)) continue;
        seen.add(k);
        // Decode HTML entities in display text up front.
        e.title = decodeHtml(e.title);
        if (e.shortdesc) e.shortdesc = decodeHtml(e.shortdesc);
        const arr = map.get(e.sref) || [];
        arr.push(e);
        map.set(e.sref, arr);
      }
    }
    for (const arr of map.values()) arr.sort((a, b) => a.begin - b.begin);
    this._epgCache.set(key, { at: Date.now(), data: map });
    return map;
  }

  // ---- background pre-fetch (warm every tab) -----------------------------

  // Map a bouquet name to the refs the EPG loader would use for that tab.
  private _refsForBouquet(name: string): string[] {
    const refs = this._bouquetRefs();
    return refs[name] ? [refs[name]] : [];
  }

  // "Mega" buckets that are unusable as a grid and carry enormous EPG payloads
  // (a single 1000-channel bouquet = tens of thousands of events / many MB,
  // which freezes the page). We never auto-load or pre-fetch these.
  private _isMegaBouquet(name: string): boolean {
    return /all channels|last scanned/i.test(name);
  }

  // Kick off a one-time, throttled warm of every category bouquet's EPG so
  // switching tabs is instant. Runs off the render path, one bouquet at a
  // time with a gap between calls so the box stays responsive (heavy bouquets
  // like Entertainment can take several seconds server-side).
  private _startPrefetch(): void {
    if (this._prefetchStarted) return;
    this._prefetchStarted = true;
    const schedule = (cb: () => void) => {
      const ric = (window as any).requestIdleCallback as
        | ((cb: () => void, opts?: any) => number)
        | undefined;
      if (ric) ric(cb, { timeout: 3000 });
      else window.setTimeout(cb, 500);
    };
    schedule(() => this._prefetchNext());
  }

  private async _prefetchNext(): Promise<void> {
    if (this._prefetching) return;
    this._prefetching = true;
    try {
      // Warm the tabs the user can switch to so every switch is instant. Only
      // bouquets that have an EPG ref, and never the huge "All channels" /
      // "Last Scanned" buckets — those can be 1000+ channels / tens of
      // thousands of events (many MB) and would freeze the page. The
      // integration tags channels with category bouquets, so real category
      // tabs are always available to warm.
      const names = this._bouquets().filter(
        (n) => this._refsForBouquet(n).length && !this._isMegaBouquet(n)
      );
      const ordered = this._bouquet && names.includes(this._bouquet)
        ? [this._bouquet, ...names.filter((n) => n !== this._bouquet)]
        : names;
      for (const name of ordered) {
        const refs = this._refsForBouquet(name);
        if (!refs.length) continue;
        const key = refs.join("|");
        const cached = this._epgCache.get(key);
        if (cached && Date.now() - cached.at < OpenWebifControlCard.EPG_TTL_MS) {
          continue; // already warm
        }
        try {
          const map = await this._fetchEpg(refs, key);
          // If this bouquet is the one on screen and we weren't showing data
          // yet, adopt it so the guide fills in without a manual switch.
          if (
            map &&
            name === this._bouquet &&
            this._epgBouquetLoaded !== key
          ) {
            this._epg = map;
            this._epgBouquetLoaded = key;
            this._loadingEpg = false;
          }
        } catch (err) {
          console.warn("openwebif-control-card: prefetch failed for", name, err);
        }
        // Gentle gap between bouquets so we never flood the receiver.
        await new Promise((r) => window.setTimeout(r, 1200));
      }
    } finally {
      this._prefetching = false;
    }
  }

  // ---- actions -----------------------------------------------------------

  private async _zap(sref: string): Promise<void> {
    try {
      await this.hass.callService(DOMAIN, "zap", { service_reference: sref });
    } catch (err) {
      console.error("openwebif-control-card: zap failed", err);
    }
  }

  // ---- header controls (power + standard remote keys) --------------------

  private async _toggleStandby(): Promise<void> {
    try {
      await this.hass.callService(DOMAIN, "toggle_standby", {});
    } catch (err) {
      console.error("openwebif-control-card: toggle_standby failed", err);
    }
  }

  private async _key(command: number): Promise<void> {
    try {
      await this.hass.callService(DOMAIN, "remote_control", { command });
    } catch (err) {
      console.error("openwebif-control-card: remote_control failed", err);
    }
  }

  private async _record(ev: EpgEvent): Promise<void> {
    if (ev.id == null) return;
    try {
      await this.hass.callService(DOMAIN, "add_timer", {
        service_reference: ev.sref,
        event_id: ev.id,
      });
    } catch (err) {
      console.error("openwebif-control-card: add_timer failed", err);
    }
  }

  private _toggleFav(sref: string, e: Event): void {
    e.stopPropagation();
    this._favs = toggleFavourite(this._favs, sref);
  }

  private _onPiconLoad(e: Event, name: string): void {
    const img = e.target as HTMLImageElement;
    // Reveal only once a real image has decoded, so the browser's broken-image
    // glyph never flashes.
    img.classList.add("loaded");
    if (img.src) rememberResolved(name, img.src);
  }

  private _onPiconError(
    e: Event,
    name: string,
    urls: string[],
    idx: number
  ): void {
    const img = e.target as HTMLImageElement;
    // Remember this specific URL is broken so it's never offered again.
    if (urls[idx]) markUrlFailed(urls[idx]);
    if (idx + 1 < urls.length) {
      img.dataset.idx = String(idx + 1);
      img.src = urls[idx + 1];
    } else {
      // All candidates failed: remember this channel permanently so we never
      // request its SVGs again on future re-renders (stops the 404 loop).
      markFailed(name);
      img.classList.add("failed");
      const logo = img.parentElement;
      if (logo) logo.classList.add("no-picon");
    }
  }

  // ---- render ------------------------------------------------------------

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const id = this._channelsEntityId();
    if (!id) {
      return html`<ha-card
        ><div class="empty">
          No OpenWebif Control channels sensor found. Install and configure the
          <a href="https://github.com/kevpatts/OpenWebif-control"
            >OpenWebif Control</a
          >
          integration (v0.2.0+).
        </div></ha-card
      >`;
    }

    const channels = this._visibleChannels();
    const dark = !!this.hass.themes?.darkMode;
    const currentSref = this._currentSref();
    const rows = this._config.rows || 8;
    const hours = this._config.hours || 3;
    const slot = this._config.slot_minutes || 30;

    const windowWidth = hours * 60 * PX_PER_MINUTE;
    const nowSec = Math.floor(Date.now() / 1000);
    const nowOffsetPx =
      ((nowSec - this._windowStart) / 60) * PX_PER_MINUTE;

    return html`
      <ha-card>
        <div class="topbar">
          <div class="heading">
            <div class="title">${this._config.title}</div>
            ${this._renderControls()}
          </div>
          <div class="tabs">
            <button
              class="tab ${this._bouquet === "__fav__" ? "active" : ""}"
              @click=${() => (this._bouquet = "__fav__")}
              title="Favourites"
            >
              ★ Favourites
            </button>
            <button
              class="tab ${this._bouquet === "__rec__" ? "active" : ""}"
              @click=${() => (this._bouquet = "__rec__")}
              title="Recordings"
            >
              📼 Recordings
            </button>
            ${this._bouquets().map(
              (b) => html`<button
                class="tab ${this._bouquet === b ? "active" : ""}"
                @click=${() => (this._bouquet = b)}
                title=${b}
              >
                ${b.replace(/ - All channels$/, "")}
              </button>`
            )}
          </div>
        </div>

        ${this._bouquet === "__rec__"
          ? this._renderRecordings()
          : this._renderGuideBlock(
              channels,
              dark,
              currentSref,
              rows,
              hours,
              slot,
              windowWidth,
              nowOffsetPx
            )}
        ${this._selected ? this._renderDetail(this._selected) : nothing}
      </ha-card>
    `;
  }

  // Standard TV controls shown beside the heading. Enigma2 remote key codes:
  // MUTE=113, VOL-=114, VOL+=115, CH+=402, CH-=403, INFO=358. Power uses the
  // toggle_standby service (cleaner than KEY_POWER, which can deep-power-off).
  private _renderControls() {
    const standby = this._isStandby();
    return html`
      <div class="controls" role="group" aria-label="Receiver controls">
        <button
          class="ctrl power ${standby === true ? "off" : standby === false ? "on" : ""}"
          @click=${() => this._toggleStandby()}
          title=${standby === true
            ? "Power on (wake from standby)"
            : standby === false
            ? "Power off (standby)"
            : "Toggle standby"}
        >
          ⏻
        </button>
        <span class="ctrl-sep"></span>
        <button class="ctrl" @click=${() => this._key(403)} title="Channel down">
          CH–
        </button>
        <button class="ctrl" @click=${() => this._key(402)} title="Channel up">
          CH+
        </button>
        <span class="ctrl-sep"></span>
        <button class="ctrl" @click=${() => this._key(114)} title="Volume down">
          🔉
        </button>
        <button class="ctrl" @click=${() => this._key(113)} title="Mute">
          🔇
        </button>
        <button class="ctrl" @click=${() => this._key(115)} title="Volume up">
          🔊
        </button>
        <span class="ctrl-sep"></span>
        <button class="ctrl" @click=${() => this._key(358)} title="Info">
          ℹ︎
        </button>
      </div>
    `;
  }

  // Throttle scroll -> state via rAF so we virtualise without thrashing.
  private _onGuideScroll(e: Event): void {
    const el = e.currentTarget as HTMLElement;
    if (this._scrollRaf) return;
    this._scrollRaf = window.requestAnimationFrame(() => {
      this._scrollRaf = 0;
      this._guideViewportH = el.clientHeight;
      // Only update if it moved by at least half a row, to limit re-renders.
      if (Math.abs(el.scrollTop - this._scrollTop) >= ROW_HEIGHT / 2) {
        this._scrollTop = el.scrollTop;
      }
    });
  }

  private _renderGuideBlock(
    channels: Channel[],
    dark: boolean,
    currentSref: string | undefined,
    rows: number,
    hours: number,
    slot: number,
    windowWidth: number,
    nowOffsetPx: number
  ) {
    // ---- row virtualisation ----------------------------------------------
    // Render only the channel rows near the viewport, with spacer divs top and
    // bottom so the scrollbar and now-line geometry stay correct. This keeps
    // the DOM small (a few dozen rows) no matter how large the bouquet is.
    const total = channels.length;
    const viewportH = this._guideViewportH || rows * ROW_HEIGHT;
    const OVERSCAN = 4; // rows of buffer above/below the viewport
    const first = Math.max(
      0,
      Math.floor(this._scrollTop / ROW_HEIGHT) - OVERSCAN
    );
    const visibleCount = Math.ceil(viewportH / ROW_HEIGHT) + OVERSCAN * 2;
    const last = Math.min(total, first + visibleCount);
    const slice = channels.slice(first, last);
    const topPad = first * ROW_HEIGHT;
    const bottomPad = Math.max(0, (total - last) * ROW_HEIGHT);

    return html`
        <div class="timeline-controls">
          <button
            class="nav"
            @click=${() =>
              (this._windowStart -= slot * 60)}
            title="Earlier"
          >
            ‹
          </button>
          <span class="range"
            >${this._fmtTime(this._windowStart)} –
            ${this._fmtTime(this._windowStart + hours * 3600)}</span
          >
          <button
            class="nav"
            @click=${() => (this._windowStart += slot * 60)}
            title="Later"
          >
            ›
          </button>
          ${this._loadingEpg
            ? html`<span class="loading">loading guide…</span>`
            : nothing}
        </div>

        <div
          class="guide"
          style="--rows:${rows}; --row-h:${ROW_HEIGHT}px; max-height:${
            rows * ROW_HEIGHT + 24
          }px"
          @scroll=${(e: Event) => this._onGuideScroll(e)}
        >
          <!-- one scroll container: header row + channel rows share the same
               horizontal + vertical scroll -->
          <div class="scroller" style="--track-w:${windowWidth}px">
            <!-- sticky time header, scrolls horizontally with the tracks -->
            <div class="time-header">
              <div class="corner"></div>
              <div class="ticks" style="width:${windowWidth}px">
                ${this._timeTicks(hours, slot)}
              </div>
            </div>

            ${total === 0
              ? html`<div class="empty">
                  ${this._bouquet === "__fav__"
                    ? "No favourites yet — tap the ☆ on a channel to add one."
                    : "No channels."}
                </div>`
              : html`<div
                  class="rows"
                  style="height:${total * ROW_HEIGHT}px"
                >
                  ${nowOffsetPx >= 0 && nowOffsetPx <= windowWidth
                    ? html`<div
                        class="nowline"
                        style="left:calc(var(--chan-w) + ${nowOffsetPx}px)"
                      ></div>`
                    : nothing}
                  <!-- only the rows near the viewport are rendered; spacers
                       above/below preserve total scroll height -->
                  ${topPad ? html`<div style="height:${topPad}px"></div>` : nothing}
                  ${slice.map((c) =>
                    this._renderRow(
                      c,
                      dark,
                      c.sref === currentSref,
                      windowWidth
                    )
                  )}
                  ${bottomPad
                    ? html`<div style="height:${bottomPad}px"></div>`
                    : nothing}
                </div>`}
          </div>
        </div>
    `;
  }

  private _parseLength(length: string | undefined): number {
    // "mm:ss" or "h:mm:ss" -> total seconds. Returns 0 if unknown.
    if (!length) return 0;
    const parts = length.split(":").map((p) => parseInt(p, 10));
    if (parts.some((n) => isNaN(n))) return 0;
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  }

  private _fmtDuration(totalSec: number): string {
    if (!totalSec) return "";
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
  }

  private async _playRecording(
    r: Recording,
    percent?: number
  ): Promise<void> {
    if (!r.serviceref) return;
    try {
      await this.hass.callService(DOMAIN, "play_recording", {
        service_reference: r.serviceref,
        ...(percent != null ? { position_percent: Math.round(percent) } : {}),
      });
    } catch (err) {
      console.error("openwebif-control-card: play_recording failed", err);
    }
  }

  private _scrubPct(e: MouseEvent): number {
    const bar = e.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    return Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    );
  }

  private _onScrubberMove(e: MouseEvent): void {
    const bar = e.currentTarget as HTMLElement;
    const fill = bar.querySelector(".rec-scrub-fill") as HTMLElement | null;
    if (fill) fill.style.width = `${this._scrubPct(e)}%`;
  }

  private _onScrubberClick(e: MouseEvent, r: Recording): void {
    this._playRecording(r, this._scrubPct(e));
  }

  private _renderRecordings() {
    const recs = this._recordings();
    if (!recs.length) {
      return html`<div class="empty">No recordings found.</div>`;
    }
    return html`
      <div class="rec-list">
        ${recs.map((r: Recording) => {
          const dur = this._parseLength(r.length);
          return html`<div class="rec-row">
            <div class="rec-info">
              <div class="rec-title" title=${r.name || ""}>${r.name}</div>
              <div class="rec-meta">
                ${[r.channel, r.begin, r.size].filter(Boolean).join(" · ")}
              </div>
              ${r.description
                ? html`<div class="rec-desc">${r.description}</div>`
                : nothing}
            </div>
            <div class="rec-scrub-wrap">
              <button
                class="rec-play"
                title="Play from start"
                @click=${() => this._playRecording(r, 0)}
                ?disabled=${!r.serviceref}
              >
                ▶
              </button>
              <div
                class="rec-scrubber"
                title="Click to start playback from that point"
                @mousemove=${(e: MouseEvent) => this._onScrubberMove(e)}
                @click=${(e: MouseEvent) => this._onScrubberClick(e, r)}
              >
                <div class="rec-scrub-fill"></div>
                <div class="rec-scrub-dur">${this._fmtDuration(dur)}</div>
              </div>
            </div>
          </div>`;
        })}
      </div>
    `;
  }

  private _renderRow(
    channel: Channel,
    dark: boolean,
    active: boolean,
    windowWidth: number
  ) {
    // If we already know this channel has no logo, skip the <img> entirely and
    // render the text tile — no repeated 404 requests on re-render.
    const failed = hasFailed(channel.name);
    const urls = failed ? [] : piconUrls(channel.name, dark);
    const known = cachedResolved(channel.name);
    const startUrls = known
      ? [known, ...urls.filter((u) => u !== known)]
      : urls;
    const events = this._epg.get(channel.sref) || [];
    const isFav = this._favs.has(channel.sref);

    return html`
      <div class="row ${active ? "active" : ""}">
        <div class="chan" @click=${() => this._zap(channel.sref)}>
          <button
            class="star ${isFav ? "on" : ""}"
            @click=${(e: Event) => this._toggleFav(channel.sref, e)}
            title=${isFav ? "Remove favourite" : "Add favourite"}
          >
            ${isFav ? "★" : "☆"}
          </button>
          <div class="chan-logo ${startUrls.length ? "" : "no-picon"}">
            ${startUrls.length
              ? html`<img
                  src=${startUrls[0]}
                  data-idx="0"
                  loading="lazy"
                  decoding="async"
                  alt=""
                  @load=${(e: Event) => this._onPiconLoad(e, channel.name)}
                  @error=${(e: Event) =>
                    this._onPiconError(e, channel.name, startUrls, 0)}
                />`
              : nothing}
            <span class="chan-fallback">${channel.name}</span>
          </div>
        </div>
        <div class="track" style="width:${windowWidth}px">
          ${events.map((ev) => this._renderEvent(ev, windowWidth))}
        </div>
      </div>
    `;
  }

  private _renderEvent(ev: EpgEvent, windowWidth: number) {
    const startMin = (ev.begin - this._windowStart) / 60;
    const durMin = ev.duration / 60;
    const leftPx = startMin * PX_PER_MINUTE;
    const widthPx = durMin * PX_PER_MINUTE;
    // Cull events entirely outside the window.
    if (leftPx + widthPx < 0 || leftPx > windowWidth) return nothing;
    const clampedLeft = Math.max(0, leftPx);
    const clampedWidth = Math.min(widthPx + Math.min(0, leftPx), windowWidth);
    const isSelected = this._selected?.id === ev.id && this._selected?.sref === ev.sref;
    return html`
      <button
        class="event ${isSelected ? "selected" : ""}"
        style="left:${clampedLeft}px; width:${Math.max(clampedWidth, 12)}px"
        @click=${() => (this._selected = ev)}
        title=${ev.title}
      >
        <span class="ev-time">${this._fmtTime(ev.begin)}</span>
        <span class="ev-title">${ev.title}</span>
      </button>
    `;
  }

  private _renderDetail(ev: EpgEvent) {
    return html`
      <div class="detail">
        <div class="detail-main">
          <div class="detail-time">
            ${this._fmtTime(ev.begin)} –
            ${this._fmtTime(ev.begin + ev.duration)} · ${ev.sname}
          </div>
          <div class="detail-title">${ev.title}</div>
          ${ev.shortdesc
            ? html`<div class="detail-desc">${ev.shortdesc}</div>`
            : nothing}
        </div>
        <div class="detail-actions">
          <button @click=${() => this._zap(ev.sref)}>Watch</button>
          ${ev.id != null
            ? html`<button @click=${() => this._record(ev)}>Record</button>`
            : nothing}
          <button class="ghost" @click=${() => (this._selected = undefined)}>
            Close
          </button>
        </div>
      </div>
    `;
  }

  private _timeTicks(hours: number, slot: number) {
    const ticks = [];
    const total = (hours * 60) / slot;
    for (let i = 0; i <= total; i++) {
      const t = this._windowStart + i * slot * 60;
      ticks.push(
        html`<span
          class="tick"
          style="left:${i * slot * PX_PER_MINUTE}px"
          >${this._fmtTime(t)}</span
        >`
      );
    }
    return ticks;
  }

  private _fmtTime(unixSec: number): string {
    const d = new Date(unixSec * 1000);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  static styles = css`
    :host {
      --owc-radius: 10px;
      --owc-accent: var(--primary-color, #03a9f4);
      --owc-text: var(--primary-text-color, #fff);
      --owc-subtle: var(--secondary-text-color, #9e9e9e);
      --owc-tile-bg: var(--card-background-color, #1c1c1c);
      --owc-border: var(--divider-color, rgba(255, 255, 255, 0.1));
      --chan-w: 128px;
    }
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
      flex-wrap: wrap;
    }
    .heading {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--owc-text);
    }
    .controls {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ctrl {
      min-width: 32px;
      height: 30px;
      padding: 0 8px;
      border-radius: 8px;
      border: 1px solid var(--owc-border);
      background: var(--owc-tile-bg);
      color: var(--owc-text);
      cursor: pointer;
      font-size: 0.82rem;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.12s ease, background 0.12s ease,
        color 0.12s ease;
    }
    .ctrl:hover {
      border-color: var(--owc-accent);
    }
    .ctrl:active {
      background: var(--owc-accent);
      color: var(--text-primary-color, #fff);
    }
    .ctrl.power {
      font-size: 1rem;
    }
    /* Power button colour hint: green ring when on, red when in standby. */
    .ctrl.power.on {
      color: #4caf50;
      border-color: #4caf50;
    }
    .ctrl.power.off {
      color: #f44336;
      border-color: #f44336;
    }
    .ctrl-sep {
      width: 1px;
      height: 18px;
      background: var(--owc-border);
      margin: 0 2px;
    }
    .tabs {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .tab {
      padding: 5px 12px;
      border-radius: 999px;
      border: 1px solid var(--owc-border);
      background: transparent;
      color: var(--owc-subtle);
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .tab:hover {
      color: var(--owc-text);
    }
    .tab.active {
      background: var(--owc-accent);
      border-color: var(--owc-accent);
      color: var(--text-primary-color, #fff);
    }
    .timeline-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
      color: var(--owc-subtle);
      font-size: 0.85rem;
    }
    .nav {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid var(--owc-border);
      background: var(--owc-tile-bg);
      color: var(--owc-text);
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
    }
    .loading {
      font-style: italic;
    }
    .guide {
      overflow: auto;
      position: relative;
    }
    .scroller {
      position: relative;
      width: calc(var(--chan-w) + var(--track-w));
    }
    .time-header {
      display: flex;
      position: sticky;
      top: 0;
      z-index: 5;
      height: 22px;
      background: var(--card-background-color, #161b22);
      border-bottom: 1px solid var(--owc-border);
    }
    .corner {
      width: var(--chan-w);
      min-width: var(--chan-w);
      position: sticky;
      left: 0;
      z-index: 6;
      background: var(--card-background-color, #161b22);
      border-right: 1px solid var(--owc-border);
    }
    .ticks {
      position: relative;
      height: 100%;
    }
    .tick {
      position: absolute;
      top: 4px;
      font-size: 0.7rem;
      color: var(--owc-subtle);
      transform: translateX(-2px);
    }
    .rows {
      position: relative;
    }
    .row {
      display: flex;
      height: var(--row-h);
      border-bottom: 1px solid var(--owc-border);
    }
    .row.active .chan {
      box-shadow: inset 3px 0 0 var(--owc-accent);
    }
    .chan {
      width: var(--chan-w);
      min-width: var(--chan-w);
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 8px;
      cursor: pointer;
      position: sticky;
      left: 0;
      /* Above the now-line so the line disappears behind the channel column. */
      z-index: 4;
      background: var(--owc-tile-bg);
      border-right: 1px solid var(--owc-border);
    }
    .star {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      color: var(--owc-subtle);
      padding: 0;
      line-height: 1;
    }
    .star.on {
      color: gold;
    }
    .chan-logo {
      position: relative;
      flex: 1;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .chan-logo img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      /* Hidden until it successfully decodes, so no broken-image flash. */
      opacity: 0;
      transition: opacity 0.15s ease;
    }
    .chan-logo img.loaded {
      opacity: 1;
    }
    .chan-logo img.failed {
      display: none;
    }
    .chan-fallback {
      display: none;
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--owc-text);
      text-align: center;
    }
    /* Show the text tile only when there is genuinely no picon. */
    .chan-logo.no-picon .chan-fallback {
      display: block;
    }
    .track {
      position: relative;
      height: 100%;
    }
    .event {
      position: absolute;
      top: 4px;
      bottom: 4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
      padding: 2px 8px;
      border-radius: var(--owc-radius);
      border: 1px solid var(--owc-border);
      background: var(--owc-tile-bg);
      color: var(--owc-text);
      cursor: pointer;
      overflow: hidden;
      text-align: left;
      font: inherit;
      transition: border-color 0.12s ease, background 0.12s ease;
    }
    .event:hover {
      border-color: var(--owc-accent);
    }
    .event.selected {
      border-color: var(--owc-accent);
      box-shadow: 0 0 0 1px var(--owc-accent) inset;
    }
    .ev-time {
      font-size: 0.65rem;
      color: var(--owc-subtle);
    }
    .ev-title {
      font-size: 0.78rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .nowline {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--owc-accent);
      /* Below the sticky channel column (z 4) but above event tiles. */
      z-index: 1;
      pointer-events: none;
    }
    .detail {
      margin-top: 10px;
      padding: 12px;
      border-radius: var(--owc-radius);
      border: 1px solid var(--owc-border);
      background: var(--owc-tile-bg);
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .detail-time {
      font-size: 0.75rem;
      color: var(--owc-subtle);
      margin-bottom: 4px;
    }
    .detail-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--owc-text);
    }
    .detail-desc {
      margin-top: 6px;
      font-size: 0.85rem;
      color: var(--owc-subtle);
      max-width: 640px;
    }
    .detail-actions {
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }
    .detail-actions button {
      padding: 8px 16px;
      border-radius: 999px;
      border: none;
      background: var(--owc-accent);
      color: var(--text-primary-color, #fff);
      cursor: pointer;
      font-size: 0.85rem;
    }
    .detail-actions button.ghost {
      background: transparent;
      border: 1px solid var(--owc-border);
      color: var(--owc-subtle);
    }
    .empty {
      padding: 24px;
      text-align: center;
      color: var(--owc-subtle);
    }
    .rec-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 4px 2px;
    }
    .rec-row {
      border: 1px solid var(--owc-border);
      border-radius: var(--owc-radius);
      background: var(--owc-tile-bg);
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .rec-info {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .rec-title {
      font-weight: 600;
      color: var(--owc-text);
    }
    .rec-meta {
      font-size: 0.72rem;
      color: var(--owc-subtle);
    }
    .rec-desc {
      font-size: 0.8rem;
      color: var(--owc-subtle);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .rec-scrub-wrap {
      display: flex;
      align-items: stretch;
      gap: 10px;
    }
    .rec-play {
      flex: 0 0 auto;
      width: 38px;
      border-radius: 8px;
      border: none;
      background: var(--owc-accent);
      color: var(--text-primary-color, #fff);
      cursor: pointer;
      font-size: 0.9rem;
    }
    .rec-play[disabled] {
      opacity: 0.5;
      cursor: default;
    }
    /* The scrubber represents the original recorded timeline. Click anywhere
       to start playback from roughly that point. */
    .rec-scrubber {
      position: relative;
      flex: 1;
      height: 38px;
      border-radius: 8px;
      background: linear-gradient(
        var(--owc-border),
        var(--owc-border)
      );
      background-color: rgba(127, 127, 127, 0.12);
      cursor: pointer;
      overflow: hidden;
      border: 1px solid var(--owc-border);
    }
    .rec-scrubber:hover .rec-scrub-fill {
      opacity: 0.35;
    }
    .rec-scrub-fill {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 0;
      background: var(--owc-accent);
      opacity: 0;
      transition: opacity 0.12s ease;
    }
    .rec-scrubber:hover::after {
      /* subtle progress preview handled by fill; keep marker simple */
    }
    .rec-scrub-dur {
      position: absolute;
      right: 8px;
      bottom: 4px;
      font-size: 0.7rem;
      color: var(--owc-subtle);
      pointer-events: none;
    }
    a {
      color: var(--owc-accent);
    }
  `;
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "openwebif-control-card",
  name: "OpenWebif Control Card",
  description:
    "Sky Q-style EPG timeline grid for Enigma2/OpenWebif receivers (companion to the OpenWebif Control integration).",
  preview: true,
  documentation: "https://github.com/kevpatts/OpenWebif-control-card",
});

console.info(
  "%c OPENWEBIF-CONTROL-CARD %c v0.8.1 ",
  "background:#03a9f4;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px",
  "background:#333;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px"
);
