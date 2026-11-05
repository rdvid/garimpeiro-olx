import type { Ad } from '@garimpeiro/core/browser'

export type ScrapeFormPayload = {
  uf: string
  ddd: number
  zona?: string
  cidade?: string
  produto: string
  preco: number
  percentual?: number
  ordem?: string
  paginas?: number
}

export type ScrapeResponse = {
  matches: Ad[]
  scrapedCount: number
  priceBand: { min: number; max: number }
}

export type ScrapeErrorResponse = {
  error: string
  href?: string
}

export async function postScrape(
  payload: ScrapeFormPayload
): Promise<ScrapeResponse> {
  const response = await fetch('/api/scrape', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as ScrapeResponse | ScrapeErrorResponse

  if (!response.ok) {
    const message =
      'error' in data ? data.error : 'Não foi possível completar a busca'
    throw new Error(message)
  }

  return data as ScrapeResponse
}
