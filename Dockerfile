# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
RUN apk add --no-cache openssl libc6-compat

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- dev: source is bind-mounted by docker-compose, not copied here ---
FROM deps AS dev
WORKDIR /app
EXPOSE 3000
CMD ["sh", "-c", "npx prisma generate && npx next dev -H 0.0.0.0"]

# --- builder: full source, production build ---
FROM deps AS builder
WORKDIR /app
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
COPY . .
RUN npm run build

# --- test: jest + bun against the built source ---
FROM builder AS test
RUN apk add --no-cache curl unzip bash \
    && curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"
CMD ["sh", "-c", "npm run test:jest && bun test bun.test"]

# --- runner: minimal production runtime ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
