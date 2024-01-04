import React, { useState } from 'react';
import '../Style/main.css';
import logoImg from '../images/logobg2.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Email, KeyRounded, Person } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../config';
import { isEmailValid } from '../util';

const Sign = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);

  const handleSign = async (event) => {
    event.preventDefault();
  
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };
  

    if (isEmailValid(email)) {
      const userData = {
        name,
        email,
        password,
      };
    
      try {
        const response = await axios.post(`${baseUrl}/register`, userData, config);
        if (response.status === 201) {
          const token = response.data.authorization.token;
          localStorage.setItem('token', token);
          onLogin({ loggedIn: true, token });
        } else {
          console.log('Algo deu errado no registro');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setInvalid(true);
    }
  };

  return (
    
    <div className='signCenter'>
      <div className='signContainer'>
        <div className='signBox'>
          <img src={logoImg} alt="Logo" />
          <div className='signItems'>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <TextField
                id="sign-name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Box>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <TextField
                id="sign-email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setInvalid(false);
                }}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Box>
            { invalid && (<Typography variant="caption" color="error" display="block" gutterBottom>
              Invalid email.
              </Typography>) }

            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <TextField
                id="sign-password"
                placeholder="Password"
                value={password}
                type='password'
                onChange={(e) => setPassword(e.target.value)}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyRounded />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Box>
          </div>
          <div>
            <Button variant="outlined" color='inherit' onClick={handleSign}>Register</Button>
          </div>
          <div className='signItemLogin'>
            <a className='anchorNavigation' href='/login'>Have an account? Login.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
