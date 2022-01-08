import React from 'react'; 
import logo from '../../assets/bet_logo.png';


function Header() {
 
  return (
    <div className="header">
        <img src={logo} alt='BWF logo' height='150'/>
    </div>
  );
}

export default Header;
