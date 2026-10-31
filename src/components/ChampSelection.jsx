import { useId } from 'react'

// Une liste déroulante avec son libellé. Chaque option a une valeur et un libellé.
function ChampSelection({ libelle, valeur, surChangement, options }) {
  const id = useId()

  return (
    <div className="fieldset">
      <label htmlFor={id} className="fieldset-legend">
        {libelle}
      </label>
      <select
        id={id}
        className="select w-full"
        value={valeur}
        onChange={(evenement) => surChangement(evenement.target.value)}
      >
        {options.map((option) => (
          <option key={option.valeur} value={option.valeur}>
            {option.libelle}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ChampSelection
