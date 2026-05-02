# Product Shapers — marketing + Payload CMS

## Najprościej: jedno repo + Docker

Wymagania: **Docker** + **Docker Compose v2**.

```bash
git clone <URL-repozytorium>
cd <katalog-utworzony-przez-clone>

# Opcjonalnie: cp .env.example .env — na produkcji ustaw PUBLIC_URL i PAYLOAD_SECRET

docker compose up --build -d
```

Otwórz **http://localhost:8787** — strona marketingowa.  
Panel CMS: **http://localhost:8787/admin**

### Pierwsza konfiguracja

1. W Panelu Payload utwórz konto administratora (pierwszy użytkownik).
2. Opcjonalnie załaduj przykładowe treści:

   ```bash
   docker compose exec cms npm run seed
   ```

### Produkcja (własna domena)

Przed wdrożeniem ustaw zmienne (np. plik `.env` obok `docker-compose.yml`):

| Zmienna | Opis |
|---------|------|
| `PUBLIC_URL` | Pełny publiczny adres strony, np. `https://twojadomena.pl` (bez końcowego `/`) |
| `PAYLOAD_SECRET` | Długi losowy sekret |
| `PORT` | Port na hoście mapowany na Caddy (domyślnie `8787`) |

Po zmianie `PUBLIC_URL` zrestartuj stack: `docker compose up -d`.

Na serwerze włącz HTTPS (np. Caddy z automatycznym TLS): zamień/usługę `edge` na obraz z Twoim `Caddyfile` z blokiem `twojadomena.pl { ... }`, lub postaw reverse proxy (Traefik, nginx) przed `edge`.

### Development lokalny (bez Dockera)

```bash
npm install
npm run dev:all
```

Frontend: http://localhost:5173 · CMS: http://localhost:3000/admin

### Produkcja bez Dockera — jedna maszyna, jedna domena

Masz VPS i domenę, bez Dockera: nginx (lub Caddy) serwuje **`dist/`**, a ścieżki **`/api`**, **`/admin`**, **`/media`** idą do Payload na localhost. Dane trzymasz w **PostgreSQL** + **`cms/media/`**. Szczegóły, przykład nginx i systemd: [**DEPLOY-VPS.md**](./DEPLOY-VPS.md).  
Po zmianach w repo na serwerze: `git pull` i `./scripts/deploy-on-server.sh`.

---

## Netlify (tylko frontend + proxy do CMS)

Jeśli chcesz hosting statyczny na Netlify, a CMS osobno — **checklista krok po kroku**, `CMS_ORIGIN` i blueprint Render: [**DEPLOY-NETLIFY.md**](./DEPLOY-NETLIFY.md) (oraz [`render.yaml`](./render.yaml) w korzeniu repo).
