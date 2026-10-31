import { useState } from 'react'
import { useSafeAction } from '../hooks/useSafeAction.js'
import { addMember, moveMember, removeMember, shuffleMembers, updateMember } from '../services/members.js'
import ErrorAlert from './ErrorAlert.jsx'
import MemberForm from './MemberForm.jsx'
import MemberRow from './MemberRow.jsx'

const MOVE_UP = -1
const MOVE_DOWN = 1
const MIN_MEMBERS_TO_SHUFFLE = 2

// Manages the members and their order while the group has not started.
function MemberManager({ group, userId, onGroupChange }) {
  const [editedMemberId, setEditedMemberId] = useState(null)
  const { actionError, runSafely } = useSafeAction()
  const { id: groupId, members } = group

  function saveEditedMember(memberDetails) {
    onGroupChange(updateMember(groupId, userId, editedMemberId, memberDetails))
    setEditedMemberId(null)
  }

  function run(changeGroup) {
    runSafely(() => onGroupChange(changeGroup()))
  }

  return (
    <section className="card bg-base-100 shadow-md card-body mb-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="card-title">Membres et ordre de passage ({members.length})</h2>
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => run(() => shuffleMembers(groupId, userId))}
          disabled={members.length < MIN_MEMBERS_TO_SHUFFLE}
        >
          Tirage au sort
        </button>
      </div>

      <ErrorAlert message={actionError} />

      {members.length === 0 ? (
        <p>Aucun membre pour l'instant.</p>
      ) : (
        <ol className="divide-y divide-base-300">
          {members.map((member, index) => (
            <li key={member.id} className="py-2">
              {member.id === editedMemberId ? (
                <MemberForm
                  member={member}
                  submitLabel="Enregistrer"
                  onSave={saveEditedMember}
                  onCancel={() => setEditedMemberId(null)}
                />
              ) : (
                <MemberRow
                  member={member}
                  position={index + 1}
                  isFirst={index === 0}
                  isLast={index === members.length - 1}
                  onMoveUp={() => run(() => moveMember(groupId, userId, member.id, MOVE_UP))}
                  onMoveDown={() => run(() => moveMember(groupId, userId, member.id, MOVE_DOWN))}
                  onEdit={() => setEditedMemberId(member.id)}
                  onRemove={() => run(() => removeMember(groupId, userId, member.id))}
                />
              )}
            </li>
          ))}
        </ol>
      )}

      <div className="mt-2">
        <h3 className="font-semibold">Ajouter un membre</h3>
        <MemberForm
          submitLabel="Ajouter"
          onSave={(memberDetails) => onGroupChange(addMember(groupId, userId, memberDetails))}
        />
      </div>
    </section>
  )
}

export default MemberManager
