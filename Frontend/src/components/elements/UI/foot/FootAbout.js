import React, { Fragment, useState } from 'react';

export default function FootAbout({footermenulist, footermenutitle}) {

  const [ newData, setnewData] = useState(footermenulist);

  const footList = newData.map(item => (
    <li key={item.id}>{item.name}</li>
  ))
  return(
    <Fragment>
      <div className="col-12 col-md-2">
        <p className="menuTitle">{footermenutitle}</p>
        <ul>
          {footList}
        </ul>
      </div>
    </Fragment>
  );
}