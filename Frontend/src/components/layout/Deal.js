import React, { useEffect, useState } from 'react';
import Title from '../elements/UI/Title';
import Tab from '../elements/UI/TabMenu';
import ProductViews from '../elements/widgets/product/ProductViews';
import axios from 'axios';

export default function Deal() {

  const [ categoryName, setCategoryName ] = useState("전체보기");
  const [ catalogData, setCatalogData ] = useState([]);

  useEffect(() => {
    axios.get('/catalog-service/catalogs')
    .then((res) => {
      setCatalogData(res.data)
    })
    catalogData.map(catalog => 
      setCategoryName(catalog.category))
},[])

  let sliceNumber = 12;
  let columnNumber = 3;
  return(
    <section id="deal">
      <div className="container">
        <Title title = "국내도서"></Title>
        <Tab 
          setCategoryName = {setCategoryName}
          categoryName = {categoryName} 
        />  
        <ProductViews 
          categoryName = {categoryName}
          sliceNumber = {sliceNumber}
          columnNumber = {columnNumber}
        />
      </div>
    </section>
  );
}