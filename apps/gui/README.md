# Garimpeiro OLX — interface web

SPA React + Vite com shell SaaS (sidebar, dashboard, buscas, ofertas, histórico).

## Arquitetura

```
Navegador (gui)  →  proxy Vite /api  →  apps/api (Fastify)  →  @garimpeiro/core
```

- Live scrape: `POST /api/scrape`
- Workspace local (`localStorage`): buscas salvas, histórico de execuções, preferências
- Tipos/choices: `@garimpeiro/core/browser` apenas

## Rotas

| Rota | Função |
|------|--------|
| `/` | Dashboard |
| `/busca` | Nova busca |
| `/ofertas` | Tabela de ofertas da execução ativa |
| `/buscas` | Buscas salvas |
| `/historico` | Histórico de execuções |
| `/preferencias` | Padrões do formulário |
| `/sobre` | Status / ajuda |

## Desenvolvimento (host)

```sh
npm install
npm run dev:gui
```

- Interface: http://localhost:5173
- API: http://localhost:3000

## Docker

```sh
make dev   # http://localhost:5173
make up    # http://localhost:8080
```
