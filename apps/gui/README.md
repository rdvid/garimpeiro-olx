# Garimpeiro OLX — interface web

SPA em React + Vite para montar buscas e disparar um garimpo único via API local.

## Arquitetura

```
Navegador (gui)  →  proxy Vite /api  →  apps/api (Fastify)  →  @garimpeiro/core
```

O GUI é isolado: só fala com a API por HTTP e importa tipos/choices de `@garimpeiro/core/browser` (nunca o entry Node do core). Imports internos usam `@/`.

## Desenvolvimento (host)

Na raiz do repositório:

```sh
npm install
npm run dev:gui
```

- Interface: http://localhost:5173
- API: http://localhost:3000

## Desenvolvimento (Docker)

```sh
make dev
```

Variáveis úteis:

| Variável | Onde | Padrão |
|----------|------|--------|
| `GARIMPEIRO_GUI_ORIGIN` | API | `http://localhost:5173` |
| `VITE_API_PROXY_TARGET` | Vite (dev) | `http://localhost:3000` (Docker: `http://api:3000`) |

## Produção (Docker)

```sh
make up
```

GUI em http://localhost:8080 (nginx serve o build estático e faz proxy de `/api` para o serviço `api`).

## Build local

```sh
npm run build -w gui
```
