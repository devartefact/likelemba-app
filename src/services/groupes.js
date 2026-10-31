import { ecrireDonnee, lireDonnee } from './stockage.js'

const CLE_GROUPES = 'likelemba_groupes'

// Lit tous les groupes de tous les comptes de ce navigateur.
function lireTousLesGroupes() {
  return lireDonnee(CLE_GROUPES, [])
}

// Renvoie les groupes de cet utilisateur, du plus récent au plus ancien.
// ATTENTION : c'est un simple filtre d'affichage, pas une vraie protection.
// Tous les groupes restent lisibles dans localStorage.
export function listerGroupes(utilisateurId) {
  return lireTousLesGroupes()
    .filter((groupe) => groupe.proprietaireId === utilisateurId)
    .reverse()
}

// Renvoie un groupe de cet utilisateur, ou null s'il n'existe pas ou appartient à un autre.
export function lireGroupe(groupeId, utilisateurId) {
  const groupe = lireTousLesGroupes().find((element) => element.id === groupeId)

  return groupe && groupe.proprietaireId === utilisateurId ? groupe : null
}

// Crée un groupe. L'organisateur en est le premier membre par défaut.
export function creerGroupe(utilisateur, donnees) {
  const nouveauGroupe = {
    id: crypto.randomUUID(),
    proprietaireId: utilisateur.id,
    ...donnees,
    statut: 'preparation',
    membres: [{ id: crypto.randomUUID(), nom: utilisateur.nom, telephone: '' }],
    tours: [],
  }

  ecrireDonnee(CLE_GROUPES, [...lireTousLesGroupes(), nouveauGroupe])

  return nouveauGroupe
}

// Modifie les informations d'un groupe, seulement tant qu'il n'a pas démarré.
export function modifierGroupe(groupeId, utilisateurId, donnees) {
  const groupe = lireGroupe(groupeId, utilisateurId)

  if (!groupe) throw new Error('Ce groupe est introuvable.')
  if (groupe.statut !== 'preparation') {
    throw new Error('Un groupe déjà démarré ne peut plus être modifié.')
  }

  const groupes = lireTousLesGroupes().map((element) =>
    element.id === groupeId ? { ...element, ...donnees } : element,
  )

  ecrireDonnee(CLE_GROUPES, groupes)
}

// Supprime un groupe, avec ses membres et ses tours.
export function supprimerGroupe(groupeId, utilisateurId) {
  if (!lireGroupe(groupeId, utilisateurId)) throw new Error('Ce groupe est introuvable.')

  const groupes = lireTousLesGroupes().filter((element) => element.id !== groupeId)

  ecrireDonnee(CLE_GROUPES, groupes)
}
