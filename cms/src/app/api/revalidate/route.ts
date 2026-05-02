import { NextRequest, NextResponse } from "next/server";

import { bumpContentVersion } from "../../../lib/contentVersion";

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

  const version = bumpContentVersion();

  return NextResponse.json({ revalidated: true, version });
}
