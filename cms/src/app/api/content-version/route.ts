import { NextResponse } from "next/server";
import { getPayload } from "payload";

import config from "@payload-config";

import { getContentVersion } from "../../../lib/contentVersion";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await getPayload({ config });
  const version = await getContentVersion(payload);
  return NextResponse.json(
    { version },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    },
  );
}
