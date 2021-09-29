import React ,{useEffect, useState} from 'react';
import OrderListView from './OrderListView';


export default function CartContainer({ orderItems }) {

  const [ total, setTotal ] = useState();

  useEffect(() => {
    var sum = 0;
    orderItems.map(orderItem => {
      sum += orderItem.totalPrice;
    })
    setTotal(sum)
  })

  return (
    <div className="cart-main-area pt-90">
      <div className="container">
        <h3 className="cart-page-title">Your cart items</h3>
        <div className="row">
          <div className="col-12">
            <div className="table-content table-responsive cart-table-content order-table-content">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orderItems && orderItems.map(item => (
                      <OrderListView data={item} />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 col-md-6" />
          <div className="col-lg-4 col-md-12">
            <div className="grand-totall">
              <div className="title-wrap">
                <h4 className="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
              </div>

              <h5>Total products <span>{total}</span></h5>
              <h4 className="grand-totall-title">Grand Total <span>{total}</span></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}