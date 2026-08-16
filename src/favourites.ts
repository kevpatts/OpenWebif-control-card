// Favourite channels, persisted in browser localStorage (per-device).
//
// Kept intentionally simple: a set of service references. This ships fast and
// needs no backend; a future release may sync favourites through Home Assistant.

const KEY = "owc-favourites";

export function loadFavourites(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function saveFavourites(favs: Set<string>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify([...favs]));
  } catch {
    // localStorage unavailable (private mode, etc.) — favourites won't persist.
  }
}

export function toggleFavourite(favs: Set<string>, sref: string): Set<string> {
  const next = new Set(favs);
  if (next.has(sref)) next.delete(sref);
  else next.add(sref);
  saveFavourites(next);
  return next;
}
