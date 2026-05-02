/** Monotonic-ish token bumped on CMS saves so the Vite SPA can poll and refetch. */
let version = Date.now();

export function bumpContentVersion(): number {
  version = Date.now();
  return version;
}

export function getContentVersion(): number {
  return version;
}
