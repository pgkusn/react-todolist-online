import { useState } from 'react'
import { api } from '../../helpers/api'
import { useAuth } from '../../helpers/context'

function InputBox({ setList }) {
  const [value, setValue] = useState('')
  const { token } = useAuth()

  const submit = async () => {
    const inputValue = value.trim()
    if (!inputValue) return
    setValue('')
    const { id, content } = await postTodo(inputValue)
    setList(state => [...state, { id, content, state: 'active' }])
  }

  const postTodo = async content => {
    try {
      const { data } = await api({
        method: 'post',
        url: '/todos',
        headers: { authorization: token },
        data: { todo: { content } },
      })
      return data
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="inputBox">
      <input
        type="text"
        placeholder="請輸入待辦事項"
        value={value}
        onInput={e => setValue(e.target.value)}
        onKeyUp={e => {
          if (e.key === 'Enter') submit()
        }}
      />
      <button onClick={submit}>
        <i className="fa fa-plus"></i>
      </button>
    </div>
  )
}

export default InputBox
