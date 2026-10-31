import { useState } from 'react'
import FormField from './FormField.jsx'

function EyeIcon({ isOpen }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      {isOpen ? (
        <>
          <path d="M2 12C5 7 8.5 5 12 5s7 2 10 7c-3 5-6.500 7-10 7s-7-2-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <path d="M3 10c2.500 3 5.500 4.500 9 4.500s6.500-1.500 9-4.500M5.500 12.500 4 15M9.500 14.200 9 17M14.500 14.200 15 17M18.500 12.500 20 15" />
      )}
    </svg>
  )
}

function PasswordField(props) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <FormField
      {...props}
      type={isVisible ? 'text' : 'password'}
      endAdornment={
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1"
          onClick={() => setIsVisible((current) => !current)}
          aria-label={isVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          aria-pressed={isVisible}
        >
          <EyeIcon isOpen={isVisible} />
        </button>
      }
    />
  )
}

export default PasswordField
