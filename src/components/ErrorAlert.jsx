function ErrorAlert({ message }) {
  if (!message) return null

  return (
    <div role="alert" className="alert alert-error">
      {message}
    </div>
  )
}

export default ErrorAlert
