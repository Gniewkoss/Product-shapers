# Wdrożenie: dwie witryny Netlify (strona Vite + Payload CMS)

Ten projekt zakłada **dwa osobne projekty Netlify** z **tego samego repozytorium**:

| Witryna | Katalog | Co publikuje |
|---------|---------|----------------|
| **A — marketing** | root repo | statyczny build Vite → `dist/` |
| **B — CMS** | `cms/` | Next.js + Payload (admin, API, media) |

Na **domenie witryny A** użytkownik otwiera np. `https://twoja-strona.netlify.app/admin` — Netlify **`_redirects`** (HTTP 200) proxy przekazuje `/api`, `/admin`, `/media` na **URL witryny B** (`CMS_ORIGIN`). W pasku adresu nadal widać domenę witryny A.

Konfiguracja CMS dla proxy: **`PAYLOAD_PUBLIC_SERVER_URL`** i **`FRONTEND_ORIGINS`** = adres **witryny A** (ten z paska przeglądarki), **nie** surowy URL witryny B.

---

## 1. Witryna B — CMS (Payload), katalog `cms/`

Utwórz **drugi** projekt Netlify z tego repozytorium (ta sama gałąź co witryna A).

### Build i deploy

1. **Site configuration → Build & deploy → Continuous Deployment**
   - **Base directory:** `cms`
   - Netlify wczyta [`cms/netlify.toml`](cms/netlify.toml): build używa **tymczasowego SQLite** (jak [`cms/Dockerfile`](cms/Dockerfile)), żeby `next build` **nie wymagał** Postgresa podczas kompilacji.

2. **Node:** w `netlify.toml` ustawione `NODE_VERSION = 20` — nie nadpisuj na starszą.

3. **Publish:** dla Next.js na Netlify **nie** ustawiaj ręcznie `dist` — integracja Next (OpenNext) jest wykrywana automatycznie.

### Baza danych (PostgreSQL)

1. Podłącz **Netlify Postgres** (lub inny Postgres) do witryny B i skopiuj **`DATABASE_URI`**.
2. Preferuj **connection string przyjazny serverless** (pooled), jeśli panel go podaje — Payload na funkcjach serverless korzysta z krótkotrwałych połączeń.

### Przechowywanie plików (Media) — wymagane na produkcji

Na Netlify dysk kontenera jest **ulotny**. Kolekcja `media` domyślnie zapisuje pod `cms/media/` — po wdrożeniu **[`@payloadcms/storage-s3`](https://payloadcms.com/docs/upload/storage-adapters)** włącza się, gdy ustawisz zmienne **S3** (patrz [`cms/.env.production.example`](cms/.env.production.example)): bucket AWS, **Cloudflare R2** (S3-compatible) itd.

Bez S3: uploady mogą **znikać** po redeploy lub w ogóle nie działać stabilnie — nadaje się tylko do szybkiego testu.

### Zmienne środowiskowe — witryna B (CMS)

| Zmienna | Opis |
|---------|------|
| `DATABASE_URI` | `postgresql://…` z Netlify Postgres / Neon |
| `PAYLOAD_SECRET` | min. 32 znaki, losowy |
| `PAYLOAD_PUBLIC_SERVER_URL` | URL **witryny A** (marketing), **bez** `/` na końcu |
| `FRONTEND_ORIGINS` | ten sam co A (+ opcjonalnie adresy Deploy Preview Netlify, po przecinku) |
| `FRONTEND_ORIGIN` | opcjonalnie (legacy); wystarczy `FRONTEND_ORIGINS` |
| `PAYLOAD_DATABASE_PUSH` | na start `true` na pustej bazie; po **`db:bootstrap`** ustaw `false` (patrz niżej) |
| `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_REGION` | gdy używasz S3/R2; opcjonalnie `S3_ENDPOINT`, `S3_FORCE_PATH_STYLE=true` (R2) |

**Nie** ustawiaj `DATABASE_ADAPTER=sqlite` w runtime produkcyjnym z Postgres — tylko build w `netlify.toml` używa SQLite.

---

## 2. Witryna A — frontend (Vite)

1. **Base directory:** root repozytorium (puste lub `.`).
2. **Build command:** `npm ci && npm run build:netlify`
3. **Publish directory:** `dist`
4. **Environment variables:** **`CMS_ORIGIN`** = publiczny URL **witryny B**, np. `https://twoj-cms.netlify.app`, **bez** końcowego `/`. Wzorzec: [`deploy/netlify-env.example.txt`](deploy/netlify-env.example.txt).

Kolejność: utwórz witrynę B, skopiuj jej URL → wklej jako `CMS_ORIGIN` na A → **Trigger deploy** na A, żeby [`scripts/generate-netlify-redirects.mjs`](scripts/generate-netlify-redirects.mjs) wygenerował `public/_redirects` z poprawnym proxy.

**Domena własna:** podepnij na witrynie A. Ten sam host wpisz w `PAYLOAD_PUBLIC_SERVER_URL` i `FRONTEND_ORIGINS` na witrynie B.

---

## 3. Pusta baza: schemat + seed (bootstrap)

Netlify nie zastępuje „powłoki” jak Render Shell — **jednorazowo** uruchom bootstrap **lokalnie** (albo w CI z sekretami), z dostępem sieciowym do tego samego `DATABASE_URI` co witryna B.

1. Skopiuj [`cms/.env.production.example`](cms/.env.production.example) → `cms/.env` (nie commituj). Ustaw `DATABASE_URI`, `PAYLOAD_SECRET`, URL-e jak w produkcji.
2. Z katalogu głównego repo:  
   **`npm run db:bootstrap --prefix cms`**  
   To uruchamia seed z wymuszonym `PAYLOAD_DATABASE_PUSH=true` na czas procesu (tabele Drizzle + dane startowe).
3. Na witrynie B w Netlify ustaw **`PAYLOAD_DATABASE_PUSH=false`** i opcjonalnie redeploy.
4. Otwórz **`https://<witryna-A>/admin`** i utwórz pierwszego użytkownika Payload.
5. Kolejne doładowanie treści bez push: `npm run seed --prefix cms`.

---

## 4. Co robi `public/_redirects` (generowane przy buildzie A)

- `/api/*` → `{CMS_ORIGIN}/api/:splat`
- `/admin`, `/admin/*` → CMS Payload na witrynie B
- `/media/*` → pliki z CMS
- pozostałe ścieżki → `index.html` (React Router)

---

## 5. Development lokalny

`vite.config.ts` proxy: `/api`, `/media`, `/admin` → `localhost:3000`. Zmienne `CMS_ORIGIN` nie są potrzebne lokalnie przy `npm run dev`.

---

## 6. Problemy z ciasteczkami / logowaniem w `/admin`

Sprawdź `PAYLOAD_PUBLIC_SERVER_URL` (musi być URL widoczny użytkownikowi — witryna A) oraz `FRONTEND_ORIGINS` (CSRF/CORS). Dodaj subdomeny preview Netlify do `FRONTEND_ORIGINS`, jeśli testujesz preview.

---

## 7. Alternatywa: CMS na Render / VPS / Docker

Jeśli wolisz Payload jako **długo działający proces** (np. [`render.yaml`](render.yaml), [`DEPLOY-VPS.md`](DEPLOY-VPS.md), [`cms/Dockerfile`](cms/Dockerfile)):

- **`CMS_ORIGIN`** na Netlify (witryna A) = publiczny URL backendu (Render, VPS itd.), tak jak wcześniej.
- **`PAYLOAD_PUBLIC_SERVER_URL`** nadal = domena **witryny marketingowej** (Netlify), nie bezpośredni URL Render.
- Pliki `cms/media/` na dysku kontenera przy Render: rozważ **Persistent Disk** albo S3 — ta sama logika co powyżej.

---

## Skrót checklisty

1. Witryna B: base `cms/`, Postgres, env (URL-e **A** dla Payload), opcjonalnie S3; deploy.
2. Witryna A: `CMS_ORIGIN` = URL B, `npm ci && npm run build:netlify`, publish `dist`.
3. Lokalnie: `npm run db:bootstrap --prefix cms` na pustą bazę; potem `PAYLOAD_DATABASE_PUSH=false` na B.
4. `/admin` pod domeną A.
