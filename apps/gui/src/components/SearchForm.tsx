import {
  ddds,
  ordens,
  ufs,
  type Ordem,
  type UF,
} from '@garimpeiro/core/browser'
import { useState, type FormEvent } from 'react'

import {
  postScrape,
  type ScrapeFormPayload,
  type ScrapeResponse,
} from '@/lib/api.ts'

export type SearchFormProps = {
  onResults: (result: ScrapeResponse) => void
  onError: (message: string) => void
  onLoading: (loading: boolean) => void
}

const defaultForm: ScrapeFormPayload = {
  uf: 'sp',
  ddd: 12,
  zona: 'vale do paraiba',
  cidade: 'sao jose dos campos',
  produto: 'apartamento',
  preco: 300000,
  percentual: 30,
  ordem: 'mais relevantes',
  paginas: 1,
}

export function SearchForm({ onResults, onError, onLoading }: SearchFormProps) {
  const [form, setForm] = useState<ScrapeFormPayload>(defaultForm)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onError('')
    onLoading(true)
    try {
      const result = await postScrape(form)
      onResults(result)
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Erro desconhecido')
      onResults({
        matches: [],
        scrapedCount: 0,
        priceBand: { min: 0, max: 0 },
      })
    } finally {
      onLoading(false)
    }
  }

  return (
    <form className="card form-grid" onSubmit={handleSubmit}>
      <label>
        UF
        <select
          value={form.uf}
          onChange={(e) => setForm((f) => ({ ...f, uf: e.target.value as UF }))}
        >
          {ufs.map((uf) => (
            <option key={uf} value={uf}>
              {uf.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <label>
        DDD (região OLX)
        <select
          value={form.ddd}
          onChange={(e) =>
            setForm((f) => ({ ...f, ddd: Number(e.target.value) }))
          }
        >
          {ddds.map((ddd) => (
            <option key={ddd} value={ddd}>
              {ddd}
            </option>
          ))}
        </select>
      </label>

      <label>
        Zona
        <input
          value={form.zona ?? ''}
          onChange={(e) => setForm((f) => ({ ...f, zona: e.target.value }))}
          placeholder="vale do paraiba"
        />
      </label>

      <label>
        Cidade
        <input
          value={form.cidade ?? ''}
          onChange={(e) => setForm((f) => ({ ...f, cidade: e.target.value }))}
          placeholder="sao jose dos campos"
        />
      </label>

      <label>
        Produto
        <input
          required
          value={form.produto}
          onChange={(e) => setForm((f) => ({ ...f, produto: e.target.value }))}
        />
      </label>

      <label>
        Preço alvo (R$)
        <input
          type="number"
          required
          min={0}
          value={form.preco}
          onChange={(e) =>
            setForm((f) => ({ ...f, preco: Number(e.target.value) }))
          }
        />
      </label>

      <label>
        Percentual (%)
        <input
          type="number"
          min={0}
          max={100}
          value={form.percentual ?? 10}
          onChange={(e) =>
            setForm((f) => ({ ...f, percentual: Number(e.target.value) }))
          }
        />
      </label>

      <label>
        Ordem
        <select
          value={form.ordem}
          onChange={(e) =>
            setForm((f) => ({ ...f, ordem: e.target.value as Ordem }))
          }
        >
          {ordens.map((ordem) => (
            <option key={ordem} value={ordem}>
              {ordem}
            </option>
          ))}
        </select>
      </label>

      <label>
        Páginas
        <input
          type="number"
          min={1}
          value={form.paginas ?? 1}
          onChange={(e) =>
            setForm((f) => ({ ...f, paginas: Number(e.target.value) }))
          }
        />
      </label>

      <button type="submit">Buscar ofertas agora</button>
      <p className="muted">
        A interface usa a API local (<code>/api/scrape</code>). Inicie com{' '}
        <code>npm run dev:gui</code> na raiz do repositório.
      </p>
    </form>
  )
}
