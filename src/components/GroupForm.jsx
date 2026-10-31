import { Link } from 'react-router'
import { CURRENCIES, FREQUENCY } from '../constants.js'
import { useForm } from '../hooks/useForm.js'
import { FREQUENCY_LABELS } from '../utils/format.js'
import { validateGroup } from '../utils/validation.js'
import ErrorAlert from './ErrorAlert.jsx'
import FormField from './FormField.jsx'
import SelectField from './SelectField.jsx'

const CURRENCY_OPTIONS = CURRENCIES.map((currency) => ({ value: currency, label: currency }))
const FREQUENCY_OPTIONS = Object.entries(FREQUENCY_LABELS).map(([value, label]) => ({ value, label }))

function toFormValues(group) {
  return {
    name: group?.name ?? '',
    amount: group ? String(group.amount) : '',
    currency: group?.currency ?? CURRENCIES[0],
    frequency: group?.frequency ?? FREQUENCY.MONTHLY,
    startDate: group?.startDate ?? '',
  }
}

function toGroupDetails(values) {
  return { ...values, name: values.name.trim(), amount: Number(values.amount) }
}

// The group is optional: without one, the form starts empty to create a new group.
function GroupForm({ group, submitLabel, cancelPath, onSave }) {
  const { generalError, isSubmitting, fieldProps, handleSubmit } = useForm({
    initialValues: toFormValues(group),
    validate: validateGroup,
    onSubmit: (formValues) => onSave(toGroupDetails(formValues)),
  })

  return (
    <form className="card bg-base-100 shadow-md card-body" onSubmit={handleSubmit} noValidate>
      <ErrorAlert message={generalError} />

      <FormField label="Nom du groupe" autoComplete="off" {...fieldProps('name')} />
      <FormField label="Montant de la cotisation" type="number" autoComplete="off" {...fieldProps('amount')} />
      <SelectField label="Devise" options={CURRENCY_OPTIONS} {...fieldProps('currency')} />
      <SelectField label="Fréquence" options={FREQUENCY_OPTIONS} {...fieldProps('frequency')} />
      <FormField label="Date de début" type="date" autoComplete="off" {...fieldProps('startDate')} />

      <div className="flex justify-end gap-2 mt-4">
        <Link to={cancelPath} className="btn btn-ghost">
          Annuler
        </Link>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default GroupForm
