import React, { useState } from 'react';
import axios from 'axios'; 
import logoImg from '../images/logobg2.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { KeyRounded, Person } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { baseUrl } from '../config';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsf] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${ window.sessionStorage.getItem( 'token' ) }`,
      },
    };

    await axios.post( `${baseUrl}/login`, { email, password }, config ).then( ( response )=>{
      if ( response.status === 200 ) {
        const token = response.data.authorisation.token; 
        localStorage.setItem('token', token);
        onLogin({ loggedIn: true, token });
      } else {
        setErrorMsf(true);
      }
    } ).catch( ( error )=>{
        console.log( error );
        setErrorMsf(true);
    } );
  };

  return (
    <div className='loginCenter'>
      <div className='loginContainer'>
        <div className='loginBox'>
          <img src={logoImg} alt="Logo" />
          <div className='loginItems'>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <TextField
                id="login-email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                id="login-password"
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
            { errorMsg && (
              <Typography variant="caption" color="error" display="block" gutterBottom>
                Incorrect username or password. Please check your details and try again.
              </Typography>
            )}
          </div>
          <div>
            <Button variant="outlined" color='inherit' onClick={handleLogin}>Login</Button>
          </div>
          <div className='loginItemSignup'>
            <a className='anchorNavigation' href='/sign'>Don't have an account? Sign up now!</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
