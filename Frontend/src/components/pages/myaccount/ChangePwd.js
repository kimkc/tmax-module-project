

export default function ChangePwd() {
  return(
    <div className="accordion-item single-my-account mb-20 card">
      <div className="panel-heading card-header" id="panelsStayOpen-headingTwo">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
          <h3 className="panel-title"><span>2 .</span> Change your password</h3>
        </button>
      </div>
      <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse hide" aria-labelledby="panelsStayOpen-headingTwo">
          <div className="card-body">
              <div className="myaccount-info-wrapper">
                <div className="account-info-wrapper">
                  <h4>Change Password</h4>
                  <h5>Your Password</h5>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="billing-info">
                      <label>Password</label>
                      <input type="password"/>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="billing-info">
                      <label>Password Confirm</label>
                      <input type="password"/>
                    </div>
                  </div>
                </div>
                <div className="billing-back-btn">
                  <div className="billing-btn">
                    <button type="submit">Continue</button>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div>
  );
}