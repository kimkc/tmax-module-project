import React, { useState } from 'react';
import FootLogo from '../elements/UI/foot/FootLogo';
import FootAbout from '../elements/UI/foot/FootAbout';
import FootSubscribe from '../elements/UI/foot/FootSubscribe';
import footData from '../../db/footer.json';

export default function Footer() {
  
  const [ newfooterData, setnewfooterData ] = useState(footData);

  return(
    <footer>
      <div className="container-fluid" style={{padding:"0"}}>
        <div className="footer">
          <div className="container">
            <div className="row">
              <FootLogo></FootLogo>
              <FootAbout 
                footermenulist = {newfooterData['ABOUT US']}
                footermenutitle = 'ABOUT US'
              />
              <FootAbout 
                footermenulist = {newfooterData['USEFUL LINKS']}
                footermenutitle = 'USEFUL LINKS'
              />
              <FootAbout 
                footermenulist = {newfooterData['FOLLOW US']}
                footermenutitle = 'FOLLOW US'
              />
              <FootSubscribe></FootSubscribe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}