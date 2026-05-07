import { sql } from "drizzle-orm";
import type { Payload } from "payload";

const TABLE = "cms_public_content_version";

type Drizzleish = {
  execute?: (q: unknown) => Promise<unknown>;
  run?: (q: unknown) => Promise<unknown>;
};

function drizzleFrom(payload: Payload): { dialect: "postgres" | "sqlite"; d: Drizzleish } {
  const adapter = payload.db as unknown as { name?: string; drizzle?: Drizzleish };
  const d = adapter.drizzle ?? (adapter as unknown as Drizzleish);
  const dialect = adapter.name === "postgres" ? "postgres" : "sqlite";
  return { dialect, d };
}

function pickVersion(result: unknown): number | null {
  const rows =
    Array.isArray(result) ? result
    : result &&
        typeof result === "object" &&
        "rows" in result &&
        Array.isArray((result as { rows: unknown }).rows) ?
      (result as { rows: unknown[] }).rows
    : null;
  if (!rows?.length || typeof rows[0] !== "object" || rows[0] === null) return null;
  const v = (rows[0] as { version: unknown }).version;
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "bigint") return Number(v);
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  }
  return null;
}

/** Shared monotonic token in Postgres/SQLite so every Payload instance (and cold starts) agree on cache bust. */
export async function getContentVersion(payload: Payload): Promise<number> {
  try {
    const { dialect, d } = drizzleFrom(payload);
    const runner = d.execute?.bind(d) ?? d.run?.bind(d);
    if (!runner) return Date.now();

    const q =
      dialect === "postgres" ?
        sql.raw(`SELECT version FROM "${TABLE}" WHERE id = 1 LIMIT 1`)
      : sql.raw(`SELECT version FROM \`${TABLE}\` WHERE id = 1 LIMIT 1`);

    const res = await runner(q);
    const v = pickVersion(res);
    if (v != null) return v;
    return 0;
  } catch {
    return 0;
  }
}

export async function bumpContentVersion(payload: Payload): Promise<number> {
  const v = Date.now();
  try {
    const { dialect, d } = drizzleFrom(payload);
    const runner = d.execute?.bind(d) ?? d.run?.bind(d);
    if (!runner) return v;

    if (dialect === "postgres") {
      await runner(
        sql`INSERT INTO ${sql.raw(`"${TABLE}"`)} (id, version) VALUES (${1}, ${BigInt(v)}) ON CONFLICT (id) DO UPDATE SET version = EXCLUDED.version`,
      );
    } else {
      await runner(
        sql.raw(
          `INSERT INTO \`${TABLE}\` (id, version) VALUES (1, ${v}) ON CONFLICT (id) DO UPDATE SET version = excluded.version`,
        ),
      );
    }
  } catch {
    /* pre-migration / adapter shape — hooks still proceed */
  }
  return v;
}
