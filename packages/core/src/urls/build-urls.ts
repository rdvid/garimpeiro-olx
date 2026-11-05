import type { ScrapeRequest } from '../types/search-config.js'
import { buildSearchUrl } from './url-parser.js'

export function buildSearchUrls(request: ScrapeRequest): URL[] {
  const pages = request.pages === 0 ? 1 : Math.abs(request.pages)

  return Array.from({ length: pages }, (_, index) =>
    buildSearchUrl(request.state, request.product, {
      region: request.region,
      zone: request.zone,
      city: request.city,
      order: request.order,
      page: index + 1,
    })
  )
}
