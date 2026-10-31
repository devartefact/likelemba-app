import { getInitials } from '../utils/format.js'

const TONES = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-success']
const DEFAULT_MAX_VISIBLE = 4

// The same name always gets the same tone, so a member stays recognizable from one screen to another.
function pickTone(name) {
  const hash = Array.from(name).reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 0)

  return TONES[(hash >>> 8) % TONES.length]
}

function Avatar({ name }) {
  return (
    <span
      className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-base-100 text-xs font-medium text-base-content ${pickTone(name)}`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  )
}

export function AvatarStack({ names, maxVisible = DEFAULT_MAX_VISIBLE }) {
  const hiddenCount = names.length - maxVisible

  return (
    <div className="flex -space-x-2">
      {names.slice(0, maxVisible).map((name, index) => (
        <Avatar key={`${name}-${index}`} name={name} />
      ))}
      {hiddenCount > 0 && (
        <span className="inline-flex size-9 items-center justify-center rounded-full border-2 border-base-100 bg-neutral text-xs text-neutral-content">
          +{hiddenCount}
        </span>
      )}
    </div>
  )
}

export default Avatar
