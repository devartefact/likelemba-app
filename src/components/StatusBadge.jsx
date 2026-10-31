import { GROUP_STATUS } from '../constants.js'
import { STATUS_LABELS } from '../utils/format.js'

const STATUS_CLASSES = {
  [GROUP_STATUS.SETUP]: 'badge-neutral',
  [GROUP_STATUS.ACTIVE]: 'badge-primary',
  [GROUP_STATUS.COMPLETED]: 'badge-success',
}

function StatusBadge({ status }) {
  return <span className={`badge ${STATUS_CLASSES[status]}`}>{STATUS_LABELS[status]}</span>
}

export default StatusBadge
