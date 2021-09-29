import React from 'react';

import Nav from '../../elements/UI/Nav';
import Footer from '../../layout/Footer';
import Bread from '../productdetail/Bread';
import HistoryTable from './HistoryTable';

export default function History() {

    return (
        <div id="wrap">
            <Nav />
            <Bread productName="Order History" />
            <HistoryTable />
            <Footer />
        </div>
    );
}