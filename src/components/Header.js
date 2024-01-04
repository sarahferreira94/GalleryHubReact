import React from 'react';
import logoImg from '../images/logobg2.png'; 
import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';

const Header = () => {  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className='headerStyle'>
      <div className='headerContainer'>
        <div className='headerItem'>
          <img src={logoImg} alt="Logo" />
        </div>
        <div className='headerItem'>
          <Button variant="text" color='inherit' endIcon={<Logout />} onClick={(e)=>handleLogout()}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;