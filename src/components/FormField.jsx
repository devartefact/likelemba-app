import { useId } from 'react'

function FormField({ label, type = 'text', value, onChange, error, autoComplete, endAdornment }) {
  const inputId = useId()

  return (
    <div className="fieldset">
      <label htmlFor={inputId} className="fieldset-legend">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={type}
          className={`input w-full ${endAdornment ? 'pr-12' : ''} ${error ? 'input-error' : ''}`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
        />
        {endAdornment}
      </div>
      {error && <p className="text-error text-sm pl-4">{error}</p>}
    </div>
  )
}

export default FormField
