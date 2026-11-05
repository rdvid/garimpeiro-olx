import type { InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string
}

export function Input({
  label,
  hint,
  error,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? props.name
  return (
    <label
      className={`field ${error ? 'field-error' : ''} ${className}`.trim()}
    >
      <span className="field-label">
        {label}
        {props.required ? <span className="req"> *</span> : null}
      </span>
      <input id={inputId} className="field-control" {...props} />
      {error ? <span className="field-msg">{error}</span> : null}
      {!error && hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  )
}
