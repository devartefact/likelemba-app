import { Link } from 'react-router'
import ErrorAlert from './ErrorAlert.jsx'

function AuthFormLayout({
  title,
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
    <main className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-md w-full max-w-md">
        <form className="card-body" onSubmit={onSubmit} noValidate>
          <h1 className="card-title text-2xl">{title}</h1>

          <ErrorAlert message={generalError} />

          {children}

          <button type="submit" className="btn btn-primary mt-4" disabled={isSubmitting}>
            {submitLabel}
          </button>

          <p className="text-center text-sm mt-2">
            {footerText}{' '}
            <Link to={footerLinkPath} className="link link-primary">
              {footerLinkLabel}
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default AuthFormLayout
