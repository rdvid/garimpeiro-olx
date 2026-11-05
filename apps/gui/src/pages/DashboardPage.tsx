import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/Badge.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { EmptyState } from '@/components/ui/EmptyState.tsx'
import { KpiStat } from '@/components/ui/KpiStat.tsx'
import { PageHeader } from '@/components/ui/PageHeader.tsx'
import { formatDateTime, formatPrice, locationLabel } from '@/lib/format.ts'
import { useScrape } from '@/lib/use-scrape.ts'
import { useWorkspace } from '@/lib/workspace.tsx'

export function DashboardPage() {
  const { state, activeRun, setActiveRunId } = useWorkspace()
  const { run, busy } = useScrape()
  const recentRuns = state.runs.slice(0, 5)
  const recentOffers = activeRun?.matches.slice(0, 5) ?? []

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Visão operacional do último garimpo e da atividade recente."
        actions={
          <Link to="/busca">
            <Button>Garimpar agora</Button>
          </Link>
        }
      />

      {!activeRun ? (
        <div className="panel">
          <EmptyState
            title="Comece pelo primeiro garimpo"
            description="Configure produto, preço alvo e região. As ofertas na faixa aparecem aqui e em Ofertas."
            action={
              <Link to="/busca">
                <Button>Nova busca</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="stack">
          <div className="kpi-row">
            <KpiStat
              label="Ofertas na faixa"
              value={activeRun.matchCount}
              hint={activeRun.status === 'error' ? 'Última falhou' : undefined}
            />
            <KpiStat
              label="Anúncios analisados"
              value={activeRun.scrapedCount}
            />
            <KpiStat
              label="Faixa de preço"
              value={`${formatPrice(activeRun.priceBand.min)} – ${formatPrice(activeRun.priceBand.max)}`}
            />
            <KpiStat
              label="Status"
              value={
                activeRun.status === 'success'
                  ? 'Com ofertas'
                  : activeRun.status === 'empty'
                    ? 'Sem ofertas'
                    : 'Erro'
              }
            />
          </div>

          <div className="summary-grid">
            <section className="panel">
              <div className="panel-header">
                <h2>Última busca</h2>
                <div className="row-actions">
                  <Button
                    size="sm"
                    disabled={busy}
                    onClick={() => void run(activeRun.criteria)}
                  >
                    Repetir
                  </Button>
                  <Link to="/busca" state={{ criteria: activeRun.criteria }}>
                    <Button size="sm" variant="secondary">
                      Ajustar
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="panel-body">
                <dl className="summary-meta">
                  <dt>Produto</dt>
                  <dd>{activeRun.criteria.produto}</dd>
                  <dt>Local</dt>
                  <dd>{locationLabel(activeRun.criteria)}</dd>
                  <dt>Preço alvo</dt>
                  <dd className="mono">
                    {formatPrice(activeRun.criteria.preco)} ±{' '}
                    {activeRun.criteria.percentual ?? 30}%
                  </dd>
                  <dt>Executado</dt>
                  <dd>{formatDateTime(activeRun.createdAt)}</dd>
                </dl>
              </div>
            </section>

            <section className="panel">
              <div className="panel-header">
                <h2>Ofertas recentes</h2>
                <Link to="/ofertas">Ver todas</Link>
              </div>
              <div className="panel-body">
                {recentOffers.length === 0 ? (
                  <p className="muted">Nenhuma oferta nesta execução.</p>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {recentOffers.map((ad) => (
                      <li key={ad.link} style={{ marginBottom: 8 }}>
                        <a href={ad.link} target="_blank" rel="noreferrer">
                          {ad.title}
                        </a>
                        <div className="mono muted">
                          {formatPrice(ad.price)}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>

          <section className="panel">
            <div className="panel-header">
              <h2>Execuções recentes</h2>
              <Link to="/historico">Histórico</Link>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Quando</th>
                    <th>Produto</th>
                    <th>Status</th>
                    <th>Matches</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {recentRuns.map((item) => (
                    <tr key={item.id}>
                      <td>{formatDateTime(item.createdAt)}</td>
                      <td>{item.criteria.produto}</td>
                      <td>
                        <Badge
                          tone={
                            item.status === 'success'
                              ? 'success'
                              : item.status === 'empty'
                                ? 'warning'
                                : 'danger'
                          }
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td className="mono">{item.matchCount}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setActiveRunId(item.id)
                          }}
                        >
                          Ver
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
