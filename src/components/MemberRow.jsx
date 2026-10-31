function MemberRow({ member, position, isFirst, isLast, onMoveUp, onMoveDown, onEdit, onRemove }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-semibold w-6">{position}.</span>
      <div className="flex-1">
        <p>{member.name}</p>
        {member.phone && <p className="text-sm">{member.phone}</p>}
      </div>
      <button
        type="button"
        className="btn btn-sm btn-square"
        onClick={onMoveUp}
        disabled={isFirst}
        aria-label={`Monter ${member.name}`}
        title="Monter"
      >
        ↑
      </button>
      <button
        type="button"
        className="btn btn-sm btn-square"
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
        className="btn btn-ghost btn-sm text-red-700"
        onClick={onRemove}
        aria-label={`Retirer ${member.name}`}
      >
        Retirer
      </button>
    </div>
  )
}

export default MemberRow
