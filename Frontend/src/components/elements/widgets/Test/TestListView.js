import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TestListView({data, setTestDatas}) {
  const [ count, setCount ] = useState(data.qty);

  var process = require('../../../../myprocess.json')


  const minusClick = () => {
    if(count==1) {
      alert('1개 미만으로는 주문할 수 없습니다.')
    }
    else {
      setCount(count-1)
    }
  }

  const plusClick = () => {
    setCount(count+1)
  }

  const handleDelete = (id) => {
    fetch(`http://${process.IP}:${process.PORT}/test/${id}`, {
      method: "DELETE"
    }).then(
      alert("삭제되었습니다."),
      fetch(`http://${process.IP}:${process.PORT}/test`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setTestDatas(data);
      })
    )
  }

  return(
    <tr key={data.id}>
      <td className="product-name text-center"><Link to={`/productdetail/${data.id}`}>{data.name}</Link></td>
      <td className="product-quantity">
        <div className="cart-plus-minus">
          <button 
            className="dec qtybutton"
            onClick={() => minusClick()}
          >
            -
          </button>
          <input className="cart-plus-minus-box" type="text" readonly="" value={count} />
          <button 
            className="inc qtybutton"
            onClick={() => plusClick()}
          >
            +
          </button>
        </div>
      </td>
      <td className="product-price-cart"><span className="amount old">{(data.price * count).toFixed(2)}</span><span className="amount">{(data.price * ((100-data.discount)/100) * count).toFixed(2)}</span></td>
      <td className="product-wishlist-cart"><Link to={`/productdetail/${data.id}`}>Select option</Link></td>
      <td className="product-remove">
        <button
          title={data.id}
          onClick={() => handleDelete(data.id)}
          value={data.id}
        >
          <i className="fa fa-times"></i>
        </button>
      </td>
    </tr>
  );
}