import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Todo from './components/Todo'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContext } from './helpers/Context'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <AuthContext.Provider value={{token, setToken}}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Todo />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Todo />} />
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
