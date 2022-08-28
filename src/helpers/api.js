import axios from 'axios'
import Swal from 'sweetalert2'

const api = axios.create({
  baseURL: 'https://todoo.5xcamp.us',
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    Swal.fire({
      icon: 'error',
      title: error.response.data.message || '發生不明錯誤',
      text: error.response.status === 422 ? error.response.data.error[0] : '', // 重複註冊
    })
    return Promise.reject(error)
  }
)

export { api }
