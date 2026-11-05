# Opções de localização

Definem o subdomínio da OLX e o caminho regional na URL.

## `--uf` / `--estado`

|                 |                                    |
| --------------- | ---------------------------------- |
| **Tipo**        | string                             |
| **Obrigatório** | sim                                |
| **Valores**     | Siglas de UF (`sp`, `rj`, `mg`, …) |

Segmento de estado na URL: `www.olx.com.br/estado-{uf}/...`.

**Exemplo:** `--uf sp`

## `--ddd`

|                 |                                                 |
| --------------- | ----------------------------------------------- |
| **Tipo**        | number                                          |
| **Obrigatório** | sim (validado pelo CLI)                         |
| **Valores**     | Códigos DDD suportados pela OLX (11, 12, 21, …) |

Mapeia para o segmento regional fixo da OLX (ex.: DDD 12 → `vale-do-paraiba-e-litoral-norte`).

**Exemplo:** `--ddd 12`

## `--zona`

|                 |                                                |
| --------------- | ---------------------------------------------- |
| **Tipo**        | string                                         |
| **Obrigatório** | não                                            |
| **Formato**     | Texto livre; convertido para kebab-case na URL |

Segmento opcional após a região DDD.

**Exemplo:** `--zona 'vale do paraiba'`

## `--cidade`

|                 |                             |
| --------------- | --------------------------- |
| **Tipo**        | string                      |
| **Obrigatório** | não                         |
| **Regra**       | Exige `--zona` se informada |

Segmento após a zona.

**Exemplo:** `--cidade 'sao jose dos campos'`

## Interação com a URL

Ordem final: `https://www.olx.com.br/estado-{uf}/{regiao-ddd}/{zona}/{cidade}?q=...`

Se `--zona` ou `--cidade` forem omitidos, esses segmentos são omitidos da URL.
