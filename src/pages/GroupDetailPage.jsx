import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import ConfirmationModal from '../components/ConfirmationModal.jsx'
import CycleCompleteMessage from '../components/CycleCompleteMessage.jsx'
import Figure from '../components/Figure.jsx'
import GroupNotFound from '../components/GroupNotFound.jsx'
import MemberManager from '../components/MemberManager.jsx'
import NextRoundPanel from '../components/NextRoundPanel.jsx'
import PaymentList from '../components/PaymentList.jsx'
import RoundDashboard from '../components/RoundDashboard.jsx'
import RoundHistory from '../components/RoundHistory.jsx'
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
  const isActive = group.status === GROUP_STATUS.ACTIVE
  const isCompleted = group.status === GROUP_STATUS.COMPLETED

  function confirmDeletion() {
    deleteGroup(groupId, user.id)
    navigate(ROUTES.HOME)
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Link to={ROUTES.HOME} className="underline">
        Retour à mes groupes
      </Link>

      <div className="flex items-center justify-between gap-4 my-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-light">{group.name}</h1>
          <StatusBadge status={group.status} />
        </div>
        <div className="flex gap-2">
          {isInSetup && (
            <Link to={editGroupPath(groupId)} className="btn btn-outline">
              Modifier
            </Link>
          )}
          <button type="button" className="btn btn-outline btn-error" onClick={() => setIsConfirmingDeletion(true)}>
            Supprimer
          </button>
        </div>
      </div>

      <section className="surface-card card card-body mb-4">
        <div className="grid grid-cols-3 gap-4">
          <Figure label="Cotisation" value={formatAmount(group.amount, group.currency)} />
          <Figure label="Fréquence" value={FREQUENCY_LABELS[group.frequency]} />
          <Figure label="Date de début" value={formatDate(group.startDate)} />
        </div>
      </section>

      {isInSetup && (
        <>
          <MemberManager group={group} userId={user.id} onGroupChange={setGroup} />
          <StartGroupPanel group={group} userId={user.id} onGroupChange={setGroup} />
        </>
      )}

      {isActive && (
        <>
          <RoundDashboard group={group} />
          <PaymentList group={group} userId={user.id} onGroupChange={setGroup} />
          <NextRoundPanel group={group} userId={user.id} onGroupChange={setGroup} />
          <RoundHistory group={group} />
          <RoundSchedule group={group} />
        </>
      )}

      {isCompleted && (
        <>
          <CycleCompleteMessage group={group} />
          <RoundHistory group={group} />
        </>
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
