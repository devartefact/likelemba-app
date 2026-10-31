import { shuffle } from '../utils/shuffle.js'
import { requireGroupInSetup, saveGroup } from './groups.js'

// The order of the members list is the order in which they receive the pot.
function changeMembers(groupId, userId, getUpdatedMembers) {
  const group = requireGroupInSetup(groupId, userId)

  return saveGroup({ ...group, members: getUpdatedMembers(group.members) })
}

function swapItems(items, firstIndex, secondIndex) {
  const swappedItems = [...items]

  swappedItems[firstIndex] = items[secondIndex]
  swappedItems[secondIndex] = items[firstIndex]

  return swappedItems
}

export function addMember(groupId, userId, memberDetails) {
  const newMember = { id: crypto.randomUUID(), ...memberDetails }

  return changeMembers(groupId, userId, (members) => [...members, newMember])
}

export function updateMember(groupId, userId, memberId, memberDetails) {
  return changeMembers(groupId, userId, (members) =>
    members.map((member) => (member.id === memberId ? { ...member, ...memberDetails } : member)),
  )
}

export function removeMember(groupId, userId, memberId) {
  return changeMembers(groupId, userId, (members) => members.filter((member) => member.id !== memberId))
}

export function moveMember(groupId, userId, memberId, offset) {
  return changeMembers(groupId, userId, (members) => {
    const currentIndex = members.findIndex((member) => member.id === memberId)
    const targetIndex = currentIndex + offset
    const isTargetInList = targetIndex >= 0 && targetIndex < members.length

    return isTargetInList ? swapItems(members, currentIndex, targetIndex) : members
  })
}

export function shuffleMembers(groupId, userId) {
  return changeMembers(groupId, userId, shuffle)
}
