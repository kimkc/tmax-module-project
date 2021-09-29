import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [ values, setValues ] = useState({
    email: '',
    password: '',
  })

  // const login = (e) => {
  //   let url = '/user-service/nosec/login'
  //   let User = {
  //     'email':values.email,
  //     'password':values.password
  //   }
    
  //   var config={
  //     header:{
  //       'Content-Type' : 'application/json',
  //     }
  //   }
  //   axios.post(url, User, config, {withCredentials: true})
  //   // axios.post(url, User, config)
  //   .then((res)=>{
  //     alert("로그인성공")
  //     console.log(res);
  //   }).catch((error)=>{
  //     alert("로그인실패")
  //     console.log(error);
  //   })
  // }

  const handleChangeForm = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const onClickLogin = (e) => {
    e.preventDefault();
    let url = '/user-service/nosec/login'
    let User = {
      'email':values.email,
      'password':values.password
    }
    
    var config={
      header:{
        'Content-Type' : 'application/json',
        // 'token' : sessionStorage.token
      }
    }
    axios.post(url, User, config, {withCredentials: true})
    .then(res => {
      console.log(res.data)
      if(res.data.email === undefined){
        // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
        console.log('======================',res.data.msg)
        alert('입력하신 id 가 일치하지 않습니다.')
    } else if(res.data.email === null){
        // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
        console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
        alert('입력하신 비밀번호 가 일치하지 않습니다.')
    } else if(res.data.email === values.email) {
        // id, pw 모두 일치 userId = userId1, msg = undefined
        console.log('======================','로그인 성공')
        sessionStorage.setItem('email', res.data.email)
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('userId', res.data.userId)
    }
    // axios.get('/user-service/users', )
    // 작업 완료 되면 페이지 이동(새로고침)
    // axios.post()
    document.location.href = '/'
    
  })
  .catch()
  }

  return(
    <div className="accordion-item single-my-account mb-20 card">
      <div className="panel-heading card-header" id="panelsStayOpen-headingOne">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
          <h3 className="panel-title"><span>1 .</span> Login </h3>
        </button>
      </div>
      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
        <div className="card-body">
          <form onSubmit={onClickLogin}>
            <div className="myaccount-info-wrapper">
              <div className="account-info-wrapper">
                <h4>로그인</h4>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Email</label>
                    <input 
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChangeForm}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Password</label>
                    <input 
                      type="password"
                      name="password"  
                      value={values.password}
                      onChange={handleChangeForm}
                    />
                  </div>
                </div>
              </div>
              <div className="billing-back-btn">
                <div className="billing-btn">
                  <button type="button" onClick={onClickLogin}>로그인하기</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}