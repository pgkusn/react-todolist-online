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

export default TodoItem
