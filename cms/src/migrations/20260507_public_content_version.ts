import { sql } from "drizzle-orm";

type MigrateArgs = {
  db: unknown;
  payload: { db: { name: string } };
};
type MigrateUpArgs = MigrateArgs;
type MigrateDownArgs = MigrateArgs;

type Dialect = "postgres" | "sqlite";

const TABLE = "cms_public_content_version";

const quote = (name: string, dialect: Dialect): string =>
  dialect === "postgres" ? `"${name}"` : `\`${name}\``;

async function exec(payload: { db: { name: string } }, db: unknown, query: string): Promise<void> {
  const dialect: Dialect = payload.db.name === "postgres" ? "postgres" : "sqlite";
  const runner: ((q: ReturnType<typeof sql.raw>) => Promise<unknown>) =
    dialect === "postgres"
      ? (db as { execute: (q: ReturnType<typeof sql.raw>) => Promise<unknown> }).execute.bind(db)
      : (db as { run: (q: ReturnType<typeof sql.raw>) => Promise<unknown> }).run.bind(db);
  await runner(sql.raw(query));
}

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const dialect: Dialect = payload.db.name === "postgres" ? "postgres" : "sqlite";
  const q = (n: string) => quote(n, dialect);
  const t = q(TABLE);

  if (dialect === "postgres") {
    await exec(
      payload,
      db,
      `CREATE TABLE IF NOT EXISTS ${t} (
  id smallint PRIMARY KEY DEFAULT 1,
  version bigint NOT NULL,
  CONSTRAINT ${q(`${TABLE}_single`)} CHECK (id = 1)
);`,
    );
    await exec(
      payload,
      db,
      `INSERT INTO ${t} (id, version)
VALUES (1, (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint)
ON CONFLICT (id) DO NOTHING;`,
    );
  } else {
    await exec(
      payload,
      db,
      `CREATE TABLE IF NOT EXISTS ${t} (
  id integer PRIMARY KEY CHECK (id = 1) DEFAULT 1,
  version integer not null
);`,
    );
    await exec(
      payload,
      db,
      `INSERT OR IGNORE INTO ${t} (id, version) VALUES (1, CAST(strftime('%s', 'now') AS integer) * 1000);`,
    );
  }
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  const dialect: Dialect = payload.db.name === "postgres" ? "postgres" : "sqlite";
  await exec(payload, db, `DROP TABLE IF EXISTS ${quote(TABLE, dialect)};`);
}
