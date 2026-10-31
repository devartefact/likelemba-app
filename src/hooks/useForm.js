import { useState } from 'react'
import { hasErrors } from '../utils/validation.js'

// Shared form behaviour: field values, validation, errors and the submitting state.
export function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function fieldProps(fieldName) {
    return {
      value: values[fieldName],
      error: errors[fieldName],
      onChange: (value) => setValues((current) => ({ ...current, [fieldName]: value })),
    }
  }

  function reset() {
    setValues(initialValues)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validate(values)

    setErrors(validationErrors)

    if (hasErrors(validationErrors)) return

    setIsSubmitting(true)

    try {
      await onSubmit(values)
    } catch (error) {
      setErrors({ general: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return { generalError: errors.general, isSubmitting, fieldProps, handleSubmit, reset }
}
