import { useId } from 'react'

function FormField({ label, type = 'text', value, onChange, error, autoComplete }) {
  const inputId = useId()

  return (
    <div className="fieldset">
      <label htmlFor={inputId} className="fieldset-legend">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        className={`input w-full ${error ? 'input-error' : ''}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
      />
      {error && <p className="text-red-700 text-sm">{error}</p>}
    </div>
  )
}

export default FormField
