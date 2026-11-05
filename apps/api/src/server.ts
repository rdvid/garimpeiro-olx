import cors from '@fastify/cors'
import {
  InvalidSearchUrlError,
  parseScrapeInput,
  runScrape,
  type ScrapeBodyInput,
} from '@garimpeiro/core'
import Fastify from 'fastify'

const app = Fastify({ logger: true })

const guiOrigin = process.env.GARIMPEIRO_GUI_ORIGIN ?? 'http://localhost:5173'
const port = Number(process.env.PORT ?? 3000)
const host = process.env.HOST ?? '0.0.0.0'

await app.register(cors, {
  origin: guiOrigin,
  methods: ['GET', 'POST', 'OPTIONS'],
})

app.get('/api/health', async () => ({ ok: true }))

app.post<{ Body: ScrapeBodyInput }>('/api/scrape', async (request, reply) => {
  let scrapeRequest
  try {
    scrapeRequest = parseScrapeInput(request.body)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Requisição inválida'
    return reply.status(400).send({ error: message })
  }

  try {
    const { matches, scraped, priceBand } = await runScrape(scrapeRequest)
    return {
      matches,
      scrapedCount: scraped.length,
      priceBand,
    }
  } catch (error) {
    if (error instanceof InvalidSearchUrlError) {
      return reply.status(404).send({ error: error.message, href: error.href })
    }
    const message =
      error instanceof Error ? error.message : 'Falha ao buscar anúncios'
    request.log.error(error)
    return reply.status(502).send({ error: message })
  }
})

app.setErrorHandler((error, request, reply) => {
  const code = 'code' in error ? String(error.code) : ''
  if (
    error instanceof SyntaxError ||
    code === 'FST_ERR_CTP_INVALID_JSON_BODY'
  ) {
    return reply.status(400).send({ error: 'JSON inválido' })
  }
  request.log.error(error)
  return reply.status(500).send({ error: 'Erro interno' })
})

try {
  await app.listen({ port, host })
  app.log.info(`Garimpeiro API listening on http://${host}:${port}`)
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
