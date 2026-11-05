import { dddToRegion } from '../regions/ddd-to-region.js'
import type { DDD } from '../choices/ddd.js'
import type { Ordem } from '../choices/ordem.js'
import ordens from '../choices/ordem.js'
import type { UF } from '../choices/uf.js'
import ufs from '../choices/uf.js'
import type { ScrapeRequest } from '../types/search-config.js'
import { kebabCase } from '../utils/kebab-case.js'

export type ScrapeBodyInput = {
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

export function parseScrapeInput(body: ScrapeBodyInput): ScrapeRequest {
  if (!ufs.includes(body.uf as UF)) {
    throw new Error(`UF inválida: ${body.uf}`)
  }
  if (body.ddd == null || Number.isNaN(Number(body.ddd))) {
    throw new Error('ddd é obrigatório e deve ser numérico')
  }
  if (!body.produto?.trim()) {
    throw new Error('produto é obrigatório')
  }
  if (body.preco == null || Number.isNaN(Number(body.preco))) {
    throw new Error('preco é obrigatório e deve ser numérico')
  }
  const hasCity = Boolean(body.cidade?.trim())
  const hasZone = Boolean(body.zona?.trim())
  if (hasCity && !hasZone) {
    throw new Error('Informe zona quando cidade for informada')
  }

  const order = (body.ordem ?? 'mais relevantes') as Ordem
  if (!ordens.includes(order)) {
    throw new Error(`ordem inválida: ${body.ordem}`)
  }

  const ddd = body.ddd as DDD
  const region = dddToRegion(ddd)
  if (!region) {
    throw new Error(`DDD inválido: ${body.ddd}`)
  }

  return {
    state: body.uf as UF,
    product: body.produto.trim(),
    region,
    zone: kebabCase(body.zona ?? ''),
    city: kebabCase(body.cidade ?? ''),
    order,
    price: Math.abs(Number(body.preco)),
    percentage: Math.abs(body.percentual ?? 10),
    pages: body.paginas === 0 ? 1 : Math.abs(body.paginas ?? 1),
  }
}
