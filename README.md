# Product Shapers

Marketing site and CMS for Dawid Szkiełka's Shape Up consulting practice — offer, case studies, trainings, and a content desk that does not require a frontend deploy.

![screenshot](docs/hero.png)

[![CI](https://github.com/Gniewkoss/Product-shapers/actions/workflows/ci.yml/badge.svg)](https://github.com/Gniewkoss/Product-shapers/actions/workflows/ci.yml)

## What it does

- Public site for the practice: team ownership, discovery, Shape Up delivery, Product Cafe / FinTech Brew, knowledge base, mentoring, and trainings.
- Case studies and articles are edited in Payload and published without shipping a new frontend build (on the VPS path).
- Intro-call / contact form for a thirty-minute conversation.
- Admin at `/admin` for the content team.

## Stack

| Layer | Choice |
|---|---|
| Marketing frontend | Vite 5.4.11, React 19.0, React Router 6.28, TypeScript 5.6, Tailwind 3.4.15 |
| CMS | Payload CMS 3.84.1 on Next.js 16.2.2 |
| Database | PostgreSQL 16 (Compose / production); SQLite for local CMS and CI |
| Media | S3-compatible (`@payloadcms/storage-s3`), optional Cloudflare R2 |
| Edge | Caddy in `deploy/Caddyfile` — one port for site + `/admin` + `/api` |
| Containers | Docker Compose (`postgres`, `cms`, `edge`) |
| Alt host | Netlify (static frontend) + Render (CMS) — `render.yaml`, `DEPLOY-NETLIFY.md` |

## Notable decisions

- **Two deploy shapes, one repo.** `docker-compose.yml` + Caddy is a single-VPS path (port 8787 locally). `DEPLOY-NETLIFY.md` / `render.yaml` split a static Vite site on Netlify from Payload on Render, with `scripts/fetch-cms-data.mjs` baking CMS content at Netlify build time.
- **Caddy, not nginx, is the default compose edge.** `deploy/edge/Dockerfile` fronts the Vite build and proxies `/admin`, `/api`, and media to the CMS so marketing and admin share one hostname — Payload session cookies break if those hosts diverge.
- **SQLite in CI and local CMS, Postgres in Compose/prod.** `cms/package.json` keeps both `@payloadcms/db-postgres` and `@payloadcms/db-sqlite`. GitHub Actions builds the CMS against a throwaway SQLite file so CI does not need a database service.
- **Frontend stays a Vite SPA.** The marketing site is not the Next app. Payload is isolated under `cms/`; the public UI is React Router + Tailwind, which keeps the consulting site deployable as static files.

## Running locally

Prerequisites: Node 20, npm. Docker + Compose v2 for the full stack.

**One command (site + CMS + Postgres + Caddy):**

```bash
cp .env.example .env
docker compose up --build -d
```

Open http://localhost:8787 and http://localhost:8787/admin. First admin user is created in the Payload UI. Optional seed: `docker compose exec cms npm run seed`.

**Without Docker:**

```bash
npm install
npm run dev:all    # Vite :5173 + Payload :3000
```

Frontend scripts: `npm run dev`, `npm run build`, `npm run preview`. CMS: `npm run dev:cms`.

Environment variables (names only; never commit values):

| Name | Where |
|---|---|
| `PUBLIC_URL` | Compose public origin |
| `PORT` | Host port mapped to Caddy (default 8787) |
| `PAYLOAD_SECRET` | CMS |
| `DATABASE_URI` / `DATABASE_ADAPTER` / `SQLITE_URL` | CMS database |
| `PAYLOAD_PUBLIC_SERVER_URL` / `PAYLOAD_DEV_SERVER_URL` | CMS server URL / CORS |
| `FRONTEND_ORIGIN` / `FRONTEND_ORIGINS` | CORS for the Vite site |
| `S3_BUCKET` `S3_ACCESS_KEY_ID` `S3_SECRET_ACCESS_KEY` `S3_REGION` `S3_ENDPOINT` `S3_FORCE_PATH_STYLE` | Media |
| `CMS_ORIGIN` | Netlify build — where to fetch CMS data / proxy |
| `ADMIN_REDIRECT_URL` | Netlify `/admin` redirect |
| `NETLIFY_BUILD_HOOK_URL` | CMS → rebuild marketing site |
| `REVALIDATE_URL` / `REVALIDATE_SECRET` | On-demand revalidation |
| `VITE_PAYLOAD_API_PREFIX` | Frontend API prefix (default `/api`) |
| `VITE_FORMSUBMIT_EMAIL` | Contact form target |

## Deployment

- VPS: [DEPLOY-VPS.md](./DEPLOY-VPS.md) — nginx or Caddy, systemd, `scripts/deploy-on-server.sh`.
- Netlify + Render: [DEPLOY-NETLIFY.md](./DEPLOY-NETLIFY.md), `render.yaml`. Netlify build: `npm run build:netlify`.

## Status

Active. Live: [productshapers.pl](https://productshapers.pl/).

## License

<!-- TODO: What license should this repository use? There is no LICENSE file. -->
