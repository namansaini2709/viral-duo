# =========================================================================
# STAGE 1: Dependency Installation & Vulnerability Lock
# =========================================================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
# Enforce script exclusion during dependency mapping to block malicious postinstalls
RUN npm ci --ignore-scripts

# =========================================================================
# STAGE 2: Secure Production Build
# =========================================================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build NextJS production bundle
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# =========================================================================
# STAGE 3: Minimal, Zero-Privilege Runtime Environment
# =========================================================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 1. Create a secure, unprivileged system group and user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 2. Expose the standard port
EXPOSE 3000
ENV PORT=3000

# 3. Only copy optimized build artifacts, leaving source files behind
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 4. Strictly switch execution context to the unprivileged non-root user
USER nextjs

CMD ["npm", "start"]
