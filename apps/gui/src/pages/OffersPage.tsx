import { Link } from 'react-router-dom'

import { OffersTable } from '@/components/offers-table/OffersTable.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { PageHeader } from '@/components/ui/PageHeader.tsx'
import { formatPrice } from '@/lib/format.ts'
import { useWorkspace } from '@/lib/workspace.tsx'

export function OffersPage() {
  const { activeRun } = useWorkspace()

  return (
    <div>
      <PageHeader
        title="Ofertas"
        description={
          activeRun
            ? `${activeRun.matchCount} na faixa · ${activeRun.scrapedCount} analisados · ${formatPrice(activeRun.priceBand.min)} – ${formatPrice(activeRun.priceBand.max)}`
            : 'Resultados do garimpo selecionado.'
        }
        actions={
          <Link to="/busca">
            <Button>Nova busca</Button>
          </Link>
        }
      />
      <OffersTable
        run={activeRun}
        emptyAction={
          <Link to="/busca">
            <Button>Garimpar agora</Button>
          </Link>
        }
      />
    </div>
  )
}
