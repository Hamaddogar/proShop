import React from 'react';
import firebase from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FaGoogle } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  button: {
    background: 'white',
    color: '#757575',
    borderRadius: '4px',
    border: '1px solid #ddd',
    textTransform: 'none',
    '&:hover': {
      background: '#f1f1f1',
      border: '1px solid #bbb',
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    color: 'white',
    backgroundColor: 'rgb(234, 67, 53)',
    '&:nth-of-type(2)': {
      backgroundColor: 'rgb(251, 188, 5)',
    },
    '&:nth-of-type(3)': {
      backgroundColor: 'rgb(66, 133, 244)',
    },
    '&:nth-of-type(4)': {
      backgroundColor: 'rgb(52, 168, 83)',
    },
  },
}));

function GoogleLogin() {
  const classes = useStyles();
  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };

  return (
    <Button
      className={classes.button}
      startIcon={<img src="https://img.icons8.com/?size=1x&id=V5cGWnc9R4xj&format=png" />}
      onClick={handleLogin}
    >
    Login With Google
    </Button>
  );
}

export default GoogleLogin;
