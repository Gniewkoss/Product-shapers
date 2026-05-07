import type { Payload } from "payload";

import { bumpContentVersion } from "../lib/contentVersion";
import { resolvePayloadServerURL } from "../lib/serverUrl";

export type RevalidateBody = {
  collection?: string;
  slug?: string;
  global?: string;
};

/**
 * Called from Payload hooks after saves. Always bumps the content version so the SPA can detect changes.
 * Optionally POSTs to `/api/revalidate` when REVALIDATE_SECRET is set (CDN purge / extensions).
 */
export async function postRevalidate(payload: Payload, body: RevalidateBody) {
  await bumpContentVersion(payload);

  const base = resolvePayloadServerURL();
  const url = process.env.REVALIDATE_URL || `${base.replace(/\/$/, "")}/api/revalidate`;
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-revalidate-secret": secret,
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.warn("[revalidate] skipped or failed:", e);
  }
}
