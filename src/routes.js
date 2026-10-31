// Addresses are visible to users, so they stay in French.
export const ROUTES = {
  HOME: '/',
  LOGIN: '/connexion',
  SIGN_UP: '/inscription',
  NEW_GROUP: '/groupes/nouveau',
  GROUP: '/groupes/:id',
  EDIT_GROUP: '/groupes/:id/modifier',
}

export function groupPath(groupId) {
  return ROUTES.GROUP.replace(':id', groupId)
}

export function editGroupPath(groupId) {
  return ROUTES.EDIT_GROUP.replace(':id', groupId)
}
