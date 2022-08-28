import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import Register from './components/Register'
import Login from './components/Login'
import Todo from './components/Todo'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import { AuthContext } from './helpers/context'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const location = useLocation()

  // close alert when route change
  useEffect(() => {
    Swal.close()
  }, [location]);

  return (
    <AuthContext.Provider value={{token, setToken}}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Todo />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
