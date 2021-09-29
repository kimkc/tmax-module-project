import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddBuyAndCart from './AddBuyAndCart';

export default function ProDetRgtMiddle() {

  const { id } = useParams();

  const [ datas, setDatas ] = useState([]);

  var process = require('../../../../../myprocess.json');
  
  // useEffect(()=>{
  //   axios.get(`/catalog-service/client/catalogs/${productId}`)
  //   .then(res => {
  //       return res.json();
  //   })
  //   .then(data => {
  //     setDatas(data);
  //   });
  // },[]);

  useEffect(()=>{
      fetch(`http://${process.IP}:${process.PORT}/product/${id}`)
      .then(res => {
          return res.json();
      })
      .then(data => {
        setDatas(data);
      });
  },[]);

  return(
    <Fragment>
      <AddBuyAndCart 
        data = {datas}
      />
    </Fragment>
  );
}