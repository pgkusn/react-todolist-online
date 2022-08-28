import { useState } from 'react'
import { api } from '../../helpers/api'
import { useAuth } from '../../helpers/Context'

function InputBox({ setList }) {
  const { token } = useAuth()
  const [value, setValue] = useState('')

  const submit = e => {
    e.preventDefault()
    const content = value.trim()
    if (!content) return
    setList(state => [...state, { id: Date.now(), state: 'active', content }])
    postTodo(content)
    setValue('')
  }

  const postTodo = async content => {
    try {
      await api({
        method: 'post',
        url: '/todos',
        headers: { authorization: token },
        data: { todo: { content } }
      })
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
          if (e.key === 'Enter') submit(e)
        }}
      />
      <button onClick={submit}>
        <i className="fa fa-plus"></i>
      </button>
    </div>
  )
}

export default InputBox
