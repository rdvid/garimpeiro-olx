import type { Ad } from '@garimpeiro/core'

import type { NotificationChannels } from '@/types/search-config.js'
import { desktopNotification } from '@/notifications/desktop.js'
import { logNotification } from '@/notifications/log.js'

export function notifyMatches(
  matches: Ad[],
  channels: NotificationChannels
): void {
  if (channels.log) {
    matches.forEach((ad) => logNotification(ad.title, ad.price, ad.link))
  }

  if (channels.desktop) {
    matches.forEach((ad) => desktopNotification(ad.title, ad.price, ad.link))
  }
}
