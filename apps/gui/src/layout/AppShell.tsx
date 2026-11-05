import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/layout/Sidebar.tsx'
import { Topbar } from '@/layout/Topbar.tsx'
import { fetchHealth } from '@/lib/api.ts'

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [apiOk, setApiOk] = useState<boolean | null>(null)

  useEffect(() => {
    let alive = true
    const check = async () => {
      const ok = await fetchHealth()
      if (alive) setApiOk(ok)
    }
    void check()
    const id = window.setInterval(check, 30000)
    return () => {
      alive = false
      window.clearInterval(id)
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960) setMobileOpen(false)
      setCollapsed(window.innerWidth <= 1100 && window.innerWidth > 960)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div
      className={`app-shell${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}
    >
      <div
        className="mobile-nav-backdrop"
        onClick={() => setMobileOpen(false)}
      />
      <Sidebar onNavigate={() => setMobileOpen(false)} />
      <div className="shell-main">
        <Topbar apiOk={apiOk} onMenu={() => setMobileOpen((v) => !v)} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
