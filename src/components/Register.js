function Register() {
  return (
    <div className="bg-yellow">
      <div className="conatiner signUpPage vhContainer">
        <div className="side">
          <img className="logoImg" src="https://user-images.githubusercontent.com/10492197/187050823-f78cc9b3-a62e-4e48-b52a-bf336b231de0.png" alt="" />
          <img className="d-m-n" src="https://user-images.githubusercontent.com/10492197/187050825-f4f68aec-2df9-468f-b10c-b7cedfa40757.png" alt="workImg" />
        </div>
        <div>
          <form className="formControls" action="index.html">
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
              required
            />
            <label className="formControls_label" htmlFor="name">
              您的暱稱
            </label>
            <input
              className="formControls_input"
              type="text"
              name="name"
              id="name"
              placeholder="請輸入您的暱稱"
            />
            <label className="formControls_label" htmlFor="pwd">
              密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              name="pwd"
              id="pwd"
              placeholder="請輸入密碼"
              required
            />
            <label className="formControls_label" htmlFor="confirm_pwd">
              再次輸入密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              name="confirm_pwd"
              id="confirm_pwd"
              placeholder="請再次輸入密碼"
              required
            />
            <input
              className="formControls_btnSubmit"
              type="button"
              value="註冊帳號"
            />
            <a className="formControls_btnLink" href="#loginPage">
              登入
            </a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
