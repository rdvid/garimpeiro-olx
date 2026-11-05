# Opções de execução

Controlam o loop de monitoramento do CLI.

## `--intervalo` / `--delay`

|             |         |
| ----------- | ------- |
| **Tipo**    | number  |
| **Padrão**  | `60`    |
| **Unidade** | minutos |

Tempo entre uma execução do garimpo e a próxima. O programa agenda a próxima iteração com `setInterval`.

**Exemplo:** `--intervalo 30` (a cada meia hora)

## `--parar-ao-encontrar-ofertas` / `--pararAoEncontrarOfertas`

|            |         |
| ---------- | ------- |
| **Tipo**   | boolean |
| **Padrão** | `true`  |

Quando `true`, encerra o processo após encontrar ofertas na faixa de preço (depois de notificar). Quando `false`, continua no intervalo configurado.

**Exemplo:** `--parar-ao-encontrar-ofertas false`

## Comportamento

1. Na primeira execução (e nas seguintes), busca páginas, extrai anúncios e filtra por preço.
2. Se não houver ofertas, aguarda o intervalo e repete.
3. URL inválida (HTTP 404) encerra com código de saída `1`.
