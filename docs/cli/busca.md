# Opções de busca

Termo, preço alvo e paginação dos resultados.

## `--produto`

|                 |        |
| --------------- | ------ |
| **Tipo**        | string |
| **Obrigatório** | sim    |

Termo enviado como parâmetro `q` na OLX.

**Exemplo:** `--produto apartamento`

## `--preco`

|                 |        |
| --------------- | ------ |
| **Tipo**        | number |
| **Obrigatório** | sim    |

Preço de referência em reais (valor inteiro). Usado com `--percentual` para definir a faixa de notificação.

**Exemplo:** `--preco 300000`

## `--percentual` / `--porcentagem`

|            |        |
| ---------- | ------ |
| **Tipo**   | number |
| **Padrão** | `10`   |

Variação percentual em torno do preço. Com preço 100 e percentual 10, aceita anúncios entre 90 e 110. Use `0` para exigir o preço exato.

**Exemplo:** `--percentual 5`

## `--ordem` / `--ordernar-por`

|             |                                                   |
| ----------- | ------------------------------------------------- |
| **Tipo**    | string                                            |
| **Padrão**  | `mais relevantes`                                 |
| **Valores** | `mais relevantes`, `mais recentes`, `menor preco` |

Controla parâmetros `sf` / `sp` na URL da OLX.

**Exemplo:** `--ordem 'menor preco'`

## `--paginas` / `--pags`

|            |        |
| ---------- | ------ |
| **Tipo**   | number |
| **Padrão** | `1`    |

Número de páginas de listagem a consultar (`o=2`, `o=3`, …).

**Exemplo:** `--paginas 3`
