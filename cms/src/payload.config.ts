import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { s3Storage } from "@payloadcms/storage-s3";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { buildConfig, type Plugin } from "payload";
import sharp from "sharp";
import { fileURLToPath, pathToFileURL } from "url";

import { Articles } from "./collections/Articles";
import { Authors } from "./collections/Authors";
import { CaseStudies } from "./collections/CaseStudies";
import { Media } from "./collections/Media";
import { SitePages } from "./collections/SitePages";
import { Users } from "./collections/Users";
import { Footer } from "./globals/Footer";
import { Homepage } from "./globals/Homepage";
import { Navigation } from "./globals/Navigation";
import { SeoDefaults } from "./globals/SeoDefaults";
import { resolvePayloadServerURL, trimServerUrl } from "./lib/serverUrl";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const cmsRoot = path.resolve(dirname, "..");
/** When true, merge `cms/.env.production` after `.env` (e.g. `npm run password-reset`). */
const envProductionPath = path.join(cmsRoot, ".env.production");
const useEnvProduction = process.env.PAYLOAD_USE_ENV_PRODUCTION === "true";
const envFiles = [
  path.join(cmsRoot, ".env"),
  ...(useEnvProduction && fs.existsSync(envProductionPath) ? [envProductionPath] : []),
  path.join(cmsRoot, ".env.local"),
];
if (envFiles.some((f) => fs.existsSync(f))) {
  for (const key of ["DATABASE_URI", "DATABASE_ADAPTER", "SQLITE_URL"]) {
    delete process.env[key];
  }
  for (const filePath of envFiles) {
    if (!fs.existsSync(filePath)) continue;
    Object.assign(process.env, dotenv.parse(fs.readFileSync(filePath, "utf8")));
  }
}

function sqliteClientUrl(): string {
  const fromEnv = process.env.SQLITE_URL?.trim();
  if (fromEnv) return fromEnv;
  const uri = process.env.DATABASE_URI?.trim() ?? "";
  if (uri.startsWith("file:")) return uri;
  const filePath = path.resolve(dirname, "..", "payload.local.db");
  return pathToFileURL(filePath).href;
}

/** Drizzle dev push pokazuje confirm w terminalu — bez TTY proces często wisi i `/admin` nie ładuje się wcale. */
function schemaPushEnabled(): boolean {
  const raw = process.env.PAYLOAD_DATABASE_PUSH?.trim().toLowerCase();
  if (raw === "false" || raw === "0") return false;
  if (raw === "true" || raw === "1") return true;
  return Boolean(process.stdin?.isTTY);
}

/** CORS: marketing origins + Payload host + Render URL when present (direct admin on Render). */
function corsOrigins(): string[] {
  const multi = process.env.FRONTEND_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const single = process.env.FRONTEND_ORIGIN?.trim();
  const server = resolvePayloadServerURL();
  const render = trimServerUrl(process.env.RENDER_EXTERNAL_URL);
  const merged = [
    ...(multi ?? []),
    ...(single ? [single] : []),
    server,
    ...(render && render !== server ? [render] : []),
    "http://localhost:5173",
  ].filter(Boolean);
  return [...new Set(merged)];
}

/** S3-compatible uploads when S3_BUCKET + credentials are set (required for Netlify serverless). Local/static otherwise. */
function s3Plugins(): Plugin[] {
  const bucket = process.env.S3_BUCKET?.trim();
  if (!bucket) return [];

  const accessKeyId = process.env.S3_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY?.trim();
  if (!accessKeyId || !secretAccessKey) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[payload] S3_BUCKET is set but S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY are missing — using local media (uploads may not persist on serverless).",
      );
    }
    return [];
  }

  const region = process.env.S3_REGION?.trim() || "us-east-1";
  const endpoint = process.env.S3_ENDPOINT?.trim();

  return [
    s3Storage({
      collections: { media: true },
      bucket,
      config: {
        credentials: { accessKeyId, secretAccessKey },
        region,
        ...(endpoint
          ? {
              endpoint,
              forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
            }
          : {}),
      },
    }),
  ];
}

function database() {
  const uri = process.env.DATABASE_URI?.trim() ?? "";
  const adapter = process.env.DATABASE_ADAPTER?.toLowerCase();
  const usePostgres =
    adapter !== "sqlite" &&
    uri.length > 0 &&
    /^postgres(ql)?:/i.test(uri);

  const pushEnabled = schemaPushEnabled();

  if (usePostgres) {
    return postgresAdapter({
      pool: { connectionString: uri },
      push: pushEnabled,
      /** Omit extension-owned objects (e.g. Render Postgres `pg_stat_statements`) from Drizzle push. */
      tablesFilter: ["!pg_stat_*"],
    });
  }

  return sqliteAdapter({
    client: { url: sqliteClientUrl() },
    push: pushEnabled,
  });
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media, Authors, Articles, CaseStudies, SitePages],
  cors: corsOrigins(),
  db: database(),
  globals: [Navigation, Homepage, Footer, SeoDefaults],
  plugins: s3Plugins(),
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: resolvePayloadServerURL(),
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
