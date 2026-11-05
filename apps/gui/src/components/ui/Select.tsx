import type { SelectHTMLAttributes } from 'react'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  hint?: string
  error?: string
  options: Array<{ value: string | number; label: string }>
}

export function Select({
  label,
  hint,
  error,
  options,
  id,
  className = '',
  ...props
}: SelectProps) {
  const selectId = id ?? props.name
  return (
    <label
      className={`field ${error ? 'field-error' : ''} ${className}`.trim()}
    >
      <span className="field-label">
        {label}
        {props.required ? <span className="req"> *</span> : null}
      </span>
      <select id={selectId} className="field-control" {...props}>
        {options.map((option) => (
          <option key={String(option.value)} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="field-msg">{error}</span> : null}
      {!error && hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  )
}
