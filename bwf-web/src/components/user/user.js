import React from 'react'; 
import { Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import propTypes from 'prop-types';

const useStyles = makeStyles({
    container: {
        width: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    username: {
        padding: 0,
        margin: 0

    }

});


export default function User({user}) {

    const classes = useStyles();

 
  return (
    <div className={classes.container}>
          <Avatar alt="user avatar" src={"http://127.0.0.1:8000"+user.profile.image}/> 
          <h4 className={classes.username}>{user.username}</h4>
      
    </div>
  );
}

User.propTypes= {
    user: propTypes.shape({
        username: propTypes.string.isRequired,
        profile: propTypes.shape({
            image: propTypes.string
        }).isRequired
    }).isRequired
};
