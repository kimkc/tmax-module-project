import React, {useState} from 'react';

import axios from 'axios';

export default function SignUp() {

  const [ values, setValues ] = useState({
    email: '',
    pwd: '',
    confirmPwd: '',
    tel: '',
    name: '',
  })

  const join = (e) => {
    e.preventDefault();
    let emailpattern = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()¥[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    let pwdpattern = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).*$/;
    let telpattern = /^[0-9\b -]{0,13}$/;
    let url = '/user-service/users'
    let User = {
      'email' : values.email,
      'pwd' : values.pwd,
      'name' : values.name,
      'tel' : values.tel
    }
    var config={
      header:{
        'Content-Type' : 'application/json',
      }
    };
    if(emailpattern.test(values.email)===false){
      alert("이메일 형식에 맞게 작성해 주세요.")
      return;
    }
    if(pwdpattern.test(values.pwd)===false){
      alert("숫자,문자,특수문자를 조합해서 최소 8자 이상 입력해 주세요.")
      return;
    }
    if(telpattern.test(values.tel)===false){
      alert("숫자만 입력해 주세요.( ex : 01098765432 )")
      return;
    }
    axios.post(url, User, config)
    .then((res)=>{
      alert("회원가입완료")
      console.log(res);
    }).catch(error => {
      alert("회원가입실패")
      console.log(error);
    })
  }

  // const handlePutUserList = (e) => {
    
  //   e.preventDefault();
  //   const valid = onTextCheck();
  //   if (!valid) console.error("retry");
  //   else {
  //     fetch(`http://${process.IP}:${process.PORT}/users`,{
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //       email: values.email,
  //       pwd: values.pwd,
  //       name: values.name,
  //       tel: values.tel
  //       }),
  //     }).
  //     axios.post('/user-service/users', body ,headers)
	// 		.then((res)=>{
	// 			res
  //       alert("회원가입완료")
  //     })
  //     // then(
  //     //   alert("success"),
  //     //   history.push('/')
  //     // )
  //   }
  // }

  const handleChangeForm = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  return(
    <div className="accordion-item single-my-account mb-20 card">
      <div className="panel-heading card-header" id="panelsStayOpen-headingOne">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
          <h3 className="panel-title"><span>2 .</span>Sign Up</h3>
        </button>
      </div>
      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
        <div className="card-body">
          <form onSubmit={join}>
            <div className="myaccount-info-wrapper">
              <div className="account-info-wrapper">
                <h4>회원가입</h4>
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
                  <div>
                    <button>중복확인</button>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Password</label>
                    <input 
                      type="password"
                      name="pwd"  
                      value={values.pwd}
                      onChange={handleChangeForm}
                    />
                    숫자,문자,특수문자를 조합해서 최소 8자 이상 입력해 주세요.
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Comfirm Password</label>
                    <input 
                      type="password"
                      name="confirmPwd"
                      value={values.confirmPwd}
                      onChange={handleChangeForm}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Name</label>
                    <input 
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChangeForm}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12">
                  <div className="billing-info">
                    <label>Phone</label>
                    <input 
                      type="tel"
                      name="tel"
                      value={values.tel}
                      onChange={handleChangeForm}
                    />
                    숫자만 입력해 주세요.( ex : 01098765432 )
                  </div>
                </div>
              </div>
              
              <div className="billing-back-btn">
                <div className="billing-btn">
                  <button type="submit">가입하기</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}