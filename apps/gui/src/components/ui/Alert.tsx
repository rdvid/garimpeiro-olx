import type { ReactNode } from 'react'

type Tone = 'info' | 'success' | 'warning' | 'danger'

export function Alert({
  tone = 'info',
  title,
  children,
}: {
  tone?: Tone
  title?: string
  children: ReactNode
}) {
  return (
    <div className={`alert alert-${tone}`} role="alert">
      {title ? <strong className="alert-title">{title}</strong> : null}
      <div className="alert-body">{children}</div>
    </div>
  )
}
