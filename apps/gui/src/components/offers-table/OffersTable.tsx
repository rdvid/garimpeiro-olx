import { useMemo, useState, type ReactNode } from 'react'

import { Badge } from '@/components/ui/Badge.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { EmptyState } from '@/components/ui/EmptyState.tsx'
import { formatPrice, pricePosition } from '@/lib/format.ts'
import type { ScrapeRun } from '@/lib/types.ts'

const PAGE_SIZE = 10

export function OffersTable({
  run,
  emptyAction,
}: {
  run: ScrapeRun | null
  emptyAction?: ReactNode
}) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<'price-asc' | 'price-desc' | 'title'>(
    'price-asc'
  )
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    if (!run) return []
    const q = query.trim().toLowerCase()
    let rows = run.matches
    if (q) rows = rows.filter((ad) => ad.title.toLowerCase().includes(q))
    rows = [...rows].sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title, 'pt-BR')
      if (sort === 'price-desc') return b.price - a.price
      return a.price - b.price
    })
    return rows
  }, [run, query, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const pageRows = filtered.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE
  )

  if (!run) {
    return (
      <EmptyState
        title="Nenhuma execução selecionada"
        description="Rode uma busca para ver ofertas dentro da faixa de preço."
        action={emptyAction}
      />
    )
  }

  if (run.status === 'error') {
    return (
      <EmptyState
        title="A execução falhou"
        description={run.errorMessage ?? 'Não foi possível buscar anúncios.'}
        action={emptyAction}
      />
    )
  }

  if (run.matchCount === 0) {
    return (
      <EmptyState
        title="Nenhuma oferta na faixa"
        description={
          run.scrapedCount === 0
            ? 'Nenhum anúncio foi extraído da página da OLX.'
            : `Analisamos ${run.scrapedCount} anúncio(s), mas nenhum ficou entre ${formatPrice(run.priceBand.min)} e ${formatPrice(run.priceBand.max)}.`
        }
        action={emptyAction}
      />
    )
  }

  return (
    <div className="panel">
      <div className="panel-body">
        <div className="toolbar">
          <input
            className="field-control"
            placeholder="Buscar por título…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(0)
            }}
          />
          <select
            className="field-control"
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            aria-label="Ordenar"
          >
            <option value="price-asc">Preço ↑</option>
            <option value="price-desc">Preço ↓</option>
            <option value="title">Título</option>
          </select>
        </div>
      </div>

      <div className="table-wrap desktop-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Preço</th>
              <th>Faixa</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((ad) => {
              const pos = pricePosition(ad.price, run.priceBand)
              return (
                <tr key={ad.link}>
                  <td>{ad.title}</td>
                  <td className="mono">{formatPrice(ad.price)}</td>
                  <td>
                    <Badge
                      tone={
                        pos === 'in'
                          ? 'success'
                          : pos === 'below'
                            ? 'info'
                            : 'warning'
                      }
                    >
                      {pos === 'in'
                        ? 'Na faixa'
                        : pos === 'below'
                          ? 'Abaixo'
                          : 'Acima'}
                    </Badge>
                  </td>
                  <td>
                    <a href={ad.link} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="secondary">
                        Abrir OLX
                      </Button>
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="offer-list panel-body">
        {pageRows.map((ad) => {
          const pos = pricePosition(ad.price, run.priceBand)
          return (
            <article key={ad.link} className="offer-card">
              <strong>{ad.title}</strong>
              <div className="mono">{formatPrice(ad.price)}</div>
              <div style={{ margin: '8px 0' }}>
                <Badge
                  tone={
                    pos === 'in'
                      ? 'success'
                      : pos === 'below'
                        ? 'info'
                        : 'warning'
                  }
                >
                  {pos === 'in'
                    ? 'Na faixa'
                    : pos === 'below'
                      ? 'Abaixo'
                      : 'Acima'}
                </Badge>
              </div>
              <a href={ad.link} target="_blank" rel="noreferrer">
                Abrir na OLX
              </a>
            </article>
          )
        })}
      </div>

      <div className="pagination">
        <span>
          {filtered.length} oferta(s) · página {safePage + 1} de {pageCount}
        </span>
        <div className="row-actions">
          <Button
            size="sm"
            variant="secondary"
            disabled={safePage <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Anterior
          </Button>
          <Button
            size="sm"
            variant="secondary"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}
