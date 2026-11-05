# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/core/package.json ./packages/core/
COPY apps/api/package.json ./apps/api/
COPY apps/cli/package.json ./apps/cli/
COPY apps/gui/package.json ./apps/gui/
RUN npm ci

FROM deps AS build
WORKDIR /app
COPY tsconfig.base.json tsconfig.json ./
COPY packages/core ./packages/core
COPY apps/api ./apps/api
COPY apps/cli ./apps/cli
COPY apps/gui ./apps/gui
RUN npm run build -w @garimpeiro/core \
  && npm run build -w @garimpeiro/api \
  && npm run build -w gui

FROM node:22-alpine AS api
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
COPY package.json package-lock.json ./
COPY packages/core/package.json ./packages/core/
COPY apps/api/package.json ./apps/api/
COPY apps/cli/package.json ./apps/cli/
COPY apps/gui/package.json ./apps/gui/
RUN npm ci --omit=dev
COPY --from=build /app/packages/core/dist ./packages/core/dist
COPY --from=build /app/packages/core/package.json ./packages/core/package.json
COPY --from=build /app/apps/api/dist ./apps/api/dist
WORKDIR /app/apps/api
EXPOSE 3000
CMD ["node", "dist/server.js"]

FROM nginx:1.27-alpine AS gui
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/gui/dist /usr/share/nginx/html
EXPOSE 80
