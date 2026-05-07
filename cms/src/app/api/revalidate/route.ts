import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";

import config from "@payload-config";

import { bumpContentVersion } from "../../../lib/contentVersion";

export const dynamic = "force-dynamic";

/**
 * Authenticated webhook-style endpoint (CDN purge, CI). Hooks bump via `postRevalidate` directly;
 * this path is for callers that only hit the URL with a shared secret.
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await req.json();
  } catch {
    /* body optional */
  }

  const payload = await getPayload({ config });
  const version = await bumpContentVersion(payload);

  return NextResponse.json({ revalidated: true, version });
}
