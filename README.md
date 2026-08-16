# OpenWebif Control Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

A modern, minimalist, themeable **Home Assistant Lovelace card** for
Enigma2 / OpenWebif receivers (Vu+, Dreambox, Zgemma, etc.).

This is the **dashboard companion** to the
[OpenWebif Control integration](https://github.com/kevpatts/OpenWebif-control).
The integration provides the data and control entities; this card renders a
**Sky Q-style channel grid** on top of them.

> **v0.3 — channel grid.** Tap a channel to zap the box. Recordings gallery and
> a full EPG grid are planned for later releases.

---

## Features

- **Channel grid** across *all* bouquets (FreeSat, Saorview, favourites…),
  de-duplicated and filtered to real, playable channels.
- **Tap to zap** — changes the channel on the receiver via the integration's
  `zap` service.
- **Channel logos (picons)** resolved automatically from the public
  [`picons/picons`](https://github.com/picons/picons) set via the jsDelivr CDN —
  **no picon pack needs to be installed on your box**. Channels without a match
  fall back to a clean text tile.
- **HA-native theming** — every colour is driven by your Home Assistant theme's
  CSS variables, so the card automatically matches light/dark/custom themes.
  Dark-mode picon variants are used automatically.
- **Search** and optional **bouquet filter** chips.
- Highlights the **currently-tuned** channel.

---

## Requirements

1. The [**OpenWebif Control** integration](https://github.com/kevpatts/OpenWebif-control)
   (v0.1.1+) installed and configured — it provides the `*_channels` sensor and
   the `zap` service this card uses.
2. Home Assistant 2024.1.0 or newer.

---

## Installation (HACS)

1. **HACS → three-dot menu → Custom repositories.**
2. Add `https://github.com/kevpatts/OpenWebif-control-card` with category
   **Dashboard** (a.k.a. Plugin/Lovelace).
3. Install **OpenWebif Control Card** and **reload your browser** (HACS will
   add the resource automatically; if not, add
   `/hacsfiles/OpenWebif-control-card/openwebif-control-card.js` as a
   `module` resource under **Settings → Dashboards → Resources**).

### Manual installation

Copy `dist/openwebif-control-card.js` into `config/www/` and add it as a
dashboard resource of type **JavaScript Module**.

---

## Usage

Add the card to a dashboard (it appears in the card picker as **OpenWebif
Control Card**), or via YAML:

```yaml
type: custom:openwebif-control-card
title: TV
columns: 4
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | string | — | `custom:openwebif-control-card` (required) |
| `title` | string | `TV` | Card heading |
| `columns` | number | `4` | Number of channel columns in the grid |
| `show_search` | bool | `true` | Show the channel search box |
| `channels_entity` | string | auto | Override the `*_channels` sensor (auto-detected by default) |
| `current_entity` | string | auto | Override the `*_current_programme` sensor used to highlight the tuned channel |

### Theming overrides

The card uses your HA theme by default. You can fine-tune it with card-level
CSS variables via `card_mod` or a theme:

| Variable | Purpose |
| --- | --- |
| `--owc-accent` | Accent / active highlight colour |
| `--owc-radius` | Tile corner radius |
| `--owc-gap` | Grid gap |
| `--owc-tile-bg` | Tile background |

---

## Development

```bash
npm install
npm run build   # outputs dist/openwebif-control-card.js
npm run watch   # rebuild on change
```

The card is built with **Lit + TypeScript** and bundled with Rollup.

## License

[MIT](LICENSE)
