import { Link } from 'react-router'
import { groupPath } from '../routes.js'
import { FREQUENCY_LABELS, formatAmount, formatDate, formatMemberCount } from '../utils/format.js'
import { AvatarStack } from './Avatar.jsx'
import StatusBadge from './StatusBadge.jsx'

function GroupCard({ group }) {
  return (
    <Link to={groupPath(group.id)} className="surface-card card transition-colors hover:bg-base-100">
      <div className="card-body">
        <div className="flex items-start justify-between gap-2">
          <h2 className="card-title">{group.name}</h2>
          <StatusBadge status={group.status} />
        </div>
        <p className="text-3xl font-light">{formatAmount(group.amount, group.currency)}</p>
        <p className="text-sm text-soft">
          {FREQUENCY_LABELS[group.frequency]}, à partir du {formatDate(group.startDate)}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <AvatarStack names={group.members.map((member) => member.name)} />
          <span className="text-sm text-soft">{formatMemberCount(group.members.length)}</span>
        </div>
      </div>
    </Link>
  )
}

export default GroupCard
