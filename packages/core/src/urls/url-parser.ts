import type { UF } from '../choices/uf.js'
import type { Ordem } from '../choices/ordem.js'
import { isEmpty } from '../utils/is-empty.js'
import { kebabCase } from '../utils/kebab-case.js'

export type UrlBuildParams = {
  region: string
  zone?: string
  city?: string
  order?: Ordem
  page?: number
}

export function buildSearchUrl(
  uf: UF,
  product: string,
  { region, zone, city, order, page }: UrlBuildParams
): URL {
  const parsedZone = isEmpty(zone) ? '' : `/${kebabCase(zone!)}`
  const parsedCity =
    isEmpty(zone) || isEmpty(city) ? '' : `/${kebabCase(city!)}`

  // OLX migrated from {uf}.olx.com.br to www.olx.com.br/estado-{uf}/...
  const url = new URL(
    `https://www.olx.com.br/estado-${uf}/${region}${parsedZone}${parsedCity}`
  )

  url.searchParams.append('q', product)

  if (order === 'mais recentes') url.searchParams.append('sf', '1')
  else if (order === 'menor preco') url.searchParams.append('sp', '2')

  if (page && page > 1) url.searchParams.append('o', page.toString())

  return url
}
