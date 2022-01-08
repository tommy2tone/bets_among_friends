import React, { useState } from 'react'; 
import {useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
// import EmailIcon from '@mui/icons-material/Email';
import { uploadAvatar } from '../../services/user-services';
import { changePass } from '../../services/user-services';
import {NotificationManager} from 'react-notifications';


function Account() {

    const { authData } = useAuth();
    const [image, setImage] = useState();
    // const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    // const [email, setEmail] = useState('');

    const passMatch = () => {
        return password === password2;
    }

    const uploadFile = async e => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('image', image, image.name);

        const uploaded = await uploadAvatar(authData.user.profile.id, uploadData);
        if(uploaded){
            NotificationManager.success("Imaged uploaded");
        }else{
            NotificationManager.error("Image did not upload");
        }
    }

    const submitChangePass = async e => {
        e.preventDefault();
        if(passMatch()){
            const passData = await changePass(
                {old_password: oldPassword, new_password: password},
                authData.user.id,
                authData.token
            );
            if(passData){
                NotificationManager.success("Password Updated");
            }
            }else{
                NotificationManager.error("Passwords don't match");

            }
        }
    

 
  return (
    <div>
        <Link to="/">Back</Link>
        <h1>Change Your Picture</h1>
        <form onSubmit={uploadFile}>
            <label>
                <p>Upload your avatar</p>
                <TextField type="file" onChange= { e => setImage(e.target.files[0])} />
            </label>

        <br/>
        <Button type="submit" variant="contained" color="primary">
                Upload File
        </Button>
            
        </form>

        <h1>Change Your Password</h1>
        <form onSubmit={submitChangePass}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <VpnKeyIcon sx={{  mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Old Password" variant="standard" type="password" 
              onChange = { e => setOldPassword(e.target.value)}
            />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <VpnKeyIcon sx={{ mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="New password" variant="standard" type="password" 
                onChange = { e => setPassword(e.target.value)}
                />
            </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <VpnKeyIcon sx={{ mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Repeat password" variant="standard" type="password" 
              onChange = { e => setPassword2(e.target.value)}
            />
          </Box>
          <br/>

          <Button color='primary' variant='contained' type='submit'>
              CHANGE PASSWORD
          </Button>
        </form>

        
        
    </div>
  );
}

export default Account;
