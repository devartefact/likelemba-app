import Avatar from './Avatar.jsx'

const MOVE_BUTTON_CLASSES = 'btn btn-sm btn-circle btn-outline'

function MemberRow({ member, position, isFirst, isLast, onMoveUp, onMoveDown, onEdit, onRemove }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-6 text-soft">{position}.</span>
      <Avatar name={member.name} />
      <div className="flex-1">
        <p>{member.name}</p>
        {member.phone && <p className="text-sm text-soft">{member.phone}</p>}
      </div>
      <button
        type="button"
        className={MOVE_BUTTON_CLASSES}
        onClick={onMoveUp}
        disabled={isFirst}
        aria-label={`Monter ${member.name}`}
        title="Monter"
      >
        ↑
      </button>
      <button
        type="button"
        className={MOVE_BUTTON_CLASSES}
        onClick={onMoveDown}
        disabled={isLast}
        aria-label={`Descendre ${member.name}`}
        title="Descendre"
      >
        ↓
      </button>
      <button type="button" className="btn btn-ghost btn-sm" onClick={onEdit} aria-label={`Modifier ${member.name}`}>
        Modifier
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-sm text-error"
        onClick={onRemove}
        aria-label={`Retirer ${member.name}`}
      >
        Retirer
      </button>
    </div>
  )
}

export default MemberRow
