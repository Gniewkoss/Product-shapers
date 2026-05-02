# Wdrożenie: Netlify (strona) + Payload CMS (`/admin`)

Netlify serwuje **tylko statyczny build Vite** (`dist/`). **Payload działa na osobnym URL** (np. Railway, Render, Fly.io, VPS z Node — nie jako wyłącznie „statyczny” Netlify).

Na Twojej **domenie Netlify** użytkownik wchodzi na `https://twojadomena.pl/admin` — Netlify **proxy** (HTTP 200) przekazuje ruch na backend CMS; w pasku adresu nadal widnieje Twoja domena.

## Checklista krok po kroku (strona już na Netlify)

Przykład adresu Netlify poniżej — **podmień na swój** (np. [fanciful-haupia-78f703.netlify.app](https://fanciful-haupia-78f703.netlify.app/)).

1. **Zacommituj i wypchnij** zmiany z tego repo na GitHub/GitLab (Render łączy się z repozytorium).
2. W **[Render](https://render.com)** utwórz **Blueprint**: New → Blueprint → wybierz repo → Render wczyta [`render.yaml`](./render.yaml) i postawi **PostgreSQL** + serwis **Web** z katalogu `cms/`.
3. Przy pierwszym wdrożeniu uzupełnij wartości zmiennych (Render oznaczy je przy tworzeniu — odpowiadają `sync: false` w blueprintcie):
   - **`PAYLOAD_PUBLIC_SERVER_URL`** = `https://fanciful-haupia-78f703.netlify.app` (bez `/` na końcu),
   - **`FRONTEND_ORIGINS`** = ten sam URL; jeśli korzystasz z **Deploy Preview** na Netlify, dopisz ich adresy po przecinku.
4. Poczekaj na udany deploy CMS (status „Live”). Skopiuj **publiczny URL** serwisu Render (np. `https://product-shapers-cms-xxxx.onrender.com`).
5. W **Netlify**: Site configuration → Environment variables → dodaj **`CMS_ORIGIN`** = skopiowany URL Render **bez** końcowego `/`. Wzorzec: [`deploy/netlify-env.example.txt`](./deploy/netlify-env.example.txt).
6. Na Netlify uruchom **Deploy → Trigger deploy → Clear cache and deploy**, żeby `npm run build:netlify` wygenerowało `public/_redirects` z regułami proxy.
7. Otwórz `https://…twoja-strona….netlify.app/admin` i utwórz **pierwszego użytkownika** Payload.
8. Opcjonalnie załaduj demo treści (po migracji/schemacie): na Render **Shell** albo lokalnie z ustawionym `DATABASE_URI` — w katalogu `cms/` uruchom `npm run seed`.

Szablon zmiennych CMS (np. pod VPS lub debug): [`cms/.env.production.example`](./cms/.env.production.example).

### Render — na co uważać

- **Cold start**: darmowy plan budzi usługę po uśpieniu — pierwsze żądanie bywa wolniejsze.
- **Pliki `cms/media/`** na dysku kontenera mogą **zginąć przy redeploy**; pod dłuższą produkcję dodaj [Persistent Disk](https://render.com/docs/disks) zamontowany pod katalog uploadów lub zewnętrzny storage.
- Jeśli blueprint odrzuci `plan: free` przy Postgresie w Twoim regionie, edytuj [`render.yaml`](./render.yaml) i ustaw np. `basic-256mb`.

## 1. Backend CMS (Payload)

1. Utwórz projekt Node (Docker lub `npm run build` + `npm run start` w `cms/`).
2. Włącz **PostgreSQL** (SQLite nie nadaje się do typowego hostingu produkcyjnego).
3. Zmienne środowiskowe (minimalnie):

| Zmienna | Przykład |
|--------|----------|
| `PAYLOAD_SECRET` | długi losowy ciąg |
| `DATABASE_URI` | `postgresql://...` |
| `DATABASE_ADAPTER` | nie ustawiaj `sqlite` przy Postgres |
| `PAYLOAD_PUBLIC_SERVER_URL` | **publiczny URL witryny na Netlify** (np. `https://twojadomena.pl`) — tak działają linki i CSRF przy proxy |
| `FRONTEND_ORIGINS` | `https://twojadomena.pl` oraz opcjonalnie adresy preview Netlify (oddzielone przecinkami) |
| `FRONTEND_ORIGIN` | opcjonalnie pierwszy origin (legacy); można użyć tylko `FRONTEND_ORIGINS` |
| `PAYLOAD_DATABASE_PUSH` | przy pierwszym wdrożeniu na pustej bazie często `true`; po ustabilizowaniu schematu można `false` (szczegóły hostingu Payload/Drizzle) |

**Bezpośredni URL aplikacji CMS** (np. `https://xxx.up.railway.app`) wpiszesz na Netlify jako `CMS_ORIGIN` (patrz niżej).

4. Upewnij się, że backend nasłuchuje i jest dostępny z internetu (Healthcheck na `/api/content-version` lub `/`).

## 2. Netlify (frontend)

**Site settings → Environment variables:**

| Zmienna | Opis |
|---------|------|
| `CMS_ORIGIN` | Pełny URL backendu Payload **bez** końcowego `/`, np. `https://psc-cms-production.up.railway.app` |

**Build:**

- Wykorzystywany jest skrypt `npm run build:netlify`, który generuje `public/_redirects` z proxy i buduje Vite.

**Domena niestandardowa:** podepnij ją w Netlify (DNS). Ten sam host wpisz w `PAYLOAD_PUBLIC_SERVER_URL` i w `FRONTEND_ORIGINS`.

## 3. Co robi `_redirects`

- `/api/*` → `{CMS_ORIGIN}/api/:splat`
- `/admin` oraz `/admin/*` → CMS admin Payload
- `/media/*` → pliki z Payload
- pozostałe ścieżki → `index.html` (React Router)

## 4. Development lokalny

`vite.config.ts` proxy: `/api`, `/media`, `/admin` → `localhost:3000`. Bez zmiennych Netlify.

## 5. Problemy z ciasteczkami / logowaniem w `/admin`

Jeśli panel admin nie trzyma sesji przy proxy, sprawdź `PAYLOAD_PUBLIC_SERVER_URL` (musi być URL widoczny użytkownikowi — domena Netlify) oraz listę **CSRF/CORS** (`FRONTEND_ORIGINS`). W razie potrzeby dodaj subdomenę preview Netlify do `FRONTEND_ORIGINS`.
