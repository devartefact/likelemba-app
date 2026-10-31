// Fonctions et libellés d'affichage, sans React.

export const DEVISES = ['CDF', 'USD']

export const FREQUENCES = {
  semaine: 'Chaque semaine',
  quinzaine: 'Chaque quinzaine',
  mois: 'Chaque mois',
}

export const STATUTS = {
  preparation: 'En préparation',
  en_cours: 'En cours',
  termine: 'Terminé',
}

// L'espace insécable évite que la devise passe seule à la ligne.
const ESPACE_INSECABLE = String.fromCharCode(160)

// 150000 et « CDF » donnent « 150 000 CDF ».
export function formaterMontant(montant, devise) {
  return `${new Intl.NumberFormat('fr-FR').format(montant)}${ESPACE_INSECABLE}${devise}`
}

// « 2026-11-07 » donne « 7 novembre 2026 ».
export function formaterDate(dateTexte) {
  const [annee, mois, jour] = dateTexte.split('-').map(Number)

  // On construit la date en heure locale pour ne jamais décaler le jour
  return new Date(annee, mois - 1, jour).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
