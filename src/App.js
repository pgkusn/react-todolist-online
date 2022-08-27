import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Todo from './components/Todo'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Todo />} />
      </Routes>
    </HashRouter>
  )
}

export default App
