import { useState } from 'react'
import InputBox from './InputBox'
import TodoList from './TodoList'

function Todo() {
  const [list, setList] = useState([
    {
      id: 1,
      state: 'active',
      content: '把冰箱發霉的檸檬拿去丟',
    },
    {
      id: 2,
      state: 'active',
      content: '打電話叫媽媽匯款給我',
    },
  ])

  return (
    <div className="bg-half">
      <nav>
        <h1>ONLINE TODO LIST</h1>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <InputBox setList={setList} />
          <TodoList list={list} setList={setList} />
        </div>
      </div>
    </div>
  )
}

export default Todo
