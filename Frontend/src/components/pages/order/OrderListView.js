import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OrderListView({ data }) {

  const [count, setCount] = useState(data.qty);

  return (
    <tr key={data.id}>
      <td className="product-thumbnail">
        {/* <Link to={`/productdetail/${data.id}`}><img className="img-fluid" src={data.image[0]} alt="" /></Link> */}
      </td>
      <td className="product-name">
        <Link to={`/productdetail/${data.productId}`}>{data.productName}</Link>
      </td>
      <td className="product-price-cart">
        <span className="amount">{data.unitPrice}원</span>
      </td>
      <td className="product-quantity">
        <div className="cart-plus-minus">
          <input className="cart-plus-minus-box" type="text" readOnly value={count} />
        </div>
      </td>
      <td className="product-subtotal">{data.totalPrice}원</td>
    </tr>
  );
}