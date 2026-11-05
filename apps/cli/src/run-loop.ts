import {
  InvalidSearchUrlError,
  buildSearchUrls,
  fetchSearchPages,
  findMatchingAds,
  formattedDate,
  formattedHour,
  notifyMatches,
  type SearchConfig,
} from '@garimpeiro/core'
import { addMilliseconds } from 'date-fns'

export async function runGarimpoIteration(config: SearchConfig): Promise<{
  hasMatches: boolean
}> {
  const urls = buildSearchUrls(config)
  const start = new Date()
  console.log(
    '--------------',
    `\niniciando garimpo às ${formattedHour(start)} de ${formattedDate(start)}...`
  )

  let documents: Document[]
  try {
    documents = await fetchSearchPages(urls)
  } catch (error) {
    if (error instanceof InvalidSearchUrlError) {
      console.error(error.message)
      process.exit(1)
    }
    throw error
  }

  const matches = findMatchingAds(documents, config)
  const hasMatches = matches.length > 0

  if (hasMatches) {
    notifyMatches(matches, config.notifications)

    if (config.stopOnMatch) {
      console.log('finalizando execução...')
      process.exit(0)
    }
  } else {
    console.log('nenhuma oferta encontrada...')
  }

  const shouldLogNext = !(hasMatches && config.stopOnMatch)
  if (shouldLogNext) {
    const nextIteration = addMilliseconds(new Date(), config.intervalMs)
    console.log(
      `o próximo garimpo será executado às ${formattedHour(nextIteration)}...`
    )
  }

  return { hasMatches }
}

export function startGarimpoLoop(config: SearchConfig): void {
  const handle = () => {
    void runGarimpoIteration(config).catch((error) => {
      console.error(error)
      process.exit(1)
    })
  }

  setInterval(handle, config.intervalMs)
  process.nextTick(handle)
}
