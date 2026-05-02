import { NextResponse } from "next/server";

import { getContentVersion } from "../../../lib/contentVersion";

export async function GET() {
  return NextResponse.json(
    { version: getContentVersion() },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
