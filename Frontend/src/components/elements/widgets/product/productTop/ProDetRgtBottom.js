import React, { Fragment } from 'react';

export default function ProDetRgtTop({productCategory, productTag}) {
  
  return(
    <Fragment>
      <div className="pro-details-meta">
        <span>Categories :</span>
        <ul>
          <li><a href="/shop-grid-standard"></a>{productCategory}</li>
          {/* {category} */}
        </ul>
      </div>
      <div className="pro-details-meta">
        <span>Tags :</span>
        <ul>
          <li><a href="/shop-grid-standard">{productTag}</a></li>
        </ul>
      </div>
    </Fragment>
  );
}