# Jedna maszyna (VPS) bez Dockera — strona + Payload pod jedną domeną

Marketing (`dist/`) i Payload (Next.js na porcie wewnętrznym) są za **jednym reverse proxy** (np. nginx). W przeglądarce nadal jest jedna domena: `https://twojadomena.pl`, `https://twojadomena.pl/admin`, `https://twojadomena.pl/api/...`.

Frontend już woła API pod **`/api`** (bez osobnego `CMS_ORIGIN`) — tak jak przy proxy w dev (`vite.config.ts`).

## Co musisz mieć na serwerze

- **Node.js 20** (LTS)
- **PostgreSQL** (trwałe dane: treści, media metadata — typowo na tym samym VPS)
- **nginx** (albo Caddy) z TLS — np. Let’s Encrypt (`certbot`)

## 1. Klon repozytorium i katalog roboczy

Przykład:

```bash
sudo mkdir -p /var/www/product-shapers
sudo chown "$USER:$USER" /var/www/product-shapers
cd /var/www/product-shapers
git clone <URL-twojego-repo> .
```

## 2. PostgreSQL

Utwórz bazę i użytkownika (przykład):

```bash
sudo -u postgres psql -c "CREATE USER payload WITH PASSWORD 'silne-haslo';"
sudo -u postgres psql -c "CREATE DATABASE payload OWNER payload;"
```

Connection string dla CMS:

`postgresql://payload:silne-haslo@127.0.0.1:5432/payload`

## 3. Zmienne środowiskowe CMS (`cms/.env`)

Na produkcji utwórz plik **`cms/.env`** (nie commituj go):

| Zmienna | Przykład |
|--------|----------|
| `DATABASE_URI` | `postgresql://payload:…@127.0.0.1:5432/payload` |
| `PAYLOAD_SECRET` | długi losowy sekret |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://twojadomena.pl` (bez `/` na końcu) |
| `FRONTEND_ORIGINS` | `https://twojadomena.pl` — jeśli masz `www`, dopisz po przecinku |
| `PAYLOAD_DATABASE_PUSH` | przy **pierwszym** uruchomieniu na pustej bazie ustaw `true`; po ustabilizowaniu schematu możesz ustawić `false` |

Uploady plików lądują w **`cms/media/`** — zrób backup tego katalogu razem z bazą.

## 4. Budowa (na serwerze)

Z **korzenia repo** (nie używasz tutaj `build:netlify` — to pod Netlify z `_redirects`):

```bash
npm ci
npm run build

cd cms
npm ci
npm run build
cd ..
```

## 5. Proces CMS (Next.js)

Uruchom Payload tak, żeby nasłuchiwał tylko na localhost (nginx wystawia światu 443):

```bash
cd cms
NODE_OPTIONS=--no-deprecation npx next start -H 127.0.0.1 -p 3000
```

Na stałe wygodniej: **systemd** lub **PM2**. Przykład unit systemd: [`deploy/psc-cms.service.example`](./deploy/psc-cms.service.example).

## 6. nginx — jedna domena, dwie „rzeczy”

Skopiuj szablon [`deploy/nginx-single-host.example.conf`](./deploy/nginx-single-host.example.conf), podstaw:

- `server_name`
- ścieżki do `ssl_certificate` / `ssl_certificate_key`
- `root` → **absolutna ścieżka do `dist/`** z buildu Vite

Po zmianach:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## 7. Aktualizacja przez git (push → pull na serwerze)

Na VPS:

```bash
cd /var/www/product-shapers
git pull
./scripts/deploy-on-server.sh
```

Skrypt robi `npm ci`, `npm run build`, build `cms/` i **restart usługi `psc-cms`** (dopasuj nazwę w systemd do swojej).

Pełny „push z laptopa bez SSH” zwykle znaczy **webhook** albo **GitHub Action** z `ssh` na serwer — to możesz dodać później; samo repo jest gotowe pod model: **commit + push do zdalnego repozytorium, na serwerze `git pull` + skrypt**.

## 8. Pierwszy raz w `/admin`

Wejdź na `https://twojadomena.pl/admin` i utwórz konto administratora. Opcjonalnie:

```bash
cd /var/www/product-shapers/cms && npm run seed
```

(seed po utworzeniu użytkownika, jeśli skrypt tego wymaga).

## Gdzie „zostają dane”

- **Treści i użytkownicy** — PostgreSQL (katalog danych Postgresa na dysku serwera).
- **Pliki mediów** — `cms/media/` na dysku.

Backup: zrzuty bazy + kopia `cms/media/`.
