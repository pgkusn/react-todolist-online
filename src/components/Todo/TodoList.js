import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoItem from './TodoItem'
import { api } from '../../helpers/api'
import { useAuth } from '../../helpers/context'

function TodoList({ list, setList }) {
  const [state, setState] = useState('all')
  const [isLoaded, setIsLoaded] = useState(false)
  const { token, setToken } = useAuth()
  const navigate = useNavigate()

  const showList = state === 'all' ? list : list.filter(item => item.state === state)
  const activeCount = list.filter(item => item.state === 'active').length

  const onTabClick = e => {
    setState(e.target.dataset.state)
  }
  const changeItem = (id, e) => {
    setList(state =>
      state.map(item => {
        if (item.id === id) {
          item.state = e.target.checked ? 'complete' : 'active'
        }
        return item
      })
    )
    patchTodo(id)
  }
  const removeItem = id => {
    setList(state => state.filter(item => (id ? item.id !== id : item.state !== 'complete')))
    if (id) {
      deleteTodo(id)
    } else {
      list.forEach(item => {
        if (item.state === 'complete') {
          deleteTodo(item.id)
        }
      })
    }
  }

  // api
  const getTodo = async () => {
    try {
      const { data } = await api({
        method: 'get',
        url: '/todos',
        headers: { authorization: token },
      })
      const list = data.todos.map(item => ({
        id: item.id,
        content: item.content,
        state: item.completed_at ? 'complete' : 'active',
      }))
      setList(list)
    } catch (error) {
      console.error(error)
      if (error.response.status === 401) {
        setTimeout(() => {
          localStorage.removeItem('token')
          setToken('')
          navigate('/login')
        }, 1500);
      }
    } finally {
      setIsLoaded(true)
    }
  }
  const patchTodo = async id => {
    try {
      await api({
        method: 'patch',
        url: `/todos/${id}/toggle`,
        headers: { authorization: token },
      })
    } catch (error) {
      console.error(error)
    }
  }
  const deleteTodo = async id => {
    try {
      await api({
        method: 'delete',
        url: `/todos/${id}`,
        headers: { authorization: token },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTodo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="todoList_list">
      <ul className="todoList_tab">
        <li>
          <button className={state === 'all' ? 'active' : ''} data-state="all" onClick={onTabClick}>
            全部
          </button>
        </li>
        <li>
          <button
            className={state === 'active' ? 'active' : ''}
            data-state="active"
            onClick={onTabClick}
          >
            待完成
          </button>
        </li>
        <li>
          <button
            className={state === 'complete' ? 'active' : ''}
            data-state="complete"
            onClick={onTabClick}
          >
            已完成
          </button>
        </li>
      </ul>
      <div className="todoList_items">
        {list.length ? (
          <ul className="todoList_item">
            {showList.map((item, i) => (
              <TodoItem key={i} data={item} changeItem={changeItem} removeItem={removeItem} />
            ))}
          </ul>
        ) : (
          <p className="todoList_no_item">{isLoaded ? '目前尚無待辦事項' : '載入中'}</p>
        )}
        <div className="todoList_statistics">
          <p>{activeCount} 個待完成項目</p>
          <button onClick={() => removeItem()}>清除已完成項目</button>
        </div>
      </div>
    </div>
  )
}

export default TodoList
