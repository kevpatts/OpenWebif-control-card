import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { piconUrls } from "./picon";

interface Channel {
  name: string;
  sref: string;
  bouquet?: string;
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
    data: Record<string, any>
  ) => Promise<unknown>;
}

interface CardConfig {
  type: string;
  channels_entity?: string;
  current_entity?: string;
  title?: string;
  columns?: number;
  show_search?: boolean;
}

const DOMAIN = "openwebif_control";

@customElement("openwebif-control-card")
export class OpenWebifControlCard extends LitElement {
  @property({ attribute: false }) public hass!: Hass;
  @state() private _config!: CardConfig;
  @state() private _filter = "";
  @state() private _bouquet = "";

  public setConfig(config: CardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = {
      columns: 4,
      show_search: true,
      title: "TV",
      ...config,
    };
  }

  public getCardSize(): number {
    return 8;
  }

  // ---- data helpers ------------------------------------------------------

  private _channelsEntityId(): string | undefined {
    if (this._config.channels_entity) return this._config.channels_entity;
    // Auto-discover the first *_channels sensor from this integration.
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

  private _channels(): Channel[] {
    const id = this._channelsEntityId();
    if (!id || !this.hass.states[id]) return [];
    return (this.hass.states[id].attributes.channels as Channel[]) || [];
  }

  private _bouquets(): string[] {
    const set = new Set<string>();
    for (const c of this._channels()) if (c.bouquet) set.add(c.bouquet);
    return Array.from(set).sort();
  }

  private _filtered(): Channel[] {
    let list = this._channels();
    if (this._bouquet) list = list.filter((c) => c.bouquet === this._bouquet);
    if (this._filter) {
      const f = this._filter.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(f));
    }
    return list;
  }

  private _currentSref(): string | undefined {
    const id = this._currentEntityId();
    const attrs = id ? this.hass.states[id]?.attributes : undefined;
    return attrs?.service_reference;
  }

  private _isDark(): boolean {
    return !!this.hass.themes?.darkMode;
  }

  // ---- actions -----------------------------------------------------------

  private async _zap(channel: Channel): Promise<void> {
    try {
      await this.hass.callService(DOMAIN, "zap", {
        service_reference: channel.sref,
      });
    } catch (err) {
      // Surface nothing intrusive; HA shows service errors in its own UI.
      console.error("openwebif-control-card: zap failed", err);
    }
  }

  private _onPiconError(e: Event, urls: string[], idx: number): void {
    const img = e.target as HTMLImageElement;
    if (idx + 1 < urls.length) {
      img.src = urls[idx + 1];
      img.dataset.idx = String(idx + 1);
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
          integration.
        </div></ha-card
      >`;
    }

    const channels = this._filtered();
    const currentSref = this._currentSref();
    const bouquets = this._bouquets();
    const dark = this._isDark();

    return html`
      <ha-card>
        <div class="header">
          <div class="title">${this._config.title}</div>
          ${this._config.show_search
            ? html`<input
                class="search"
                type="search"
                placeholder="Search channels…"
                .value=${this._filter}
                @input=${(e: Event) =>
                  (this._filter = (e.target as HTMLInputElement).value)}
              />`
            : nothing}
        </div>

        ${bouquets.length > 1
          ? html`<div class="chips">
              <button
                class="chip ${this._bouquet === "" ? "active" : ""}"
                @click=${() => (this._bouquet = "")}
              >
                All
              </button>
              ${bouquets.map(
                (b) => html`<button
                  class="chip ${this._bouquet === b ? "active" : ""}"
                  @click=${() => (this._bouquet = b)}
                  title=${b}
                >
                  ${b.replace(/ - All channels$/, "")}
                </button>`
              )}
            </div>`
          : nothing}

        <div
          class="grid"
          style="--owc-cols:${this._config.columns}"
        >
          ${channels.map((c) => this._renderTile(c, c.sref === currentSref, dark))}
        </div>
        ${channels.length === 0
          ? html`<div class="empty">No channels match.</div>`
          : nothing}
      </ha-card>
    `;
  }

  private _renderTile(channel: Channel, active: boolean, dark: boolean) {
    const urls = piconUrls(channel.name, dark);
    return html`
      <button
        class="tile ${active ? "active" : ""}"
        @click=${() => this._zap(channel)}
        title=${channel.name}
      >
        <div class="logo">
          ${urls.length
            ? html`<img
                src=${urls[0]}
                data-idx="0"
                loading="lazy"
                alt=${channel.name}
                @error=${(e: Event) => this._onPiconError(e, urls, 0)}
              />`
            : nothing}
          <span class="fallback">${channel.name}</span>
        </div>
        <div class="name">${channel.name}</div>
      </button>
    `;
  }

  static styles = css`
    :host {
      --owc-gap: 10px;
      --owc-radius: 14px;
      --owc-tile-bg: var(--card-background-color, #1c1c1c);
      --owc-tile-border: var(--divider-color, rgba(255, 255, 255, 0.1));
      --owc-accent: var(--primary-color, #03a9f4);
      --owc-text: var(--primary-text-color, #fff);
      --owc-subtle: var(--secondary-text-color, #9e9e9e);
    }
    ha-card {
      padding: 16px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
    }
    .title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--owc-text);
    }
    .search {
      flex: 0 1 220px;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid var(--owc-tile-border);
      background: var(--owc-tile-bg);
      color: var(--owc-text);
      font-size: 0.9rem;
      outline: none;
    }
    .search:focus {
      border-color: var(--owc-accent);
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 14px;
    }
    .chip {
      padding: 5px 12px;
      border-radius: 999px;
      border: 1px solid var(--owc-tile-border);
      background: transparent;
      color: var(--owc-subtle);
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .chip:hover {
      color: var(--owc-text);
    }
    .chip.active {
      background: var(--owc-accent);
      border-color: var(--owc-accent);
      color: var(--text-primary-color, #fff);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(var(--owc-cols, 4), 1fr);
      gap: var(--owc-gap);
    }
    .tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 14px 8px 10px;
      border-radius: var(--owc-radius);
      border: 1px solid var(--owc-tile-border);
      background: var(--owc-tile-bg);
      cursor: pointer;
      transition: transform 0.12s ease, border-color 0.12s ease,
        box-shadow 0.12s ease;
      color: var(--owc-text);
      font: inherit;
    }
    .tile:hover {
      transform: translateY(-2px);
      border-color: var(--owc-accent);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
    }
    .tile.active {
      border-color: var(--owc-accent);
      box-shadow: 0 0 0 2px var(--owc-accent) inset;
    }
    .logo {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo img {
      max-width: 88%;
      max-height: 88%;
      object-fit: contain;
    }
    .logo img.failed {
      display: none;
    }
    .logo img.failed + .fallback,
    .logo:has(img.failed) .fallback {
      display: block;
    }
    .fallback {
      display: none;
      font-size: 0.85rem;
      font-weight: 600;
      text-align: center;
      color: var(--owc-text);
      padding: 0 4px;
    }
    /* When no img at all, show fallback */
    .logo:not(:has(img)) .fallback {
      display: block;
    }
    .name {
      font-size: 0.72rem;
      color: var(--owc-subtle);
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
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

// Register with HA's card picker.
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "openwebif-control-card",
  name: "OpenWebif Control Card",
  description:
    "Sky Q-style channel grid for Enigma2/OpenWebif receivers (companion to the OpenWebif Control integration).",
  preview: true,
  documentation: "https://github.com/kevpatts/OpenWebif-control-card",
});

console.info(
  "%c OPENWEBIF-CONTROL-CARD %c v0.3.0 ",
  "background:#03a9f4;color:#fff;border-radius:3px 0 0 3px;padding:2px 4px",
  "background:#333;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px"
);
