import { useNavigate, NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { api } from '../helpers/api'

function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm()

  const onSubmit = async ({ email, password, nickname }) => {
    try {
      const { data } = await api({
        method: 'post',
        url: '/users',
        data: { user: { email, password, nickname } },
      })

      const result = await Swal.fire({
        icon: 'success',
        title: data.message,
        confirmButtonText: '前往登入',
      })
      if (result.isConfirmed) {
        navigate('/login')
      }

      reset({ email: '', password: '', confirm_password: '', nickname: '' })
    } catch (error) {
      console.error(error)
      reset({ password: '', confirm_password: '' })
    }
  }

  return (
    <div className="bg-yellow">
      <div className="container signUpPage vhContainer">
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
            <h2 className="formControls_txt">註冊帳號</h2>
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

            <label className="formControls_label" htmlFor="name">
              您的暱稱
            </label>
            <input
              className="formControls_input"
              type="text"
              name="name"
              id="name"
              placeholder="請輸入您的暱稱"
              {...register('nickname', { required: { value: true, message: '此欄位必填' } })}
            />
            {errors.nickname && <span>{errors.nickname.message}</span>}

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

            <label className="formControls_label" htmlFor="confirm_pwd">
              再次輸入密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              name="confirm_pwd"
              id="confirm_pwd"
              placeholder="請再次輸入密碼"
              {...register('confirm_password', {
                required: { value: true, message: '此欄位必填' },
                validate: val => {
                  if (watch('password') !== val) {
                    return '密碼不一致'
                  }
                },
              })}
            />
            {errors.confirm_password && <span>{errors.confirm_password.message}</span>}

            <input className="formControls_btnSubmit" type="submit" value="註冊帳號" />
            <NavLink to="/login" className="formControls_btnLink">
              登入
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
