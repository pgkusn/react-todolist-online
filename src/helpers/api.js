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
    if (error.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: error.response.data.message || '發生不明錯誤',
      })
    }
    return Promise.reject(error)
  }
)

export { api }
