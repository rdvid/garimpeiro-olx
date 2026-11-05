import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { createId } from '@/lib/defaults.ts'
import { loadWorkspace, saveWorkspace } from '@/lib/storage.ts'
import type { ScrapeFormPayload } from '@/lib/api.ts'
import type {
  Preferences,
  SavedSearch,
  ScrapeRun,
  SearchCriteria,
  WorkspaceState,
} from '@/lib/types.ts'

type WorkspaceContextValue = {
  state: WorkspaceState
  activeRun: ScrapeRun | null
  addRun: (
    run: Omit<ScrapeRun, 'id' | 'createdAt'> & { id?: string }
  ) => ScrapeRun
  setActiveRunId: (id: string | null) => void
  saveSearch: (
    name: string,
    criteria: SearchCriteria,
    id?: string
  ) => SavedSearch
  duplicateSearch: (id: string) => void
  deleteSearch: (id: string) => void
  updatePreferences: (prefs: Partial<Preferences>) => void
  clearHistory: () => void
  getDefaults: () => ScrapeFormPayload
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkspaceState>(() => loadWorkspace())

  useEffect(() => {
    saveWorkspace(state)
  }, [state])

  useEffect(() => {
    document.documentElement.dataset.density = state.preferences.density
  }, [state.preferences.density])

  const activeRun = useMemo(
    () => state.runs.find((run) => run.id === state.activeRunId) ?? null,
    [state.runs, state.activeRunId]
  )

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      state,
      activeRun,
      addRun: (input) => {
        const run: ScrapeRun = {
          id: input.id ?? createId('run'),
          createdAt: new Date().toISOString(),
          criteria: input.criteria,
          status: input.status,
          errorMessage: input.errorMessage,
          scrapedCount: input.scrapedCount,
          matchCount: input.matchCount,
          priceBand: input.priceBand,
          matches: input.matches,
        }
        setState((prev) => ({
          ...prev,
          runs: [run, ...prev.runs],
          activeRunId: run.id,
        }))
        return run
      },
      setActiveRunId: (id) =>
        setState((prev) => ({ ...prev, activeRunId: id })),
      saveSearch: (name, criteria, id) => {
        const now = new Date().toISOString()
        if (id) {
          let updated: SavedSearch | null = null
          setState((prev) => ({
            ...prev,
            savedSearches: prev.savedSearches.map((item) => {
              if (item.id !== id) return item
              updated = { ...item, name, criteria, updatedAt: now }
              return updated
            }),
          }))
          return (
            updated ?? {
              id,
              name,
              criteria,
              createdAt: now,
              updatedAt: now,
            }
          )
        }
        const saved: SavedSearch = {
          id: createId('search'),
          name,
          criteria,
          createdAt: now,
          updatedAt: now,
        }
        setState((prev) => ({
          ...prev,
          savedSearches: [saved, ...prev.savedSearches],
        }))
        return saved
      },
      duplicateSearch: (id) => {
        setState((prev) => {
          const source = prev.savedSearches.find((item) => item.id === id)
          if (!source) return prev
          const now = new Date().toISOString()
          const copy: SavedSearch = {
            ...source,
            id: createId('search'),
            name: `${source.name} (cópia)`,
            createdAt: now,
            updatedAt: now,
          }
          return { ...prev, savedSearches: [copy, ...prev.savedSearches] }
        })
      },
      deleteSearch: (id) =>
        setState((prev) => ({
          ...prev,
          savedSearches: prev.savedSearches.filter((item) => item.id !== id),
        })),
      updatePreferences: (prefs) =>
        setState((prev) => ({
          ...prev,
          preferences: {
            ...prev.preferences,
            ...prefs,
            defaults: prefs.defaults
              ? { ...prev.preferences.defaults, ...prefs.defaults }
              : prev.preferences.defaults,
          },
        })),
      clearHistory: () =>
        setState((prev) => ({
          ...prev,
          runs: [],
          activeRunId: null,
        })),
      getDefaults: () => ({ ...state.preferences.defaults }),
    }),
    [state, activeRun]
  )

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext)
  if (!ctx)
    throw new Error('useWorkspace must be used within WorkspaceProvider')
  return ctx
}
