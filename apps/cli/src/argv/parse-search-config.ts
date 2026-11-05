import { parseScrapeInput } from '@garimpeiro/core'
import { minutesToMilliseconds } from 'date-fns'

import { getArgv } from '@/argv/get-argv.js'
import type { SearchConfig } from '@/types/search-config.js'

export async function parseSearchConfigFromArgv(): Promise<SearchConfig> {
  const argv = await getArgv().parseAsync()

  const scrape = parseScrapeInput({
    uf: argv.uf as string,
    ddd: argv.ddd as number,
    zona: argv.zona,
    cidade: argv.cidade,
    produto: argv.produto,
    preco: argv.preco,
    percentual: argv.percentual,
    ordem: argv.ordem,
    paginas: argv.paginas,
  })

  return {
    ...scrape,
    intervalMs: minutesToMilliseconds(Math.abs(argv.intervalo)),
    stopOnMatch: argv.pararAoEncontrarOfertas,
    notifications: {
      log: argv.notificarViaLog,
      desktop: argv.notificarViaDesktop,
    },
  }
}
