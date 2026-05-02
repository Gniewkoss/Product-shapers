import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { buildConfig } from "payload";
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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const cmsRoot = path.resolve(dirname, "..");
const envFiles = [path.join(cmsRoot, ".env"), path.join(cmsRoot, ".env.local")];
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

function database() {
  const uri = process.env.DATABASE_URI?.trim() ?? "";
  const adapter = process.env.DATABASE_ADAPTER?.toLowerCase();
  const usePostgres =
    adapter !== "sqlite" &&
    uri.length > 0 &&
    /^postgres(ql)?:/i.test(uri);

  if (usePostgres) {
    return postgresAdapter({
      pool: { connectionString: uri },
      push: true,
    });
  }

  return sqliteAdapter({
    client: { url: sqliteClientUrl() },
    push: true,
  });
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media, Authors, Articles, CaseStudies, SitePages],
  cors: [
    process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  ].filter(Boolean),
  db: database(),
  globals: [Navigation, Homepage, Footer, SeoDefaults],
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
