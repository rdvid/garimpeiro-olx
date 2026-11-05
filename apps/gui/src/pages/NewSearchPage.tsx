import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { SearchCriteriaForm } from '@/components/search-form/SearchCriteriaForm.tsx'
import { PageHeader } from '@/components/ui/PageHeader.tsx'
import { useToast } from '@/components/ui/Toast.tsx'
import type { ScrapeFormPayload } from '@/lib/api.ts'
import { useScrape } from '@/lib/use-scrape.ts'
import { useWorkspace } from '@/lib/workspace.tsx'

export function NewSearchPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { getDefaults, saveSearch } = useWorkspace()
  const { push } = useToast()
  const { run, busy, error } = useScrape()
  const seeded =
    (location.state as { criteria?: ScrapeFormPayload } | null)?.criteria ??
    getDefaults()
  const [initial] = useState(seeded)

  return (
    <div>
      <PageHeader
        title="Nova busca"
        description="Defina produto, preço alvo e região OLX. Salve a busca para reutilizar."
      />
      <SearchCriteriaForm
        initial={initial}
        busy={busy}
        error={error}
        secondaryLabel="Salvar busca"
        onCancel={() => navigate(-1)}
        onSecondary={(criteria) => {
          const name = window.prompt(
            'Nome da busca salva',
            `${criteria.produto} · ${criteria.uf.toUpperCase()}`
          )
          if (!name?.trim()) return
          saveSearch(name.trim(), criteria)
          push('Busca salva', 'success')
        }}
        onSubmit={(criteria) => run(criteria)}
      />
    </div>
  )
}
