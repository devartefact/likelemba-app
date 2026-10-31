import { Link } from 'react-router'
import { groupPath } from '../routes.js'
import { FREQUENCY_LABELS, formatAmount, formatDate, formatMemberCount } from '../utils/format.js'
import StatusBadge from './StatusBadge.jsx'

function GroupCard({ group }) {
  return (
    <Link to={groupPath(group.id)} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      <div className="card-body">
        <div className="flex items-start justify-between gap-2">
          <h2 className="card-title">{group.name}</h2>
          <StatusBadge status={group.status} />
        </div>
        <p className="font-semibold">{formatAmount(group.amount, group.currency)}</p>
        <p>{FREQUENCY_LABELS[group.frequency]}, à partir du {formatDate(group.startDate)}</p>
        <p>{formatMemberCount(group.members.length)}</p>
      </div>
    </Link>
  )
}

export default GroupCard
