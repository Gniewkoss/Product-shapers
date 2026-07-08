import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  /** Payload REST + custom API: avoid edge/Full Route Cache serving stale CMS data to the marketing SPA. */
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0, must-revalidate" }],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "localhost", pathname: "/api/media/file/**" },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    /**
     * Hardkodowany alias na payload.config — tsconfig.paths działa lokalnie i w większości setupów,
     * ale build na Render (Next 16.2.2 + Node 20.20.2 + webpack + Linux) go nie łapał i wywalał
     * `Module not found: Can't resolve '@payload-config'` we wszystkich (payload)/**  routach.
     * Explicit alias eliminuje zależność od tsconfig paths resolver Next.js.
     */
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias || {}),
      "@payload-config": path.resolve(dirname, "./src/payload.config.ts"),
    };
    return webpackConfig;
  },
  turbopack: {
    root: path.resolve(dirname),
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
