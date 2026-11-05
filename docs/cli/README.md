# Referência da linha de comando

O Garimpeiro é executado pelo pacote `@garimpeiro/cli`. Não há subcomandos — apenas **opções** que reproduzem uma busca na OLX.

## Instalação e execução

```sh
npm install
npm run build
npm start -- --help
```

Em desenvolvimento (TypeScript direto):

```sh
npm run dev -- --help
```

## Documentação por grupo

| Grupo        | Arquivo                              | Opções                                                         |
| ------------ | ------------------------------------ | -------------------------------------------------------------- |
| Localização  | [localizacao.md](./localizacao.md)   | `--uf`, `--ddd`, `--zona`, `--cidade`                          |
| Busca        | [busca.md](./busca.md)               | `--produto`, `--preco`, `--percentual`, `--ordem`, `--paginas` |
| Execução     | [execucao.md](./execucao.md)         | `--intervalo`, `--parar-ao-encontrar-ofertas`                  |
| Notificações | [notificacoes.md](./notificacoes.md) | `--notificar-via-log`, `--notificar-via-desktop`               |

## Exemplo completo

```sh
npm start -- \
  --uf sp \
  --ddd 12 \
  --zona 'vale do paraiba' \
  --cidade 'sao jose dos campos' \
  --produto apartamento \
  --preco 300000 \
  --paginas 3
```

URL equivalente:

https://www.olx.com.br/estado-sp/vale-do-paraiba-e-litoral-norte/vale-do-paraiba/sao-jose-dos-campos?q=apartamento

## Interface gráfica

Para busca pontual via navegador, veja [apps/gui/README.md](../../apps/gui/README.md), `npm run dev:gui` ou `make dev`.
