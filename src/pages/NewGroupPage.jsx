import { useNavigate } from 'react-router'
import GroupForm from '../components/GroupForm.jsx'
import { ROUTES, groupPath } from '../routes.js'
import { createGroup } from '../services/groups.js'

function NewGroupPage({ user }) {
  const navigate = useNavigate()

  function saveGroup(groupDetails) {
    const group = createGroup(user, groupDetails)

    navigate(groupPath(group.id))
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Nouveau groupe</h1>
      <GroupForm submitLabel="Créer le groupe" cancelPath={ROUTES.HOME} onSave={saveGroup} />
    </main>
  )
}

export default NewGroupPage
