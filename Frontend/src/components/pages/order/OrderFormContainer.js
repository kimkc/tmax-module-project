import { useState } from 'react';

import ShipmentForm from './ShipmentForm';
import OrderForm from './OrderForm';
import PaymentForm from './PaymentForm';

export default function OrderFormContainer({orderItems}) {
  
  const [orderInfo, setOrderInfo] = useState({});

  return (
    <div className="myaccount-area pb-80 pt-100">
      <div className="container">
        <div className="row">
          <div className="ml-auto mr-auto col-lg-9">
            <div className="myaccount-wrapper">
              <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item single-my-account mb-20 card">
                  <div className="panel-heading card-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                      <h3 className="panel-title"><span>1 .</span> Shipment Information </h3>
                    </button>
                  </div>
                  <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <ShipmentForm orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
                  </div>
                </div>
                <div className="accordion-item single-my-account mb-20 card">
                  <div className="panel-heading card-header" id="panelsStayOpen-headingTwo">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                      <h3 className="panel-title"><span>2 .</span> Orderer Information</h3>
                    </button>
                  </div>
                  <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse hide" aria-labelledby="panelsStayOpen-headingTwo">
                    <OrderForm orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
                  </div>
                </div>
                <div className="accordion-item single-my-account mb-20 card">
                  <div className="panel-heading card-header" id="panelsStayOpen-headingThree">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                      <h3 className="panel-title"><span>3 .</span> Payment Information </h3>
                    </button>
                  </div>
                  <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse hide" aria-labelledby="panelsStayOpen-headingThree">
                    <PaymentForm orderItems={orderItems} orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}