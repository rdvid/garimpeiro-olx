import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button.tsx'
import { Dialog } from '@/components/ui/Dialog.tsx'
import { EmptyState } from '@/components/ui/EmptyState.tsx'
import { PageHeader } from '@/components/ui/PageHeader.tsx'
import { formatDateTime, formatPrice, locationLabel } from '@/lib/format.ts'
import { useScrape } from '@/lib/use-scrape.ts'
import { useWorkspace } from '@/lib/workspace.tsx'

export function SavedSearchesPage() {
  const { state, deleteSearch, duplicateSearch } = useWorkspace()
  const { run, busy } = useScrape()
  const navigate = useNavigate()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  return (
    <div>
      <PageHeader
        title="Buscas salvas"
        description="Critérios reutilizáveis no workspace local."
        actions={
          <Link to="/busca">
            <Button>Nova busca</Button>
          </Link>
        }
      />

      {state.savedSearches.length === 0 ? (
        <div className="panel">
          <EmptyState
            title="Nenhuma busca salva"
            description="Salve uma configuração em Nova busca para repetir com um clique."
            action={
              <Link to="/busca">
                <Button>Criar busca</Button>
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
                  <th>Nome</th>
                  <th>Produto</th>
                  <th>Local</th>
                  <th>Preço</th>
                  <th>Atualizado</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {state.savedSearches.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.criteria.produto}</td>
                    <td>{locationLabel(item.criteria)}</td>
                    <td className="mono">{formatPrice(item.criteria.preco)}</td>
                    <td>{formatDateTime(item.updatedAt)}</td>
                    <td>
                      <div className="row-actions">
                        <Button
                          size="sm"
                          disabled={busy}
                          onClick={() => void run(item.criteria)}
                        >
                          Rodar
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            navigate('/busca', {
                              state: { criteria: item.criteria },
                            })
                          }
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => duplicateSearch(item.id)}
                        >
                          Duplicar
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => setDeleteId(item.id)}
                        >
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog
        open={Boolean(deleteId)}
        title="Excluir busca salva?"
        danger
        confirmLabel="Excluir"
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteSearch(deleteId)
        }}
      >
        Esta ação remove a busca do workspace local. O histórico de execuções é
        mantido.
      </Dialog>
    </div>
  )
}
