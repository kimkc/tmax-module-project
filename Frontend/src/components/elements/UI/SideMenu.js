import React, { Fragment } from 'react';

export default function SideMenu() {

  // var process = require('../../../myprocess.json');

  // const [ sideData, setsideData ] = useState([]);

  // useEffect(() => {
  //   fetch(`http://${process.IP}:${process.PORT}/sidemenu`)
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(data => {
  //     setsideData(data);
  //   })
  // },[]);

  const Logout = () => {
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    document.location.href = '/'
  }

  const Login = () => {
    document.location.href = '/myaccount'
  }

  // const sideList = sideData.map(item => {
  //   return(
  //     <div className="same-style cart-wrap d-block" key={item.id}>
  //       <Link to={item.url}><i className={item.name}></i>
  //         {/* count가 0이면 보여주지 않기 */}
  //         <span className="count-style">{item.count}</span>
  //       </Link>
  //     </div>
  //   );
  // })

  return(
    <Fragment>    
      {/* <div className="col-xl-6 col-lg-8 d-none d-lg-block"> */}
        
      <div className="col-xl-5 col-lg-6 col-md-6 col-10">
        <div className="header-right-wrap px-4">
          {/* <a href="/productlist"><button type="button" className="btn btn-outline-dark">쇼핑하기</button></a> */}
          <a href="/cart"><button type="button" className="btn btn-outline-dark"><i className="fas fa-shopping-cart"></i></button></a>
          {
            sessionStorage.userId !== undefined ?  
            <a href="/history"><button type="button" className="btn btn-outline-dark"><i className="fas fa-clipboard-list"></i></button></a> : null
          }
          {
            sessionStorage.userId !== undefined && sessionStorage.email.includes('admin') ?
              <a href="/productnew"><button type="button" className="btn btn-outline-dark"><i class="far fa-plus-square"></i></button></a> : null
              // <a href="/productnew"><button type="button" className="btn btn-outline-dark">상품등록</button></a> : null
          }
          {/* <button type="button" className="btn btn-outline-dark"><a href="/orderlist">주문내역</a></button> */}
          {
            sessionStorage.userId !== undefined ?
            <button type="button" className="btn btn-outline-primary" onClick={Logout}><i class="fas fa-sign-out-alt"></i></button> :
            <button type="button" className="btn btn-outline-primary" onClick={Login}>로그인</button> 
          }
          {
            sessionStorage.userId !== undefined ?
            <p>{sessionStorage.email}님</p> : null
          }

          {/* {sideList} */}
          {/* 햄버거 */}
          <div className="same-style mobile-off-canvas d-block d-lg-none">
            <button className="mobile-aside-button"><i className="las la-bars"></i></button>
          </div>
        </div>
      </div>
      </Fragment>
  );
}