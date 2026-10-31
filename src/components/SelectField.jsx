import { useId } from 'react'

function SelectField({ label, value, onChange, options }) {
  const selectId = useId()

  return (
    <div className="fieldset">
      <label htmlFor={selectId} className="fieldset-legend">
        {label}
      </label>
      <select
        id={selectId}
        className="select w-full"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectField
