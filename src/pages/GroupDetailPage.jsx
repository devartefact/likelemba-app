import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import ConfirmationModal from '../components/ConfirmationModal.jsx'
import GroupNotFound from '../components/GroupNotFound.jsx'
import MemberManager from '../components/MemberManager.jsx'
import RoundSchedule from '../components/RoundSchedule.jsx'
import StartGroupPanel from '../components/StartGroupPanel.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { GROUP_STATUS } from '../constants.js'
import { ROUTES, editGroupPath } from '../routes.js'
import { deleteGroup, getGroup } from '../services/groups.js'
import { FREQUENCY_LABELS, formatAmount, formatDate } from '../utils/format.js'

function GroupDetailPage({ user }) {
  const { id: groupId } = useParams()
  const navigate = useNavigate()
  const [isConfirmingDeletion, setIsConfirmingDeletion] = useState(false)
  const [group, setGroup] = useState(() => getGroup(groupId, user.id))

  if (!group) return <GroupNotFound />

  const isInSetup = group.status === GROUP_STATUS.SETUP

  function confirmDeletion() {
    deleteGroup(groupId, user.id)
    navigate(ROUTES.HOME)
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Link to={ROUTES.HOME} className="link link-primary">
        Retour à mes groupes
      </Link>

      <div className="flex items-center justify-between gap-4 my-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{group.name}</h1>
          <StatusBadge status={group.status} />
        </div>
        <div className="flex gap-2">
          {isInSetup && (
            <Link to={editGroupPath(groupId)} className="btn">
              Modifier
            </Link>
          )}
          <button type="button" className="btn btn-error" onClick={() => setIsConfirmingDeletion(true)}>
            Supprimer
          </button>
        </div>
      </div>

      <section className="card bg-base-100 shadow-md card-body mb-4">
        <p><span className="font-semibold">Cotisation :</span> {formatAmount(group.amount, group.currency)}</p>
        <p><span className="font-semibold">Fréquence :</span> {FREQUENCY_LABELS[group.frequency]}</p>
        <p><span className="font-semibold">Date de début :</span> {formatDate(group.startDate)}</p>
      </section>

      {isInSetup ? (
        <>
          <MemberManager group={group} userId={user.id} onGroupChange={setGroup} />
          <StartGroupPanel group={group} userId={user.id} onGroupChange={setGroup} />
        </>
      ) : (
        <RoundSchedule group={group} />
      )}

      {isConfirmingDeletion && (
        <ConfirmationModal
          title="Supprimer ce groupe ?"
          message={`Le groupe « ${group.name} », ses membres et ses tours seront supprimés définitivement.`}
          confirmLabel="Supprimer"
          confirmClassName="btn-error"
          onConfirm={confirmDeletion}
          onCancel={() => setIsConfirmingDeletion(false)}
        />
      )}
    </main>
  )
}

export default GroupDetailPage
