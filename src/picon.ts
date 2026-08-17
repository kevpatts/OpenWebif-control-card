// Picon (channel logo) resolver.
//
// Channel logos are pulled from the public `picons/picons` repository served
// via the jsDelivr CDN. We never touch the receiver for logos, so the box
// needs no picon pack installed.
//
// Resolution order for a channel name:
//   1. Normalise the name (lowercase, ascii, alphanumeric, "+1" -> "plus1").
//   2. Look it up in the bundled compact map (name -> canonical logo id) that
//      was generated from the upstream snp.index for common UK/IE channels.
//   3. If unmapped, try the normalised name directly as a logo id.
//   4. If the image fails to load, the card falls back to a text tile.

import piconMap from "./picon-map.json";

const CDN_BASE =
  "https://cdn.jsdelivr.net/gh/picons/picons@master/build-source/logos";

const MAP = piconMap as Record<string, string>;

// Cache of channel-name -> ordered candidate URLs, so repeated renders (e.g.
// switching tabs) never recompute or re-request. Combined with a module-level
// cache of which URL actually loaded, logos become instant after first paint.
const resolvedCache = new Map<string, string>();
// Channels whose logos we've already determined don't exist, so we never
// request them again (prevents endless ret/looping 404s across re-renders).
const failedNames = new Set<string>();
// Individual URLs known to 404, filtered out of future candidate lists.
const failedUrls = new Set<string>();

/** Mark a single URL as broken so it is never offered again. */
export function markUrlFailed(url: string): void {
  failedUrls.add(url);
}

/** Record the URL that successfully loaded for a channel (called by the card). */
export function rememberResolved(name: string, url: string): void {
  resolvedCache.set(name, url);
}

/** Return the previously-successful URL for a channel, if known. */
export function cachedResolved(name: string): string | undefined {
  return resolvedCache.get(name);
}

/** Mark a channel as having no working logo (all candidates 404'd). */
export function markFailed(name: string): void {
  failedNames.add(name);
}

/** Whether we already know this channel has no logo. */
export function hasFailed(name: string): boolean {
  return failedNames.has(name);
}

export function normaliseName(name: string): string {
  const ascii = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .toLowerCase()
    .replace(/\+1/g, "plus1")
    .replace(/\+/g, "plus");
  return ascii.replace(/[^a-z0-9]/g, "");
}

/**
 * Resolve a channel name to a candidate logo id.
 * Returns null when we have no reasonable guess.
 */
export function resolveLogoId(name: string): string | null {
  const key = normaliseName(name);
  if (!key) return null;
  if (MAP[key]) return MAP[key];
  // Strip trailing quality suffixes (hd/uhd/fhd) and retry.
  for (const suf of ["uhd", "fhd", "hd"]) {
    if (key.endsWith(suf) && MAP[key.slice(0, -suf.length)]) {
      return MAP[key.slice(0, -suf.length)];
    }
  }
  // "+1" timeshift fallback to the base channel.
  if (key.endsWith("plus1") && MAP[key.slice(0, -5)]) {
    return MAP[key.slice(0, -5)];
  }
  // Last resort: try the normalised name itself as a logo id.
  return key;
}

/**
 * Build the picon URL(s) for a channel, preferring a dark variant in dark mode.
 * Returns an ordered list of candidate URLs to try.
 */
export function piconUrls(name: string, dark: boolean): string[] {
  const id = resolveLogoId(name);
  if (!id) return [];
  const variants = dark
    ? [".dark.svg", ".default.svg", ".default.png"]
    : [".default.svg", ".light.svg", ".default.png"];
  const all = variants.map((v) => `${CDN_BASE}/${id}${v}`);
  // Filter out any variant we already know 404s.
  return all.filter((u) => !failedUrls.has(u));
}
