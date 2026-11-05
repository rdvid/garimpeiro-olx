import { parseSearchConfigFromArgv } from '@/argv/parse-search-config.js'
import { startGarimpoLoop } from '@/run-loop.js'

async function main() {
  const config = await parseSearchConfigFromArgv()
  startGarimpoLoop(config)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
