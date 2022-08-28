import { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import { api } from '../../helpers/api'
import { useAuth } from '../../helpers/Context'

function TodoList({ list, setList }) {
  const { token } = useAuth()
  const [state, setState] = useState('all')
  const showList = state === 'all' ? list : list.filter(item => item.state === state)
  const completeCount = list.filter(item => item.state === 'complete').length

  const onTabClick = e => {
    e.preventDefault()
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
  const removeItem = (e, id) => {
    e.preventDefault()
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
        <ul className="todoList_item">
          {showList.map((item, i) => (
            <TodoItem key={i} data={item} changeItem={changeItem} removeItem={removeItem} />
          ))}
        </ul>
        <div className="todoList_statistics">
          <p>{completeCount} 個已完成項目</p>
          <button onClick={e => removeItem(e)}>清除已完成項目</button>
        </div>
      </div>
    </div>
  )
}
export default TodoList
