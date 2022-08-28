import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputBox from './InputBox'
import TodoList from './TodoList'
import { useAuth } from '../../helpers/context'
import { api } from '../../helpers/api'

function Todo() {
  const [list, setList] = useState([])
  const { token, setToken } = useAuth()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await api({
        method: 'delete',
        url: '/users/sign_out',
        headers: { authorization: token },
      })
      localStorage.removeItem('token')
      setToken('')
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-half">
      <nav>
        <h1>ONLINE TODO LIST</h1>
        <button className="logout_btn" onClick={logout}>
          登出
        </button>
      </nav>
      <div className="container todoListPage vhContainer">
        <div className="todoList_Content">
          <InputBox setList={setList} />
          <TodoList list={list} setList={setList} />
        </div>
      </div>
    </div>
  )
}

export default Todo
