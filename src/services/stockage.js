// Seul fichier qui parle directement à localStorage.
// localStorage ne garde que du texte : on convertit donc les données en JSON.

// Lit une donnée. Renvoie valeurParDefaut si elle n'existe pas ou est illisible.
export function lireDonnee(cle, valeurParDefaut) {
  try {
    const texte = localStorage.getItem(cle)
    
    return texte === null ? valeurParDefaut : JSON.parse(texte)
  } catch {
    return valeurParDefaut
  }
}

// Enregistre une donnée, en remplaçant l'ancienne valeur.
export function ecrireDonnee(cle, valeur) {
  try {
    localStorage.setItem(cle, JSON.stringify(valeur))
  } catch {
    throw new Error("Impossible d'enregistrer les données dans ce navigateur.")
  }
}

// Supprime une donnée.
export function supprimerDonnee(cle) {
  localStorage.removeItem(cle)
}
