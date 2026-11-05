import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { postScrape, type ScrapeFormPayload } from '@/lib/api.ts'
import { useToast } from '@/components/ui/Toast.tsx'
import { useWorkspace } from '@/lib/workspace.tsx'

export function useScrape() {
  const { addRun } = useWorkspace()
  const { push } = useToast()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function run(criteria: ScrapeFormPayload, goToOffers = true) {
    setBusy(true)
    setError('')
    try {
      const result = await postScrape(criteria)
      const status = result.matches.length > 0 ? 'success' : ('empty' as const)
      addRun({
        criteria,
        status,
        scrapedCount: result.scrapedCount,
        matchCount: result.matches.length,
        priceBand: result.priceBand,
        matches: result.matches,
      })
      push(
        result.matches.length > 0
          ? `${result.matches.length} oferta(s) na faixa`
          : 'Busca concluída sem ofertas na faixa',
        result.matches.length > 0 ? 'success' : 'info'
      )
      if (goToOffers) navigate('/ofertas')
      return true
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro desconhecido ao garimpar'
      setError(message)
      addRun({
        criteria,
        status: 'error',
        errorMessage: message,
        scrapedCount: 0,
        matchCount: 0,
        priceBand: { min: 0, max: 0 },
        matches: [],
      })
      push(message, 'danger')
      return false
    } finally {
      setBusy(false)
    }
  }

  return { run, busy, error, setError }
}
