import { useForm } from '../hooks/useForm.js'
import { validateMember } from '../utils/validation.js'
import ErrorAlert from './ErrorAlert.jsx'
import FormField from './FormField.jsx'

function toMemberDetails({ name, phone }) {
  return { name: name.trim(), phone: phone.trim() }
}

// The member is optional: without one, the form starts empty to add a new member.
function MemberForm({ member, submitLabel, onSave, onCancel }) {
  const { generalError, isSubmitting, fieldProps, handleSubmit, reset } = useForm({
    initialValues: { name: member?.name ?? '', phone: member?.phone ?? '' },
    validate: validateMember,
    onSubmit: (values) => {
      onSave(toMemberDetails(values))
      reset()
    },
  })

  return (
    <form onSubmit={handleSubmit} noValidate>
      <ErrorAlert message={generalError} />

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Nom" autoComplete="off" {...fieldProps('name')} />
        <FormField label="Téléphone (facultatif)" type="tel" autoComplete="off" {...fieldProps('phone')} />
      </div>

      <div className="flex justify-end gap-2 mt-2">
        {onCancel && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={onCancel}>
            Annuler
          </button>
        )}
        <button type="submit" className="btn btn-sm" disabled={isSubmitting}>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default MemberForm
