import AuthFormLayout from '../components/AuthFormLayout.jsx'
import FormField from '../components/FormField.jsx'
import PasswordField from '../components/PasswordField.jsx'
import { MIN_PASSWORD_LENGTH } from '../constants.js'
import { useForm } from '../hooks/useForm.js'
import { ROUTES } from '../routes.js'
import { signUp } from '../services/auth.js'
import { validateSignUp } from '../utils/validation.js'

function SignUpPage({ onLogin }) {
  const { generalError, isSubmitting, fieldProps, handleSubmit } = useForm({
    initialValues: { name: '', email: '', password: '', confirmation: '' },
    validate: validateSignUp,
    onSubmit: async (account) => onLogin(await signUp(account)),
  })

  return (
    <AuthFormLayout
      title="Créer un compte"
      subtitle="Organise ta likelemba sans cahier ni disputes"
      generalError={generalError}
      submitLabel="Créer mon compte"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      footerText="Déjà un compte ?"
      footerLinkLabel="Se connecter"
      footerLinkPath={ROUTES.LOGIN}
    >
      <FormField label="Nom" autoComplete="name" {...fieldProps('name')} />
      <FormField label="Adresse e-mail" type="email" autoComplete="email" {...fieldProps('email')} />
      <PasswordField
        label={`Mot de passe (${MIN_PASSWORD_LENGTH} caractères minimum)`}
        autoComplete="new-password"
        {...fieldProps('password')}
      />
      <PasswordField label="Confirmer le mot de passe" autoComplete="new-password" {...fieldProps('confirmation')} />
    </AuthFormLayout>
  )
}

export default SignUpPage
