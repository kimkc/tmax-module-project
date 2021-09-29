import Login from './Login';
import SignUp from './SignUp';
// import ChangePwd from './ChangePwd';
// import ModifyAddress from './ModifyAddress';

export default function MyAccountHome() {
  return(
    <div className="myaccount-area pb-80 pt-100">
      <div className="container">
        <div className="row">
          <div className="ml-auto mr-auto col-lg-9"> 
              <div className="myaccount-wrapper"> 
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  <Login />
                  <SignUp />
                  {/* <ChangePwd />
                  <ModifyAddress /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}