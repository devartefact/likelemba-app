import { Navigate, useNavigate, useParams } from 'react-router'
import GroupForm from '../components/GroupForm.jsx'
import GroupNotFound from '../components/GroupNotFound.jsx'
import { GROUP_STATUS } from '../constants.js'
import { groupPath } from '../routes.js'
import { getGroup, updateGroup } from '../services/groups.js'

function EditGroupPage({ user }) {
  const { id: groupId } = useParams()
  const navigate = useNavigate()
  const group = getGroup(groupId, user.id)

  if (!group) return <GroupNotFound />
  if (group.status !== GROUP_STATUS.SETUP) return <Navigate to={groupPath(groupId)} replace />

  function saveGroup(groupDetails) {
    updateGroup(groupId, user.id, groupDetails)
    navigate(groupPath(groupId))
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-light mb-6">Modifier le groupe</h1>
      <GroupForm group={group} submitLabel="Enregistrer" cancelPath={groupPath(groupId)} onSave={saveGroup} />
    </main>
  )
}

export default EditGroupPage
