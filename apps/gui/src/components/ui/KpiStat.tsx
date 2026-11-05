import type { ReactNode } from 'react'

export function KpiStat({
  label,
  value,
  hint,
}: {
  label: string
  value: ReactNode
  hint?: string
}) {
  return (
    <div className="kpi">
      <span className="kpi-label">{label}</span>
      <span className="kpi-value mono">{value}</span>
      {hint ? <span className="kpi-hint">{hint}</span> : null}
    </div>
  )
}
