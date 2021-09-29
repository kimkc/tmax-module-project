import { Link } from "react-router-dom";

export default function CartTableFooter({ orderItems, totalPrice }) {
  
  return (
    <div className="row">
      <div className="col-lg-4 col-md-6" />
      <div className="col-lg-4 col-md-6" />
      <div className="col-lg-4 col-md-12">
        <div className="grand-totall">
          <div className="title-wrap">
            <h4 className="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
          </div>
          <h5>Total products <span>${totalPrice}</span></h5>
          <h4 className="grand-totall-title">Grand Total <span>${totalPrice}</span></h4>
          <div className="row pt-2">
            <Link className="col-5 mx-auto" to={{
              pathname: '/order',
              state: {
                prop: orderItems
              }
            }}>
              비회원 주문
            </Link>
            <Link className="col-5 mx-auto" to={{
              pathname: '/order',
              state: {
                prop: orderItems
              }
            }}>
              회원 주문
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}