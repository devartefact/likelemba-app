import { useId } from 'react'

// Un champ de formulaire : son libellé, sa zone de saisie et son message d'erreur.
function ChampFormulaire({ libelle, type = 'text', valeur, surChangement, erreur, autoComplete }) {
  // useId relie le libellé au champ : cliquer sur le libellé place le curseur dans le champ
  const id = useId()

  return (
    <div className="fieldset">
      <label htmlFor={id} className="fieldset-legend">
        {libelle}
      </label>
      <input
        id={id}
        type={type}
        className={`input w-full ${erreur ? 'input-error' : ''}`}
        value={valeur}
        onChange={(evenement) => surChangement(evenement.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(erreur)}
      />
      {erreur && <p className="text-red-700 text-sm">{erreur}</p>}
    </div>
  )
}

export default ChampFormulaire
