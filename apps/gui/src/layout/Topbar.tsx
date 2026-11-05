import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button.tsx'
import { formatRelative } from '@/lib/format.ts'
import { useWorkspace } from '@/lib/workspace.tsx'

export function Topbar({
  apiOk,
  onMenu,
}: {
  apiOk: boolean | null
  onMenu: () => void
}) {
  const { activeRun } = useWorkspace()

  return (
    <header className="topbar">
      <div className="topbar-left">
        <Button
          className="menu-toggle"
          variant="secondary"
          size="sm"
          onClick={onMenu}
          aria-label="Abrir navegação"
        >
          Menu
        </Button>
        <span
          className={`status-pill ${apiOk === true ? 'ok' : apiOk === false ? 'down' : ''}`}
        >
          <span className="dot" />
          API {apiOk === true ? 'online' : apiOk === false ? 'offline' : '…'}
        </span>
        {activeRun ? (
          <span className="muted">
            Último garimpo {formatRelative(activeRun.createdAt)}
          </span>
        ) : null}
      </div>
      <div className="topbar-right">
        <Link to="/busca">
          <Button size="sm">Nova busca</Button>
        </Link>
      </div>
    </header>
  )
}
