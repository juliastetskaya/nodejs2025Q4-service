FROM node:24-alpine AS development

WORKDIR /usr/app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run build

FROM node:24-alpine AS production

WORKDIR /usr/app

RUN apk add --no-cache openssl

COPY --from=development /usr/app/package*.json ./
COPY --from=development /usr/app/dist ./dist/
COPY --from=development /usr/app/tsconfig*.json ./
COPY --from=development /usr/app/doc/api.yaml ./doc/api.yaml
COPY --from=development /usr/app/prisma ./prisma/

RUN npm ci --only=production

CMD sh -c "npx prisma migrate deploy && npm run start:dev"