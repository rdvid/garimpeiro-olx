import type { Ad } from '@garimpeiro/core/browser'

import type { ScrapeFormPayload } from '@/lib/api.ts'

export type SearchCriteria = ScrapeFormPayload

export type SavedSearch = {
  id: string
  name: string
  criteria: SearchCriteria
  createdAt: string
  updatedAt: string
}

export type ScrapeRunStatus = 'success' | 'empty' | 'error'

export type ScrapeRun = {
  id: string
  createdAt: string
  criteria: SearchCriteria
  status: ScrapeRunStatus
  errorMessage?: string
  scrapedCount: number
  matchCount: number
  priceBand: { min: number; max: number }
  matches: Ad[]
}

export type Preferences = {
  defaults: SearchCriteria
  density: 'comfortable' | 'compact'
}

export type WorkspaceState = {
  version: 1
  savedSearches: SavedSearch[]
  runs: ScrapeRun[]
  activeRunId: string | null
  preferences: Preferences
}
