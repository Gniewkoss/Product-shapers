/**
 * Audyt: sprawdza czy każdy plik referowany przez rekordy kolekcji `media`
 * istnieje w buckecie R2 (S3-compatible). Wypisuje:
 *   - liczbę rekordów w DB i obiektów w R2,
 *   - listę plików w DB, których brakuje w R2 (te dają 404 na stronie),
 *   - listę plików w R2 nieużywanych przez żaden rekord (sierocone).
 *
 * Uruchomienie z katalogu repo (root):
 *   node cms/scripts/audit-r2-media.mjs
 *
 * Wymaga cms/.env.production z DATABASE_URI + S3_BUCKET/S3_ENDPOINT/S3_REGION/S3_ACCESS_KEY_ID/S3_SECRET_ACCESS_KEY.
 * Read-only — nie zmienia niczego ani w DB, ani w R2.
 */
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import pgPkg from "pg";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "..", ".env.production");
dotenv.config({ path: envPath });

const { Client } = pgPkg;

const need = (name) => {
  const v = process.env[name]?.trim();
  if (!v) {
    console.error(`[audit] Brak zmiennej ${name} w ${envPath}`);
    process.exit(1);
  }
  return v;
};

const DATABASE_URI = need("DATABASE_URI");
const S3_BUCKET = need("S3_BUCKET");
const S3_ENDPOINT = need("S3_ENDPOINT");
const S3_REGION = process.env.S3_REGION?.trim() || "auto";
const S3_ACCESS_KEY_ID = need("S3_ACCESS_KEY_ID");
const S3_SECRET_ACCESS_KEY = need("S3_SECRET_ACCESS_KEY");

console.log(`[audit] DB: ${new URL(DATABASE_URI).host}`);
console.log(`[audit] R2: ${S3_ENDPOINT} bucket=${S3_BUCKET}`);

const pg = new Client({ connectionString: DATABASE_URI });
await pg.connect();

const { rows } = await pg.query(`
  SELECT
    id,
    filename,
    sizes_thumbnail_filename AS f_thumb,
    sizes_card_filename      AS f_card,
    sizes_hero_filename      AS f_hero
  FROM media
`);
await pg.end();

const dbFilenames = new Set();
const perRecord = [];
for (const r of rows) {
  const files = [r.filename, r.f_thumb, r.f_card, r.f_hero].filter(Boolean);
  perRecord.push({ id: r.id, filename: r.filename, files });
  for (const f of files) dbFilenames.add(f);
}

const s3 = new S3Client({
  region: S3_REGION,
  endpoint: S3_ENDPOINT,
  credentials: { accessKeyId: S3_ACCESS_KEY_ID, secretAccessKey: S3_SECRET_ACCESS_KEY },
});

const r2Keys = new Set();
let ContinuationToken;
do {
  const res = await s3.send(
    new ListObjectsV2Command({ Bucket: S3_BUCKET, ContinuationToken, MaxKeys: 1000 }),
  );
  for (const o of res.Contents ?? []) if (o.Key) r2Keys.add(o.Key);
  ContinuationToken = res.IsTruncated ? res.NextContinuationToken : undefined;
} while (ContinuationToken);

const missing = [...dbFilenames].filter((f) => !r2Keys.has(f)).sort();
const orphans = [...r2Keys].filter((k) => !dbFilenames.has(k)).sort();

const recordsWithMissing = perRecord
  .filter((r) => r.files.some((f) => !r2Keys.has(f)))
  .map((r) => ({
    id: r.id,
    original: r.filename,
    missing: r.files.filter((f) => !r2Keys.has(f)),
  }));

console.log(`\n=== PODSUMOWANIE ===`);
console.log(`Rekordów media w DB:            ${rows.length}`);
console.log(`Plików referowanych w DB:       ${dbFilenames.size} (oryginały + warianty)`);
console.log(`Obiektów w R2:                  ${r2Keys.size}`);
console.log(`Brakujące pliki (DB → R2):      ${missing.length}`);
console.log(`Sieroty w R2 (bez rekordu):     ${orphans.length}`);
console.log(`Rekordy z co najmniej 1 brakiem:${recordsWithMissing.length} / ${rows.length}`);

if (recordsWithMissing.length > 0) {
  console.log(`\n=== REKORDY DO PONOWNEGO WGRANIA ===`);
  for (const r of recordsWithMissing) {
    console.log(`  #${r.id}  ${r.original}`);
    for (const f of r.missing) console.log(`      - brakuje: ${f}`);
  }
}

if (orphans.length > 0 && orphans.length <= 50) {
  console.log(`\n=== SIEROTY W R2 (można usunąć ręcznie) ===`);
  for (const k of orphans) console.log(`  ${k}`);
} else if (orphans.length > 50) {
  console.log(`\n(Sierot ${orphans.length} — nie wypisuję listy, dopisz --show-orphans żeby zobaczyć.)`);
  if (process.argv.includes("--show-orphans")) {
    for (const k of orphans) console.log(`  ${k}`);
  }
}
