import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

export default function ProDetRgtTop() {

  const { id } = useParams();
  const [ productData, setproductData ] = useState([]);

  useEffect(() => {
    axios.get('/catalog-service/catalogs/client/${productId}')
    .then(res => {
      return res.json();
    })
    .then(data => {
      setproductData(data);
    })
    // .catch(error => console.log(error));
  },[id]);

  // useEffect(() => {
  //   fetch(`http://${process.IP}:${process.PORT}/product/${id}`)
  //   .then(res => {
  //     return res.json();
  //   })
  //   .then(data => {
  //     setproductData(data);
  //   })
  //   // .catch(error => console.log(error));
  // },[id]);

  return(
    <Fragment>
      <h2>{productData.productName}</h2>
      <div className="product-details-price">
        <span>{productData.unitPrice}원</span>
      </div>
      <div className="pro-details-list">
        <p>{productData.cont}</p>
      </div>
    </Fragment>
  );
}
