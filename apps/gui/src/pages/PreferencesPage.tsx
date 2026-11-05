import { useState } from 'react'

import { SearchCriteriaForm } from '@/components/search-form/SearchCriteriaForm.tsx'
import { Alert } from '@/components/ui/Alert.tsx'
import { PageHeader } from '@/components/ui/PageHeader.tsx'
import { Select } from '@/components/ui/Select.tsx'
import { useToast } from '@/components/ui/Toast.tsx'
import type { ScrapeFormPayload } from '@/lib/api.ts'
import { useWorkspace } from '@/lib/workspace.tsx'

export function PreferencesPage() {
  const { state, updatePreferences } = useWorkspace()
  const { push } = useToast()
  const [density, setDensity] = useState(state.preferences.density)

  return (
    <div>
      <PageHeader
        title="Preferências"
        description="Valores padrão do formulário e densidade da interface (workspace local)."
      />

      <div className="prefs-grid">
        <Alert tone="info" title="Somente neste navegador">
          Preferências e buscas salvas ficam em localStorage. Não há conta ou
          sincronização entre dispositivos.
        </Alert>

        <section className="panel panel-body">
          <div className="form-section">
            <h2>Interface</h2>
            <Select
              label="Densidade"
              value={density}
              options={[
                { value: 'comfortable', label: 'Confortável' },
                { value: 'compact', label: 'Compacta' },
              ]}
              onChange={(e) => {
                const next = e.target.value as 'comfortable' | 'compact'
                setDensity(next)
                updatePreferences({ density: next })
                document.documentElement.dataset.density = next
                push('Densidade atualizada', 'success')
              }}
            />
          </div>
        </section>

        <section>
          <h2 className="form-section" style={{ marginBottom: 12 }}>
            Padrões de busca
          </h2>
          <SearchCriteriaForm
            initial={state.preferences.defaults}
            submitLabel="Salvar padrões"
            onSubmit={(criteria: ScrapeFormPayload) => {
              updatePreferences({ defaults: criteria })
              push('Padrões salvos', 'success')
            }}
          />
        </section>
      </div>
    </div>
  )
}
