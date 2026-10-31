import { Link } from 'react-router'
import AuthShowcase from './AuthShowcase.jsx'
import ErrorAlert from './ErrorAlert.jsx'
import Logo from './Logo.jsx'

function AuthFormLayout({
  title,
  subtitle,
  generalError,
  submitLabel,
  isSubmitting,
  onSubmit,
  footerText,
  footerLinkLabel,
  footerLinkPath,
  children,
}) {
  return (
    <main className="grid min-h-[calc(100vh-3rem)] gap-4 p-4 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="flex flex-col gap-6 p-6">
        <div>
          <Logo />
        </div>

        <form className="m-auto w-full max-w-sm" onSubmit={onSubmit} noValidate>
          <h1 className="text-center text-3xl font-light">{title}</h1>
          <p className="mb-6 mt-1 text-center text-soft">{subtitle}</p>

          <ErrorAlert message={generalError} />

          {children}

          <button type="submit" className="btn btn-primary mt-6 w-full" disabled={isSubmitting}>
            {submitLabel}
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-soft">
          <p>
            {footerText}{' '}
            <Link to={footerLinkPath} className="text-base-content underline">
              {footerLinkLabel}
            </Link>
          </p>
          <p>Tes données restent dans ce navigateur.</p>
        </div>
      </div>

      <AuthShowcase />
    </main>
  )
}

export default AuthFormLayout
