

export default function ModifyAddress() {
  return(
    <div className="accordion-item single-my-account mb-20 card">
      <div className="panel-heading card-header" id="panelsStayOpen-headingThree">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
          <h3 className="panel-title"><span>3 .</span> Modify your address book entries </h3>
        </button>
      </div>
      <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse hide" aria-labelledby="panelsStayOpen-headingThree">
        <div className="card-body">
          <div className="myaccount-info-wrapper">
            <div className="account-info-wrapper">
              <h4>Address Book Entries</h4>
            </div>
            <div className="entries-wrapper">
              <div className="row">
                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                  <div className="entries-info text-center">
                    <p>John Doe</p>
                    <p>Paul Park </p>
                    <p>Lorem ipsum dolor set amet</p>
                    <p>NYC</p>
                    <p>New York</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                  <div className="entries-edit-delete text-center">
                    <button className="edit">Edit</button>
                    <button>Delete</button>
                  </div>
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