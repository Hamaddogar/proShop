// src/components/Login.js

import React from 'react';
import firebase from '../LoginWithSocialMedia/GoogleAthentication/firebase';

function Login() {
  const handleLogin = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };

  return (
    <button onClick={handleLogin}>Login with Facebook</button>
  );
}

export default Login;
