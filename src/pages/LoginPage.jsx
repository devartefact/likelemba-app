import AuthFormLayout from '../components/AuthFormLayout.jsx'
import FormField from '../components/FormField.jsx'
import PasswordField from '../components/PasswordField.jsx'
import { useForm } from '../hooks/useForm.js'
import { ROUTES } from '../routes.js'
import { logIn } from '../services/auth.js'
import { validateLogin } from '../utils/validation.js'

function LoginPage({ onLogin }) {
  const { generalError, isSubmitting, fieldProps, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    validate: validateLogin,
    onSubmit: async (credentials) => onLogin(await logIn(credentials)),
  })

  return (
    <AuthFormLayout
      title="Se connecter"
      subtitle="Retrouve tes groupes de likelemba"
      generalError={generalError}
      submitLabel="Se connecter"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      footerText="Pas encore de compte ?"
      footerLinkLabel="Créer un compte"
      footerLinkPath={ROUTES.SIGN_UP}
    >
      <FormField label="Adresse e-mail" type="email" autoComplete="email" {...fieldProps('email')} />
      <PasswordField label="Mot de passe" autoComplete="current-password" {...fieldProps('password')} />
    </AuthFormLayout>
  )
}

export default LoginPage
