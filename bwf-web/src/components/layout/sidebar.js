import React, { useState } from 'react'; 
import { Button, Box, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { auth } from '../../services/user-services';
import {useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import User from '../user/user';


function Sidebar() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authData, setAuth } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await auth({username, password});
    setAuth(data);
  }

  const logout = () => {
    setAuth(null);
  }

  const account = () => {
    navigate('/account');
  }

 
  return (
    <div className="sidebar">
      {!authData ?
      <div>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Username" variant="standard" 
              onChange = { e => setUsername(e.target.value)}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <VpnKeyIcon sx={{  mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Password" variant="standard" type="password" 
              onChange = { e => setPassword(e.target.value)}
            />
          </Box>
          <br/>
          <Button color='primary' variant='contained' type='submit'>
              Login
          </Button>
          <br/>
        </form>
        <Link to={'/register'}>Register</Link>
        </div>

        :
        <div>
          <User user={authData.user}/>
          <br/>
          <br/>
          <Button color='primary' variant='contained' onClick={logout}>
              Logout
          </Button>
          <br/>
          <br/>
          <Button color='primary' variant='contained' onClick={account}>
              Account
          </Button>

        </div>
      }
      
    </div>
  );
}

export default Sidebar;
