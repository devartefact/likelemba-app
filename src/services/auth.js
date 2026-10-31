import { ecrireDonnee, lireDonnee, supprimerDonnee } from './stockage.js'

const CLE_UTILISATEURS = 'likelemba_utilisateurs'
const CLE_SESSION = 'likelemba_session'

// Transforme des octets en texte hexadécimal, plus facile à enregistrer.
function enHexadecimal(octets) {
  return Array.from(octets)
    .map((octet) => octet.toString(16).padStart(2, '0'))
    .join('')
}

// Le sel est un texte aléatoire propre à chaque compte : deux mots de passe
// identiques ne donnent ainsi jamais le même résultat une fois hachés.
function genererSel() {
  return enHexadecimal(crypto.getRandomValues(new Uint8Array(16)))
}

// Transforme le mot de passe en empreinte SHA-256, sans retour possible.
// ATTENTION : suffisant pour un atelier, pas pour une vraie application.
// Il faudrait un serveur et un algorithme lent comme bcrypt ou Argon2.
async function hacherMotDePasse(motDePasse, sel) {
  // crypto.subtle n'existe que sur localhost ou en HTTPS
  if (!crypto.subtle) {
    throw new Error("Ouvre l'application sur localhost ou en HTTPS pour gérer les comptes.")
  }

  const octets = new TextEncoder().encode(sel + motDePasse)
  const empreinte = await crypto.subtle.digest('SHA-256', octets)

  return enHexadecimal(new Uint8Array(empreinte))
}

// Met l'e-mail sous une seule forme : « Ami@X.cd » et « ami@x.cd » sont le même compte.
function normaliserEmail(email) {
  return email.trim().toLowerCase()
}

// Ne garde que ce dont l'interface a besoin, jamais le sel ni l'empreinte.
function versUtilisateurPublic(utilisateur) {
  return { id: utilisateur.id, nom: utilisateur.nom, email: utilisateur.email }
}

// Crée un compte et ouvre la session. Lance une erreur si l'e-mail est déjà pris.
export async function inscrire({ nom, email, motDePasse }) {
  const emailNormalise = normaliserEmail(email)
  const sel = genererSel()
  const motDePasseHache = await hacherMotDePasse(motDePasse, sel)

  const utilisateurs = lireDonnee(CLE_UTILISATEURS, [])
  if (utilisateurs.some((utilisateur) => utilisateur.email === emailNormalise)) {
    throw new Error('Cette adresse e-mail est déjà utilisée.')
  }

  const nouvelUtilisateur = {
    id: crypto.randomUUID(),
    nom: nom.trim(),
    email: emailNormalise,
    sel,
    motDePasseHache,
  }

  ecrireDonnee(CLE_UTILISATEURS, [...utilisateurs, nouvelUtilisateur])
  ecrireDonnee(CLE_SESSION, { utilisateurId: nouvelUtilisateur.id })

  return versUtilisateurPublic(nouvelUtilisateur)
}

// Ouvre la session si l'e-mail et le mot de passe sont bons.
// Le message ne dit pas lequel des deux est faux, pour ne pas révéler qui a un compte.
export async function connecter({ email, motDePasse }) {
  const emailNormalise = normaliserEmail(email)
  const utilisateur = lireDonnee(CLE_UTILISATEURS, []).find(
    (compte) => compte.email === emailNormalise,
  )
  const motDePasseHache = utilisateur
    ? await hacherMotDePasse(motDePasse, utilisateur.sel)
    : null

  if (!utilisateur || motDePasseHache !== utilisateur.motDePasseHache) {
    throw new Error('E-mail ou mot de passe incorrect.')
  }

  ecrireDonnee(CLE_SESSION, { utilisateurId: utilisateur.id })

  return versUtilisateurPublic(utilisateur)
}

// Ferme la session. Le compte et ses données restent enregistrés.
export function deconnecter() {
  supprimerDonnee(CLE_SESSION)
}

// Renvoie l'utilisateur de la session, ou null si personne n'est connecté.
// C'est ce qui garde la session ouverte quand on recharge la page.
export function lireUtilisateurConnecte() {
  const session = lireDonnee(CLE_SESSION, null)

  if (!session) return null

  const utilisateur = lireDonnee(CLE_UTILISATEURS, []).find(
    (compte) => compte.id === session.utilisateurId,
  )
  
  return utilisateur ? versUtilisateurPublic(utilisateur) : null
}
