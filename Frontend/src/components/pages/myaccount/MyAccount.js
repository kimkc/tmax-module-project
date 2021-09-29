import React from 'react';

import Nav from '../../elements/UI/Nav';
import Footer from '../../layout/Footer';
import Bread from '../productdetail/Bread';
import MyAccountHome from './MyAccountHome';

export default function MyAccount() {
  return(
    <div id="wrap">
      <Nav />
      <Bread productName="MY ACCOUNT"/> 
      <MyAccountHome />
      <Footer />
    </div>
  );
}