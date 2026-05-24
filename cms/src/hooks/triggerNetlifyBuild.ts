/**
 * Triggeruje rebuild frontendu na Netlify po każdym zapisie treści w CMS.
 * Netlify przebudowuje stronę (~1-2 min) z nowymi danymi baked-in do /cms-data.json.
 *
 * Wymagane env: NETLIFY_BUILD_HOOK_URL — URL z panelu Netlify:
 *   Site settings → Build & deploy → Build hooks → Add build hook
 * Bez tej zmiennej funkcja jest no-op (nie blokuje zapisu).
 */
export async function triggerNetlifyBuild(): Promise<void> {
  const hookUrl = process.env.NETLIFY_BUILD_HOOK_URL?.trim();
  if (!hookUrl) return;
  try {
    const res = await fetch(hookUrl, { method: "POST", signal: AbortSignal.timeout(10_000) });
    if (!res.ok) console.warn(`[netlify-build] Trigger zwrócił ${res.status} ${res.statusText}`);
  } catch (e) {
    console.warn("[netlify-build] Trigger nie powiódł się:", e);
  }
}
