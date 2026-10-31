import { formatTimestamp } from '../utils/format.js'

function PaymentRow({ member, paidAt, isBeneficiary, onToggle }) {
  return (
    <label className="flex items-center gap-3 py-2 cursor-pointer">
      <input type="checkbox" className="checkbox checkbox-primary" checked={Boolean(paidAt)} onChange={onToggle} />
      <span className="flex-1">
        {member.name}
        {isBeneficiary && <span className="badge badge-outline badge-sm ml-2">Bénéficiaire du tour</span>}
      </span>
      {paidAt ? (
        <span className="text-sm">Payé le {formatTimestamp(paidAt)}</span>
      ) : (
        <span className="text-sm text-red-700">Reste à payer</span>
      )}
    </label>
  )
}

export default PaymentRow
