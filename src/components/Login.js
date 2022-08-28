import { useNavigate, NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useAuth } from '../helpers/context'
import { api } from '../helpers/api'

function Login() {
  const { setToken } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async ({ email, password }) => {
    try {
      const { data, headers } = await api({
        method: 'post',
        url: '/users/sign_in',
        data: { user: { email, password } },
      })

      // save token
      setToken(headers.authorization)
      localStorage.setItem('token', headers.authorization)

      await Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      })
      navigate('/')
    } catch (error) {
      console.error(error)
      reset({ password: '' })
    }
  }

  return (
    <div className="bg-yellow">
      <div className="container loginPage vhContainer ">
        <div className="side">
          <img
            className="logoImg"
            src="https://user-images.githubusercontent.com/10492197/187050823-f78cc9b3-a62e-4e48-b52a-bf336b231de0.png"
            alt=""
          />
          <img
            className="d-m-n"
            src="https://user-images.githubusercontent.com/10492197/187050825-f4f68aec-2df9-468f-b10c-b7cedfa40757.png"
            alt="workImg"
          />
        </div>
        <div>
          <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
            <label className="formControls_label" htmlFor="email">
              Email
            </label>
            <input
              className="formControls_input"
              type="text"
              id="email"
              name="email"
              placeholder="請輸入 email"
              {...register('email', {
                required: { value: true, message: '此欄位必填' },
                pattern: { value: /^\S+@\S+$/i, message: '不符合 Email 規則' },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}

            <label className="formControls_label" htmlFor="pwd">
              密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              name="pwd"
              id="pwd"
              placeholder="請輸入密碼"
              {...register('password', {
                required: { value: true, message: '此欄位必填' },
                minLength: { value: 6, message: '密碼至少為 6 碼' },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <input className="formControls_btnSubmit" type="submit" value="登入" />
            <NavLink to="/register" className="formControls_btnLink">
              註冊帳號
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
