import { useState } from 'react'

function TodoList({ list, setList }) {
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
  }
  const removeItem = (e, id) => {
    e.preventDefault()
    setList(state => state.filter(item => (id ? item.id !== id : item.state !== 'complete')))
  }

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
          <button onClick={e => removeItem(e)}>
            清除已完成項目
          </button>
        </div>
      </div>
    </div>
  )
}
function TodoItem({ data, changeItem, removeItem }) {
  return (
    <li>
      <label className="todoList_label">
        <input
          className="todoList_input"
          type="checkbox"
          checked={data.state === 'complete'}
          onChange={e => changeItem(data.id, e)}
        />
        <span>{data.content}</span>
      </label>
      <button onClick={e => removeItem(e, data.id)}>
        <i className="fa fa-times"></i>
      </button>
    </li>
  )
}

export default TodoList
