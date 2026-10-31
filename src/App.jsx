import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import NavBar from './components/NavBar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import EditGroupPage from './pages/EditGroupPage.jsx'
import GroupDetailPage from './pages/GroupDetailPage.jsx'
import GroupsPage from './pages/GroupsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NewGroupPage from './pages/NewGroupPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import { ROUTES } from './routes.js'
import { getCurrentUser, logOut } from './services/auth.js'

function App() {
  const [user, setUser] = useState(getCurrentUser)

  function handleLogOut() {
    logOut()
    setUser(null)
  }

  const guestOnly = (page) => (user ? <Navigate to={ROUTES.HOME} replace /> : page)
  const protectedPage = (page) => <ProtectedRoute user={user}>{page}</ProtectedRoute>

  return (
    <>
      {user && <NavBar user={user} onLogOut={handleLogOut} />}

      <Routes>
        <Route path={ROUTES.LOGIN} element={guestOnly(<LoginPage onLogin={setUser} />)} />
        <Route path={ROUTES.SIGN_UP} element={guestOnly(<SignUpPage onLogin={setUser} />)} />
        <Route path={ROUTES.HOME} element={protectedPage(<GroupsPage user={user} />)} />
        <Route path={ROUTES.NEW_GROUP} element={protectedPage(<NewGroupPage user={user} />)} />
        <Route path={ROUTES.GROUP} element={protectedPage(<GroupDetailPage user={user} />)} />
        <Route path={ROUTES.EDIT_GROUP} element={protectedPage(<EditGroupPage user={user} />)} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </>
  )
}

export default App
