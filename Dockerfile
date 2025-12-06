FROM node:24-alpine AS development

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:24-alpine AS production

WORKDIR /usr/app

COPY --from=development /usr/app/package*.json ./
COPY --from=development /usr/app/dist ./dist
COPY --from=development /usr/app/tsconfig*.json .
COPY --from=development /usr/app/doc/api.yaml ./doc/api.yaml

RUN npm ci --only=production

CMD ["npm", "run", "start:dev"]