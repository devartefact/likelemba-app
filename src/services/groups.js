import { GROUP_STATUS } from '../constants.js'
import { readStoredValue, writeStoredValue } from './storage.js'

const GROUPS_KEY = 'likelemba_groups'

function readAllGroups() {
  return readStoredValue(GROUPS_KEY, [])
}

function requireGroup(groupId, userId) {
  const group = getGroup(groupId, userId)

  if (!group) throw new Error('Ce groupe est introuvable.')

  return group
}

// WARNING: this is only a display filter, not real protection.
// Every group stays readable in localStorage: a real application needs a server.
export function listGroups(userId) {
  return readAllGroups()
    .filter((group) => group.ownerId === userId)
    .reverse()
}

export function getGroup(groupId, userId) {
  const group = readAllGroups().find((candidate) => candidate.id === groupId)

  return group?.ownerId === userId ? group : null
}

export function createGroup(owner, groupDetails) {
  const newGroup = {
    id: crypto.randomUUID(),
    ownerId: owner.id,
    ...groupDetails,
    status: GROUP_STATUS.SETUP,
    members: [{ id: crypto.randomUUID(), name: owner.name, phone: '' }],
    rounds: [],
  }

  writeStoredValue(GROUPS_KEY, [...readAllGroups(), newGroup])

  return newGroup
}

export function updateGroup(groupId, userId, groupDetails) {
  const group = requireGroup(groupId, userId)

  if (group.status !== GROUP_STATUS.SETUP) {
    throw new Error('Un groupe déjà démarré ne peut plus être modifié.')
  }

  const groups = readAllGroups().map((candidate) =>
    candidate.id === groupId ? { ...candidate, ...groupDetails } : candidate,
  )

  writeStoredValue(GROUPS_KEY, groups)
}

export function deleteGroup(groupId, userId) {
  requireGroup(groupId, userId)

  const remainingGroups = readAllGroups().filter((group) => group.id !== groupId)

  writeStoredValue(GROUPS_KEY, remainingGroups)
}
