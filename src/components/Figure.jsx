function Figure({ label, value }) {
  return (
    <div>
      <p className="text-sm text-soft">{label}</p>
      <p className="text-xl">{value}</p>
    </div>
  )
}

export default Figure
