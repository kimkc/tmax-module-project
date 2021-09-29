import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {

  return(
    <div className="col-xl-6 col-lg-8 d-none d-lg-block">
      <div className="main-menu">
        <div className="px-4">
          {sessionStorage.email}님
        </div>
        
        <nav>
          <ul>
            <li className="px-4">
              <Link to='/productlist'>SHOP</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}