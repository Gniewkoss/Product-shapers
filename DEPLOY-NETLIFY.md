# Wdrożenie: Netlify (strona) + Render (Payload CMS)

Domyślna konfiguracja: **jedna witryna Netlify** serwuje statyczny build Vite (`dist/`). **Payload (Next.js) i PostgreSQL** działają na **Render** z [`render.yaml`](./render.yaml) (`rootDir: cms`).

Domyślnie **`/admin`** na Netlify jest przekierowany na panel Payload pod **publicznym URL serwisu Web Render** (301 — szczegóły w [`public/_redirects`](./public/_redirects)). Nadal możesz serwować **`/api`** i **`/media`** przez proxy (200) na `CMS_ORIGIN`.

**Ważne — dwa adresy:** marketing to **Netlify**; panel CMS często otwierasz na **`*.onrender.com`**. Zmienna `PAYLOAD_PUBLIC_SERVER_URL` nadal powinna wskazywać **witrynę marketingową** (linki z CMS, CORS z frontu). **`serverURL`** w Payload musi natomiast odpowiadać hostowi, pod którym faktycznie ładuje się `/admin`. W kodzie jest `resolvePayloadServerURL()` ([`cms/src/lib/serverUrl.ts`](./cms/src/lib/serverUrl.ts)):

1. **`PAYLOAD_SERVER_URL`** — jawny kanoniczny URL CMS (np. `https://….onrender.com`), jeśli chcesz to ustawić ręcznie.
2. Jeśli **`PAYLOAD_USE_MARKETING_SERVER_URL=true`** — używane jest **`PAYLOAD_PUBLIC_SERVER_URL`** (np. stary scenariusz: admin widoczny pod domeną Netlify przez proxy).
3. W przeciwnym razie, gdy na Renderze jest **`RENDER_EXTERNAL_URL`** i różni się od **`PAYLOAD_PUBLIC_SERVER_URL`** — jako `serverURL` wybierany jest **Render** (typowy przypadek: admin na onrender.com, marketing na `productshapers.pl`).

Zawsze ustaw **`FRONTEND_ORIGINS`** (lub **`FRONTEND_ORIGIN`**) na adres(y) witryny Netlify (+ preview), niezależnie od tego, gdzie otwierasz panel.

---

## Checklista (Netlify + Render)

1. **Zacommituj i wypchnij** repozytorium na GitHub/GitLab.
2. W **[Render](https://render.com)**: New → **Blueprint** → wybierz repo → Render wczyta [`render.yaml`](./render.yaml) i utworzy **PostgreSQL** + serwis **Web** z katalogu `cms/`.
3. Przy tworzeniu uzupełnij zmienne ze `sync: false`:
   - **`PAYLOAD_PUBLIC_SERVER_URL`** = publiczny URL **witryny marketingowej** Netlify (bez `/` na końcu),
   - **`FRONTEND_ORIGINS`** = ten sam URL (+ opcjonalnie **Deploy Preview** po przecinku),
   - opcjonalnie **`PAYLOAD_SERVER_URL`** = publiczny URL **Web Render** (ten z kroku 4), jeśli wolisz ustalić go ręcznie zamiast polegać na `RENDER_EXTERNAL_URL`.
4. Poczekaj aż serwis CMS ma status **Live**. Skopiuj **publiczny URL** Web (np. `https://product-shapers-cms-xxxx.onrender.com`).
5. W **Netlify** (tylko witryna marketingowa): Site configuration → Environment variables → **`CMS_ORIGIN`** = skopiowany URL Render **bez** końcowego `/`. Wzorzec: [`deploy/netlify-env.example.txt`](./deploy/netlify-env.example.txt).
6. Na Netlify: **Deploy → Trigger deploy → Clear cache and deploy**, żeby `npm run build:netlify` wygenerowało `public/_redirects` z regułami proxy.
7. **Pusta baza — schemat + seed (bootstrap):** lokalnie (to samo `DATABASE_URI` co na Render) **albo** w **Render → Shell** (katalog roboczy = `cms/`):  
   `npm run db:bootstrap` (lub z głównego katalogu repo: `npm run db:bootstrap --prefix cms`).  
   Jednorazowo — nie dodawaj tego do `npm start`.  
   **Bootstrap z komputera** przy **zewnętrznym** URI Postgres na Renderze: dopisz do connection stringa **`?sslmode=require`** (lub `&sslmode=require`), inaczej możesz dostać `SSL/TLS required`. Pełny host musi być widoczny w DNS (`…postgres.render.com`), nie skrócona nazwa.
8. Na Render (Environment serwisu CMS) ustaw **`PAYLOAD_DATABASE_PUSH=false`** po udanym bootstrapie (opcjonalnie, zalecane po ustabilizowaniu schematu).
9. Otwórz panel admin (po przekierowaniu z Netlify: **`https://…onrender.com/admin`**) i utwórz **pierwszego użytkownika** Payload. Jeśli widzisz **404** na kolekcjach / globals, sprawdź zgodność **`serverURL`** z hostem w pasku adresu (patrz akapit „Ważne — dwa adresy” powyżej).
10. Kolejne doładowanie treści: `npm run seed --prefix cms` (lokalnie lub Shell).

Szablon zmiennych CMS: [`cms/.env.production.example`](./cms/.env.production.example).

### Render — na co uważać

- **Cold start**: na darmowym planie usługa może zasnąć — pierwsze żądanie bywa wolniejsze.
- **Pliki `cms/media/`** na dysku kontenera mogą **zginąć przy redeploy**; na dłuższą produkcję: [Persistent Disk](https://render.com/docs/disks) pod katalog uploadów albo **S3** (zmienne w [`cms/.env.production.example`](./cms/.env.production.example)).
- Jeśli blueprint odrzuci `plan: free` dla Postgresa w regionie, edytuj [`render.yaml`](./render.yaml) (np. `basic-256mb`).
- **Build** na Renderze używa tymczasowego SQLite (jak [`cms/Dockerfile`](./cms/Dockerfile) / [`render.yaml`](./render.yaml) `buildCommand`) — nie wymaga żywego Postgresa podczas `next build`. **Start** używa `DATABASE_URI` z bazy.
- **`db:bootstrap` z laptopa:** użyj **External Database URL** z pełnym hostname oraz **`sslmode=require`** w URI (patrz checklista pkt 7).
- Gdy **deploy Web** kończy się błędem, sprawdź **Logs** → **Build**; gdy start się wywala, sprawdź czy **`PAYLOAD_PUBLIC_SERVER_URL`** i **`FRONTEND_ORIGINS`** nie są puste.

---

## 1. Backend CMS na Render (Payload)

| Zmienna | Przykład |
|--------|----------|
| `PAYLOAD_SECRET` | długi losowy ciąg (Render może wygenerować przy blueprintcie) |
| `DATABASE_URI` | z addonu Postgres (`fromDatabase` w [`render.yaml`](./render.yaml)) |
| `DATABASE_ADAPTER` | nie ustawiaj `sqlite` przy Postgres |
| `PAYLOAD_PUBLIC_SERVER_URL` | **publiczny URL witryny Netlify** (marketing) |
| `PAYLOAD_SERVER_URL` | opcjonalnie: jawny URL instancji Payload (zwykle Web Render), gdy nie chcesz domyślnej logiki z `serverUrl.ts` |
| `PAYLOAD_USE_MARKETING_SERVER_URL` | `true` tylko gdy `/admin` jest serwowane pod hostem marketingowym (proxy); domyślnie nie ustawiaj |
| `FRONTEND_ORIGINS` | URL Netlify (+ opcjonalnie preview), przecinkami |
| `FRONTEND_ORIGIN` | opcjonalnie (legacy) |
| `PAYLOAD_DATABASE_PUSH` | `true` na pustej bazie / pierwszym deployu; po **`db:bootstrap`** ustaw `false` |

**Healthcheck:** [`render.yaml`](./render.yaml) → `/api/content-version`.

---

## 2. Netlify (tylko frontend)

**Environment variables:**

| Zmienna | Opis |
|---------|------|
| `CMS_ORIGIN` | Pełny URL serwisu CMS na Render **bez** `/`, np. `https://product-shapers-cms-xxxx.onrender.com` |

**Build:** `npm run build:netlify` — generuje `public/_redirects` i buduje Vite.

**Domena własna:** podepnij na Netlify; ten sam host wpisz w `PAYLOAD_PUBLIC_SERVER_URL` i `FRONTEND_ORIGINS` na Renderze.

---

## 3. Co robi `public/_redirects`

- `/api/*` → `{CMS_ORIGIN}/api/:splat`
- `/admin`, `/admin/*` → zwykle **301** na panel Payload na Renderze (szczegóły w generatorze [`scripts/generate-netlify-redirects.mjs`](./scripts/generate-netlify-redirects.mjs))
- `/media/*` → pliki z CMS
- pozostałe ścieżki → `index.html` (React Router)

---

## 4. Development lokalny

`vite.config.ts` proxy: `/api`, `/media`, `/admin` → `localhost:3000`. Przy `npm run dev` zmienne Netlify nie są potrzebne.

---

## 5. Problemy z ciasteczkami / logowaniem / 404 w panelu

Sprawdź **`FRONTEND_ORIGINS`** oraz to, czy host w przeglądarce na `/admin` zgadza się z **`serverURL`** (logika w [`cms/src/lib/serverUrl.ts`](./cms/src/lib/serverUrl.ts)). Typowy błąd: otwarty panel na **`*.onrender.com`**, a wcześniej w env zostawione było ustawienie sugerujące wyłącznie URL Netlify — po deployu z aktualnym kodem konflikt **marketing vs Render** jest rozwiązywany na korzyść Rendera; ewentualnie ustaw **`PAYLOAD_SERVER_URL`** na URL Web Render. Dodaj subdomeny preview Netlify do `FRONTEND_ORIGINS`, jeśli testujesz preview.

---

## 6. Opcjonalnie: CMS na drugim projekcie Netlify

Zamiast Render możesz wdrożyć **Payload jako drugą witrynę Netlify** z **base directory `cms/`** — wtedy **`CMS_ORIGIN`** = URL tej drugiej witryny (np. `https://twoj-cms.netlify.app`).

- Konfiguracja buildu: [`cms/netlify.toml`](cms/netlify.toml) (SQLite przy kompilacji, jak Dockerfile).
- Na Netlify dysk funkcji jest **ulotny** — dla uploadów praktycznie **wymagane** jest **S3/R2** (zmienne w [`cms/.env.production.example`](./cms/.env.production.example)); szczegóły wcześniejszej architektury „dwóch Netlify” zostały skrócone na rzecz ścieżki Render.

---

## Skrót

| Gdzie | Co |
|-------|-----|
| **Render** | Postgres + Web `cms/`, `PAYLOAD_PUBLIC_SERVER_URL` = marketing; `serverURL` domyślnie z Render, jeśli admin pod onrender.com |
| **Netlify** | `CMS_ORIGIN` = URL **Render Web**, build `build:netlify`, publish `dist` |
| **Bootstrap** | `db:bootstrap` lokalnie lub Render Shell; potem `PAYLOAD_DATABASE_PUSH=false` na Renderze |
