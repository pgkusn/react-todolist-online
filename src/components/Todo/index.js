import { useState } from 'react'
import InputBox from './InputBox'
import TodoList from './TodoList'

function Todo() {
  const [list, setList] = useState([])
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
