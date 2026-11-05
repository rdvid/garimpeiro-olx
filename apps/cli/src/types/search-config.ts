import type { ScrapeRequest } from '@garimpeiro/core'

export type NotificationChannels = {
  log: boolean
  desktop: boolean
}

/** CLI polling config: scrape request + loop / notification options. */
export type SearchConfig = ScrapeRequest & {
  intervalMs: number
  stopOnMatch: boolean
  notifications: NotificationChannels
}
