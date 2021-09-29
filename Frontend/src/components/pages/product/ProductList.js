import React, { useState } from 'react';

import Nav from '../../elements/UI/Nav';
import Footer from '../../layout/Footer';
import Bread from '../productdetail/Bread';

import SideBar from "../../elements/widgets/productlist/SideBar";
import Shop from "../../elements/widgets/productlist/Shop";

export default function ProductList() {

  const [ categoryName, setCategoryName ] = useState("");

  return(
    <div id="wrap">
      <Nav />
      <Bread productName="SHOP"/>
      <div className="shop-area pt-95 pb-100">
        <div className="container">
          <div className="row">
            <SideBar 
              setCategoryName = {setCategoryName} 
            />
            <Shop 
              categoryName = {categoryName}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}