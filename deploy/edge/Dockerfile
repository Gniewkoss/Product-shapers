# Kontekst buildu: katalog główny repozytorium (marketing).
FROM node:20-bookworm-slim AS vite

WORKDIR /src

COPY package*.json ./
COPY scripts ./scripts
RUN npm ci

COPY vite.config.ts tsconfig.json tsconfig.node.json tailwind.config.js postcss.config.js index.html ./
COPY src ./src
COPY public ./public

ARG CMS_ORIGIN=http://cms:3000
ENV CMS_ORIGIN=$CMS_ORIGIN

RUN npm run build:netlify

FROM caddy:2-alpine

COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=vite /src/dist /srv
