import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ToastProvider } from '@/components/ui/Toast.tsx'
import { AppShell } from '@/layout/AppShell.tsx'
import { WorkspaceProvider } from '@/lib/workspace.tsx'
import { AboutPage } from '@/pages/AboutPage.tsx'
import { DashboardPage } from '@/pages/DashboardPage.tsx'
import { HistoryPage } from '@/pages/HistoryPage.tsx'
import { NewSearchPage } from '@/pages/NewSearchPage.tsx'
import { OffersPage } from '@/pages/OffersPage.tsx'
import { PreferencesPage } from '@/pages/PreferencesPage.tsx'
import { SavedSearchesPage } from '@/pages/SavedSearchesPage.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <WorkspaceProvider>
        <ToastProvider>
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<DashboardPage />} />
              <Route path="busca" element={<NewSearchPage />} />
              <Route path="ofertas" element={<OffersPage />} />
              <Route path="buscas" element={<SavedSearchesPage />} />
              <Route path="historico" element={<HistoryPage />} />
              <Route path="preferencias" element={<PreferencesPage />} />
              <Route path="sobre" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </ToastProvider>
      </WorkspaceProvider>
    </BrowserRouter>
  )
}
