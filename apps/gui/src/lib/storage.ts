import { createEmptyWorkspace } from '@/lib/defaults.ts'
import type { WorkspaceState } from '@/lib/types.ts'

const STORAGE_KEY = 'garimpeiro.workspace.v1'
const MAX_RUNS = 40

export function loadWorkspace(): WorkspaceState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createEmptyWorkspace()
    const parsed = JSON.parse(raw) as WorkspaceState
    if (parsed.version !== 1) return createEmptyWorkspace()
    return {
      ...createEmptyWorkspace(),
      ...parsed,
      preferences: {
        ...createEmptyWorkspace().preferences,
        ...parsed.preferences,
        defaults: {
          ...createEmptyWorkspace().preferences.defaults,
          ...parsed.preferences?.defaults,
        },
      },
    }
  } catch {
    return createEmptyWorkspace()
  }
}

export function saveWorkspace(state: WorkspaceState) {
  const trimmed: WorkspaceState = {
    ...state,
    runs: state.runs.slice(0, MAX_RUNS),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
}
