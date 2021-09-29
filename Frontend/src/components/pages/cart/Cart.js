import React from 'react';
import Nav from '../../elements/UI/Nav';
import Footer from '../../layout/Footer';
import Bread from '../productdetail/Bread';
import CartTable from '../../elements/widgets/cartTable/CartTable';

export default function Cart(){
  return(
    <div id="wrap">
      <Nav />
      <Bread productName="CART"/>
      <CartTable />
      <Footer />
    </div>
  );
}