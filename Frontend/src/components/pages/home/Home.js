import React, { Fragment } from 'react';
import Header from '../../layout/Header';
import Deal from '../../../components/layout/Deal'
import Footer from '../../layout/Footer';

export default function Home() {
  return(
    <Fragment>
      <Header></Header>
      <Deal></Deal>
      <Footer></Footer>
    </Fragment>
  );
}