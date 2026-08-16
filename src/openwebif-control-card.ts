import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { piconUrls, cachedResolved, rememberResolved } from "./picon";
import { loadFavourites, toggleFavourite } from "./favourites";

interface Channel {
  name: string;
  sref: string;
  bouquet?: string;
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

  private _epgBouquetLoaded = "";

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

  public getCardSize(): number {
    return (this._config?.rows || 8) + 2;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._favs = loadFavourites();
    // Align the window start to the previous half hour.
    const now = Math.floor(Date.now() / 1000);
    this._windowStart = now - (now % (30 * 60));
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("hass") || changed.has("_bouquet")) {
      this._loadEpg();
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
    const refs = this._epgBouquetRefs();
    if (!refs.length || this._loadingEpg) return;
    const key = refs.join("|");
    if (key === this._epgBouquetLoaded) return;
    this._loadingEpg = true;
    this._epgBouquetLoaded = key;
    try {
      const map = new Map<string, EpgEvent[]>();
      // Fetch category bouquets in parallel; merge (dedupe by sref+begin).
      const results = await Promise.all(
        refs.map((ref) =>
          this.hass
            .callService(
              DOMAIN,
              "get_epg",
              { bouquet_reference: ref, hours: this._config.hours || 3 },
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
          const arr = map.get(e.sref) || [];
          arr.push(e);
          map.set(e.sref, arr);
        }
      }
      for (const arr of map.values()) arr.sort((a, b) => a.begin - b.begin);
      this._epg = map;
    } catch (err) {
      console.error("openwebif-control-card: get_epg failed", err);
    } finally {
      this._loadingEpg = false;
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
    if (img.src) rememberResolved(name, img.src);
  }

  private _onPiconError(
    e: Event,
    urls: string[],
    idx: number
  ): void {
    const img = e.target as HTMLImageElement;
    if (idx + 1 < urls.length) {
      img.src = urls[idx + 1];
    } else {
      img.classList.add("failed");
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

    this._ensureDefaultBouquet();
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
          <div class="title">${this._config.title}</div>
          <div class="tabs">
            <button
              class="tab ${this._bouquet === "__fav__" ? "active" : ""}"
              @click=${() => (this._bouquet = "__fav__")}
              title="Favourites"
            >
              ★ Favourites
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

        <div class="guide" style="--rows:${rows}; --row-h:${ROW_HEIGHT}px">
          <!-- time header -->
          <div class="time-header" style="width:${windowWidth}px">
            ${this._timeTicks(hours, slot)}
          </div>

          <!-- scrollable body -->
          <div class="body" style="max-height:${rows * ROW_HEIGHT}px">
            ${channels.length === 0
              ? html`<div class="empty">
                  ${this._bouquet === "__fav__"
                    ? "No favourites yet — tap the ☆ on a channel to add one."
                    : "No channels."}
                </div>`
              : channels.map((c) =>
                  this._renderRow(c, dark, c.sref === currentSref, windowWidth)
                )}
            ${nowOffsetPx >= 0 && nowOffsetPx <= windowWidth
              ? html`<div
                  class="nowline"
                  style="left:calc(var(--chan-w) + ${nowOffsetPx}px)"
                ></div>`
              : nothing}
          </div>
        </div>

        ${this._selected ? this._renderDetail(this._selected) : nothing}
      </ha-card>
    `;
  }

  private _renderRow(
    channel: Channel,
    dark: boolean,
    active: boolean,
    windowWidth: number
  ) {
    const urls = piconUrls(channel.name, dark);
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
          <div class="chan-logo">
            ${startUrls.length
              ? html`<img
                  src=${startUrls[0]}
                  loading="lazy"
                  alt=${channel.name}
                  @load=${(e: Event) => this._onPiconLoad(e, channel.name)}
                  @error=${(e: Event) =>
                    this._onPiconError(e, startUrls, 0)}
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
    .title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--owc-text);
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
      overflow-x: auto;
      overflow-y: hidden;
    }
    .time-header {
      position: relative;
      height: 22px;
      margin-left: var(--chan-w);
      border-bottom: 1px solid var(--owc-border);
    }
    .tick {
      position: absolute;
      top: 0;
      font-size: 0.7rem;
      color: var(--owc-subtle);
      transform: translateX(-2px);
    }
    .body {
      position: relative;
      overflow-y: auto;
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
      z-index: 2;
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
    .chan-logo:not(:has(img)) .chan-fallback,
    .chan-logo:has(img.failed) .chan-fallback {
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
      z-index: 3;
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
  "%c OPENWEBIF-CONTROL-CARD %c v0.4.0 ",
  "background:#03a9f4;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px",
  "background:#333;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px"
);
