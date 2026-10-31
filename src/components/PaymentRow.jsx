import { formatTimestamp } from '../utils/format.js'
import Avatar from './Avatar.jsx'

function PaymentRow({ member, paidAt, isBeneficiary, onToggle }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-2">
      <input type="checkbox" className="checkbox checkbox-neutral" checked={Boolean(paidAt)} onChange={onToggle} />
      <Avatar name={member.name} />
      <span className="flex-1">
        {member.name}
        {isBeneficiary && <span className="badge badge-primary badge-sm ml-2">Bénéficiaire du tour</span>}
      </span>
      {paidAt ? (
        <span className="text-sm text-soft">Payé le {formatTimestamp(paidAt)}</span>
      ) : (
        <span className="text-sm text-error">Reste à payer</span>
      )}
    </label>
  )
}

export default PaymentRow
