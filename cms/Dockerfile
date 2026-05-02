# Budowa z kontekstu katalogu cms/: docker build -f Dockerfile .
FROM node:20-bookworm-slim AS builder

WORKDIR /app
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
# Next/Payload nie wymaga żywego Postgres przy kompilacji — tymczasowy SQLite w warstwie build.
RUN DATABASE_ADAPTER=sqlite \
    DATABASE_URI=file:/tmp/payload-build.sqlite \
    PAYLOAD_SECRET=build-time-placeholder-minimum-32-characters-xx \
    PAYLOAD_DATABASE_PUSH=false \
    npm run build

FROM node:20-bookworm-slim AS runner

WORKDIR /app
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src

RUN mkdir -p media && npm prune --omit=dev

EXPOSE 3000
CMD ["sh", "-c", "exec next start -H 0.0.0.0 -p ${PORT:-3000}"]
