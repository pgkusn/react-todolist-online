import { useState } from 'react'

function InputBox({ setList }) {
  const [value, setValue] = useState('')

  const submit = e => {
    e.preventDefault()
    const content = value.trim()
    if (!content) return
    setList(state => [...state, { id: Date.now(), state: 'active', content }])
    setValue('')
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
