<h1 align="center">Garimpeiro OLX</h1>
<p align="center">Procurando por algo na <i>OLX</i>? Seja avisado do <b>melhor preço</b>!</p>
<br />

## 👀 Demonstração

<figure>
  <img src="public/demo-notificacao-log.png" />
  <figcaption align="center">Notificação de oferta via log</figcaption>
</figure>

<figure>
  <img src="public/demo-notificacao-desktop-linux.png" />
  <figcaption align="center">Notificação de oferta via desktop (Linux)</figcaption>
</figure>

<figure>
  <img src="public/demo-nenhuma-oferta-encontrada.png" />
  <figcaption align="center">Loop enquanto não encontra ofertas</figcaption>
</figure>

## ⚠ Requisitos

Instale o [Node.js](https://nodejs.org/) **22 ou superior**. No Linux, instale `notify-osd` ou `libnotify-bin` para notificações desktop (detalhes [aqui](https://github.com/mikaelbr/node-notifier#requirements)).

Para API + GUI via Docker: Docker Engine e Docker Compose.

## 📥 Instalação

```sh
cd caminho-do-repo
npm install
npm run build
```

## 🤖 Utilização (CLI)

Ajuda completa:

```sh
npm start -- --help
# ou
make cli-dev -- --help
```

Documentação detalhada por grupo de opções: [docs/cli/README.md](docs/cli/README.md).

Exemplo:

```sh
npm start -- --uf sp --ddd 12 --zona 'vale do paraiba' --cidade 'sao jose dos campos' --produto apartamento --preco 1
```

URL equivalente:

<https://www.olx.com.br/estado-sp/vale-do-paraiba-e-litoral-norte/vale-do-paraiba/sao-jose-dos-campos?q=apartamento>

Desenvolvimento com recarga automática (CLI no host):

```sh
npm run dev -- --uf sp --ddd 12 --produto apartamento --preco 300000
```

## 🖥 Interface web + API

### Docker (recomendado)

```sh
make dev   # API + Vite com hot reload (http://localhost:5173)
make up    # stack de produção (GUI em http://localhost:8080)
make down  # para os containers
```

### Host

```sh
npm run dev:gui
```

Veja [apps/gui/README.md](apps/gui/README.md).

## 🏗 Estrutura do monorepo

| Pacote          | Função                            |
| --------------- | --------------------------------- |
| `packages/core` | Domínio compartilhado de scrape (`@garimpeiro/core`) |
| `apps/cli`      | CLI: loop, argv, notificações desktop/log (isola; só depende do core) |
| `apps/api`      | API HTTP Fastify (isola; só depende do core) |
| `apps/gui`      | SPA SaaS (dashboard/shell); HTTP → API; tipos via `@garimpeiro/core/browser` |

Apps **não** importam uns aos outros. Sempre faça o build do core primeiro (`npm run build` na raiz já ordena isso). Imports internos usam o alias `@/` (ex.: `@/run-loop.js`).

## 📄 Licença e CopyLeft

Esse projeto segue a [licença AGPL 3.0 ou superior](https://github.com/mrocha98/garimpeiro-olx/blob/main/LICENSE). Em resumo, você é livre para fazer o que quiser com o código fonte, desde que distribua suas modificações sob a mesma licença.

Obs: Eu sou um programador, não um advogado.

## 🤝 Contribuições

Caso tenha sugestões ou dúvidas abra um [issue](https://github.com/mrocha98/garimpeiro-olx/issues).

Se gostou do projeto considere contribuir com um pull request e tenha a honra de preencher itens dessa lista:

### TODO

- [ ] novos meios de notificação
  - [ ] SMS
  - [ ] Email
  - [ ] Whatsapp ([venom bot](https://github.com/orkestral/venom))
- [ ] bot no telegram
- [ ] cache
  - [ ] status das urls
  - [ ] preço máximo e mínimo
- [ ] testes unitários
- [ ] melhorar a documentação
  - [ ] mais exemplos
  - [ ] prints de notificações desktop em Windows e OSX
- [x] interface gráfica (base em `apps/gui/`)
