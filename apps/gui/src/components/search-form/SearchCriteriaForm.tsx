import {
  ddds,
  ordens,
  ufs,
  type Ordem,
  type UF,
} from '@garimpeiro/core/browser'
import { useState, type FormEvent } from 'react'

import { Alert } from '@/components/ui/Alert.tsx'
import { Button } from '@/components/ui/Button.tsx'
import { Input } from '@/components/ui/Input.tsx'
import { Select } from '@/components/ui/Select.tsx'
import type { ScrapeFormPayload } from '@/lib/api.ts'

export type SearchCriteriaFormProps = {
  initial: ScrapeFormPayload
  submitLabel?: string
  secondaryLabel?: string
  onSecondary?: (criteria: ScrapeFormPayload) => void
  onCancel?: () => void
  onSubmit: (criteria: ScrapeFormPayload) => Promise<void> | void
  busy?: boolean
  error?: string
}

function validate(form: ScrapeFormPayload) {
  const errors: Partial<Record<keyof ScrapeFormPayload, string>> = {}
  if (!form.produto.trim()) errors.produto = 'Informe o produto'
  if (form.preco == null || Number.isNaN(form.preco) || form.preco < 0) {
    errors.preco = 'Informe um preço válido'
  }
  if (form.cidade?.trim() && !form.zona?.trim()) {
    errors.zona = 'Informe a zona quando houver cidade'
  }
  return errors
}

export function SearchCriteriaForm({
  initial,
  submitLabel = 'Garimpar',
  secondaryLabel,
  onSecondary,
  onCancel,
  onSubmit,
  busy = false,
  error,
}: SearchCriteriaFormProps) {
  const [form, setForm] = useState<ScrapeFormPayload>(initial)
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ScrapeFormPayload, string>>
  >({})

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = validate(form)
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    await onSubmit(form)
  }

  return (
    <form className="panel panel-body" onSubmit={handleSubmit} noValidate>
      {error ? (
        <Alert tone="danger" title="Falha na busca">
          {error}
        </Alert>
      ) : null}

      <section className="form-section">
        <h2>O quê</h2>
        <div className="form-grid">
          <Input
            label="Produto"
            required
            value={form.produto}
            error={fieldErrors.produto}
            onChange={(e) =>
              setForm((f) => ({ ...f, produto: e.target.value }))
            }
          />
          <Input
            label="Preço alvo (R$)"
            type="number"
            required
            min={0}
            value={form.preco}
            error={fieldErrors.preco}
            onChange={(e) =>
              setForm((f) => ({ ...f, preco: Number(e.target.value) }))
            }
          />
          <Input
            label="Percentual da faixa (%)"
            type="number"
            min={0}
            max={100}
            hint="Opcional — padrão das preferências"
            value={form.percentual ?? 30}
            onChange={(e) =>
              setForm((f) => ({ ...f, percentual: Number(e.target.value) }))
            }
          />
        </div>
      </section>

      <section className="form-section">
        <h2>Onde</h2>
        <div className="form-grid">
          <Select
            label="UF"
            required
            value={form.uf}
            options={ufs.map((uf) => ({
              value: uf,
              label: uf.toUpperCase(),
            }))}
            onChange={(e) =>
              setForm((f) => ({ ...f, uf: e.target.value as UF }))
            }
          />
          <Select
            label="DDD (região OLX)"
            required
            value={form.ddd}
            options={ddds.map((ddd) => ({
              value: ddd,
              label: String(ddd),
            }))}
            onChange={(e) =>
              setForm((f) => ({ ...f, ddd: Number(e.target.value) }))
            }
          />
          <Input
            label="Zona"
            value={form.zona ?? ''}
            error={fieldErrors.zona}
            placeholder="vale do paraiba"
            onChange={(e) => setForm((f) => ({ ...f, zona: e.target.value }))}
          />
          <Input
            label="Cidade"
            value={form.cidade ?? ''}
            placeholder="sao jose dos campos"
            onChange={(e) => setForm((f) => ({ ...f, cidade: e.target.value }))}
          />
        </div>
      </section>

      <details className="details-toggle form-section">
        <summary>Opções avançadas</summary>
        <div className="form-grid">
          <Select
            label="Ordem"
            value={form.ordem ?? 'mais relevantes'}
            options={ordens.map((ordem) => ({
              value: ordem,
              label: ordem,
            }))}
            onChange={(e) =>
              setForm((f) => ({ ...f, ordem: e.target.value as Ordem }))
            }
          />
          <Input
            label="Páginas"
            type="number"
            min={1}
            value={form.paginas ?? 1}
            onChange={(e) =>
              setForm((f) => ({ ...f, paginas: Number(e.target.value) }))
            }
          />
        </div>
      </details>

      <div className="form-actions">
        <Button type="submit" disabled={busy}>
          {busy ? 'Garimpando…' : submitLabel}
        </Button>
        {secondaryLabel && onSecondary ? (
          <Button
            type="button"
            variant="secondary"
            disabled={busy}
            onClick={() => onSecondary(form)}
          >
            {secondaryLabel}
          </Button>
        ) : null}
        {onCancel ? (
          <Button
            type="button"
            variant="ghost"
            disabled={busy}
            onClick={onCancel}
          >
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  )
}
