import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface CardConfig {
  type: string;
  title?: string;
  rows?: number;
  hours?: number;
  slot_minutes?: number;
  channels_entity?: string;
  current_entity?: string;
}

interface HassLike {
  states: Record<string, { attributes: Record<string, any> }>;
}

/**
 * Visual editor for OpenWebif Control Card, shown in Home Assistant's
 * "Edit card" dialog so users don't need to hand-write YAML.
 */
@customElement("openwebif-control-card-editor")
export class OpenWebifControlCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HassLike;
  @state() private _config!: CardConfig;

  public setConfig(config: CardConfig): void {
    this._config = { ...config };
  }

  private _emit(config: CardConfig): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _valueChanged(key: keyof CardConfig, ev: Event): void {
    const target = ev.target as HTMLInputElement;
    let value: string | number | undefined = target.value;
    if (target.type === "number") {
      value = value === "" ? undefined : Number(value);
    }
    const next = { ...this._config, [key]: value };
    if (value === "" || value === undefined) delete (next as any)[key];
    this._config = next;
    this._emit(next);
  }

  private _sensorOptions(suffix: string): string[] {
    if (!this.hass) return [];
    return Object.keys(this.hass.states).filter(
      (id) => id.startsWith("sensor.") && id.endsWith(suffix)
    );
  }

  protected render() {
    if (!this._config) return nothing;
    const chanOpts = this._sensorOptions("_channels");
    const curOpts = this._sensorOptions("_current_programme");

    return html`
      <div class="form">
        <label>
          <span>Title</span>
          <input
            type="text"
            .value=${this._config.title ?? "TV Guide"}
            @input=${(e: Event) => this._valueChanged("title", e)}
          />
        </label>

        <label>
          <span>Visible rows</span>
          <input
            type="number"
            min="1"
            max="30"
            .value=${String(this._config.rows ?? 8)}
            @input=${(e: Event) => this._valueChanged("rows", e)}
          />
        </label>

        <label>
          <span>Hours visible</span>
          <input
            type="number"
            min="1"
            max="12"
            .value=${String(this._config.hours ?? 3)}
            @input=${(e: Event) => this._valueChanged("hours", e)}
          />
        </label>

        <label>
          <span>Time tick (minutes)</span>
          <input
            type="number"
            min="10"
            max="60"
            step="5"
            .value=${String(this._config.slot_minutes ?? 30)}
            @input=${(e: Event) => this._valueChanged("slot_minutes", e)}
          />
        </label>

        <label>
          <span>Channels sensor (optional)</span>
          <select
            @change=${(e: Event) => this._valueChanged("channels_entity", e)}
          >
            <option value="">Auto-detect</option>
            ${chanOpts.map(
              (id) => html`<option
                value=${id}
                ?selected=${this._config.channels_entity === id}
              >
                ${id}
              </option>`
            )}
          </select>
        </label>

        <label>
          <span>Current-programme sensor (optional)</span>
          <select
            @change=${(e: Event) => this._valueChanged("current_entity", e)}
          >
            <option value="">Auto-detect</option>
            ${curOpts.map(
              (id) => html`<option
                value=${id}
                ?selected=${this._config.current_entity === id}
              >
                ${id}
              </option>`
            )}
          </select>
        </label>
      </div>
    `;
  }

  static styles = css`
    .form {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 8px 0;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.9rem;
      color: var(--primary-text-color, #fff);
    }
    label span {
      color: var(--secondary-text-color, #9e9e9e);
      font-size: 0.8rem;
    }
    input,
    select {
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      background: var(--card-background-color, #1c1c1c);
      color: var(--primary-text-color, #fff);
      font-size: 0.9rem;
    }
  `;
}
