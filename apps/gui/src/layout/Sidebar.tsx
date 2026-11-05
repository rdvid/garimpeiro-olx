import { NavLink } from 'react-router-dom'

const groups = [
  {
    label: 'Operação',
    items: [
      { to: '/', label: 'Dashboard', icon: '◈', end: true },
      { to: '/busca', label: 'Nova busca', icon: '＋' },
      { to: '/ofertas', label: 'Ofertas', icon: '☰' },
    ],
  },
  {
    label: 'Biblioteca',
    items: [
      { to: '/buscas', label: 'Buscas salvas', icon: '☆' },
      { to: '/historico', label: 'Histórico', icon: '◷' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { to: '/preferencias', label: 'Preferências', icon: '⚙' },
      { to: '/sobre', label: 'Sobre', icon: 'ⓘ' },
    ],
  },
] as const

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden>
          G
        </div>
        <div className="brand-text">
          <strong>Garimpeiro</strong>
          <span>OLX price scout</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Principal">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="nav-group-label">{group.label}</div>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={'end' in item ? item.end : false}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
                onClick={onNavigate}
              >
                <span className="nav-icon" aria-hidden>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="workspace-chip">
          <span className="workspace-dot" aria-hidden />
          <span className="workspace-label">Workspace local</span>
        </div>
      </div>
    </aside>
  )
}
