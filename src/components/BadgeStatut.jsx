import { STATUTS } from '../utils/format.js'

const COULEURS = {
  preparation: 'badge-neutral',
  en_cours: 'badge-primary',
  termine: 'badge-success',
}

// Petite étiquette qui affiche où en est un groupe.
function BadgeStatut({ statut }) {
  return <span className={`badge ${COULEURS[statut]}`}>{STATUTS[statut]}</span>
}

export default BadgeStatut
