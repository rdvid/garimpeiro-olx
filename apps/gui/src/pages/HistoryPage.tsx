import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Badge } from '@/components/ui/Badge.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { Dialog } from '@/components/ui/Dialog.tsx'
import { EmptyState } from '@/components/ui/EmptyState.tsx'
import { PageHeader } from '@/components/ui/PageHeader.tsx'
import { formatDateTime, formatPrice } from '@/lib/format.ts'
import { useWorkspace } from '@/lib/workspace.tsx'

export function HistoryPage() {
  const { state, setActiveRunId, clearHistory } = useWorkspace()
  const navigate = useNavigate()
  const [confirmClear, setConfirmClear] = useState(false)

  return (
    <div>
      <PageHeader
        title="Histórico"
        description="Execuções de garimpo neste navegador (máx. 40)."
        actions={
          state.runs.length > 0 ? (
            <Button variant="danger" onClick={() => setConfirmClear(true)}>
              Limpar histórico
            </Button>
          ) : null
        }
      />

      {state.runs.length === 0 ? (
        <div className="panel">
          <EmptyState
            title="Sem execuções ainda"
            description="Cada garimpo fica registrado aqui com status e ofertas."
            action={
              <Link to="/busca">
                <Button>Nova busca</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="panel">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Quando</th>
                  <th>Produto</th>
                  <th>Status</th>
                  <th>Analisados</th>
                  <th>Matches</th>
                  <th>Faixa</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {state.runs.map((run) => (
                  <tr key={run.id}>
                    <td>{formatDateTime(run.createdAt)}</td>
                    <td>{run.criteria.produto}</td>
                    <td>
                      <Badge
                        tone={
                          run.status === 'success'
                            ? 'success'
                            : run.status === 'empty'
                              ? 'warning'
                              : 'danger'
                        }
                      >
                        {run.status}
                      </Badge>
                    </td>
                    <td className="mono">{run.scrapedCount}</td>
                    <td className="mono">{run.matchCount}</td>
                    <td className="mono">
                      {formatPrice(run.priceBand.min)} –{' '}
                      {formatPrice(run.priceBand.max)}
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setActiveRunId(run.id)
                          navigate('/ofertas')
                        }}
                      >
                        Ver ofertas
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog
        open={confirmClear}
        title="Limpar histórico?"
        danger
        confirmLabel="Limpar tudo"
        onClose={() => setConfirmClear(false)}
        onConfirm={clearHistory}
      >
        Remove todas as execuções e ofertas armazenadas neste navegador.
      </Dialog>
    </div>
  )
}
