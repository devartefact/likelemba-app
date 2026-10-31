import { GROUP_STATUS, MIN_MEMBERS_TO_START } from '../constants.js'
import { buildRounds } from '../utils/rounds.js'
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

export function requireGroupInSetup(groupId, userId) {
  const group = requireGroup(groupId, userId)

  if (group.status !== GROUP_STATUS.SETUP) {
    throw new Error('Un groupe déjà démarré ne peut plus être modifié.')
  }

  return group
}

export function saveGroup(updatedGroup) {
  const groups = readAllGroups().map((group) => (group.id === updatedGroup.id ? updatedGroup : group))

  writeStoredValue(GROUPS_KEY, groups)

  return updatedGroup
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
  const group = requireGroupInSetup(groupId, userId)

  return saveGroup({ ...group, ...groupDetails })
}

export function deleteGroup(groupId, userId) {
  requireGroup(groupId, userId)

  const remainingGroups = readAllGroups().filter((group) => group.id !== groupId)

  writeStoredValue(GROUPS_KEY, remainingGroups)
}

// Starting creates the rounds: from then on, the members and their order are locked.
export function startGroup(groupId, userId) {
  const group = requireGroupInSetup(groupId, userId)

  if (group.members.length < MIN_MEMBERS_TO_START) {
    throw new Error(`Il faut au moins ${MIN_MEMBERS_TO_START} membres pour démarrer.`)
  }

  return saveGroup({ ...group, status: GROUP_STATUS.ACTIVE, rounds: buildRounds(group) })
}
