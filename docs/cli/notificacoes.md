# Opções de notificação

Canais usados quando anúncios caem na faixa de preço (somente CLI).

## `--notificar-via-log` / `--notificarViaLog`

|            |         |
| ---------- | ------- |
| **Tipo**   | boolean |
| **Padrão** | `true`  |

Imprime no terminal um bloco destacado com título, data, preço e link do anúncio.

**Exemplo:** `--notificar-via-log false`

## `--notificar-via-desktop` / `--notificarViaDesktop`

|            |         |
| ---------- | ------- |
| **Tipo**   | boolean |
| **Padrão** | `true`  |

Dispara notificação nativa via [node-notifier](https://github.com/mikaelbr/node-notifier). No Linux, instale `notify-osd` ou `libnotify-bin`.

**Exemplo:** `--notificar-via-desktop false`

## Interface web

A GUI em `gui/` não usa estas opções; ela apenas lista resultados na página. Notificações desktop permanecem exclusivas do CLI.
