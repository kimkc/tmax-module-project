import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

export default function CartListView({data, handleCheck, isChecked}) {
  let cnt = data.qty
  // const [ count, setCount ] = useState(data.qty);

  // 장바구니 단일 항목 수량 - UPDATE 요청
  const minusClick = () => {
    let url = '/cart-service/carts'
    
    if (cnt==1) {
      alert('1개 미만으로는 주문할 수 없습니다.')
    }
    else {
      cnt -= 1
    }

    let Item = 
      [
        {
          'cartId' : data.cartId,
          'productId' : data.productId,
          'qty' : cnt,
          'unitPrice' : data.unitPrice,
          'totalPrice' : cnt * data.unitPrice,
          'userId' : sessionStorage.userId
        }
      ]
    
    var config = {
      headers:{
        "Content-Type" : "application/json",
      }
    }
    axios.put(url, Item, config)
    .then((res) => {
      console.log(res)
      window.location.href = "/cart"
    }).catch((err) => {
      console.log(err)
    })
  }

  // 장바구니 단일 항목 수량 + UPDATE 요청
  const plusClick = () => {
    let url = '/cart-service/carts'
    if (cnt + 1 > data.stock) {
      alert('재고 수량이 부족합니다.')
    }
    else {
      cnt += 1
    }
    let Item = 
      [
        {
          'cartId' : data.cartId,
          'productId' : data.productId,
          'qty' : cnt,
          'unitPrice' : data.unitPrice,
          'totalPrice' : cnt * data.unitPrice,
          'userId' : sessionStorage.userId
        }
      ]
    var config = {
      headers:{
        "Content-Type" : "application/json",
      }
    }
    axios.put(url, Item, config)
    .then((res) => {
      window.location.href = "/cart"
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  // 장바구니 단일 항목 DELETE 요청

  const handleDelete = () => {
    let url = `/cart-service/carts/${data.cartId}`
    axios.delete(url)
    .then(
      alert("삭제되었습니다.")
      )
      return window.location.reload(`/cart-service/carts/user/${sessionStorage.userId}`);
  }
  
  return(
    <tr key={data.productId}>
    <td className="product-checkbox">
      <div className="form-check">
        <input id={data.productId} className="form-check-input" type="checkbox" 
          value={data.productId} checked={isChecked} onChange={handleCheck}
        />
        <label className="form-check-label d-none">
          {data.productId}
        </label>
      </div>
    </td>
      <td className="product-thumbnail">
      {/* <Link to={`/productdetail/${data.id}`}><img className="img-fluid" src={data.image[0]} alt="" /></Link> */}
      </td>
      <td className="product-name">
      <Link to={`/productdetail/${data.productId}`}>{data.productName}</Link>
      </td>
      <td className="product-price-cart">
        <span className="amount">{data.unitPrice}</span>
      </td>
      <td className="product-quantity">
        <div className="cart-plus-minus">
          <button 
            className="dec qtybutton"
            onClick={() => minusClick()}
          >
            -
          </button>
          <input className="cart-plus-minus-box" type="text" readOnly="" value={cnt} />
          <button 
            className="inc qtybutton"
            onClick={() => plusClick()}
          >
            +
          </button>
        </div>
      </td>
      <td className="product-subtotal">${(data.unitPrice * data.qty)}</td>
      <td className="product-remove">
        <button
          title={data.productId}
          onClick={() => handleDelete(data.cartId)}
          value={data.productId}
        >
          <i className="fa fa-times"></i>
        </button>
      </td>
    </tr>
  );
}