import { Link } from 'react-router'
import GroupCard from '../components/GroupCard.jsx'
import { ROUTES } from '../routes.js'
import { listGroups } from '../services/groups.js'

function GroupsPage({ user }) {
  const groups = listGroups(user.id)

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-light">Mes groupes</h1>
        <Link to={ROUTES.NEW_GROUP} className="btn btn-primary">
          Nouveau groupe
        </Link>
      </div>

      {groups.length === 0 ? (
        <p>Tu n'as pas encore de groupe. Crée le premier pour commencer.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </main>
  )
}

export default GroupsPage
