FROM node:24-alpine AS deps

WORKDIR /usr/app

RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm ci --omit=dev && \
    npm cache clean --force

FROM node:24-alpine AS builder

WORKDIR /usr/app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY --from=deps /usr/app/node_modules ./node_modules/

RUN npm install --only=dev && \
    npm cache clean --force

COPY . .

RUN npm run build && \
    rm -rf node_modules

FROM node:24-alpine AS production

WORKDIR /usr/app

RUN apk add --no-cache openssl && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    rm -rf /var/cache/apk/* /tmp/* /root/.npm

COPY --from=deps --chown=nestjs:nodejs /usr/app/node_modules ./node_modules/
COPY --from=builder --chown=nestjs:nodejs /usr/app/dist ./dist/
COPY --from=builder --chown=nestjs:nodejs /usr/app/prisma ./prisma/
COPY --chown=nestjs:nodejs package*.json ./

USER nestjs

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && node dist/main"]