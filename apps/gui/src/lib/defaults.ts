import type { ScrapeFormPayload } from '@/lib/api.ts'
import type { Preferences, WorkspaceState } from '@/lib/types.ts'

export const defaultCriteria: ScrapeFormPayload = {
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

export const defaultPreferences: Preferences = {
  defaults: { ...defaultCriteria },
  density: 'comfortable',
}

export function createEmptyWorkspace(): WorkspaceState {
  return {
    version: 1,
    savedSearches: [],
    runs: [],
    activeRunId: null,
    preferences: structuredClone(defaultPreferences),
  }
}

export function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`
}
