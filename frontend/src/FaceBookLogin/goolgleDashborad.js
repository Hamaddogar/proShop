// src/App.js

import React, { useState, useEffect } from 'react';
import firebase from '../LoginWithSocialMedia/GoogleAthentication/firebase';
import GoogleLogin from '../LoginWithSocialMedia/GoogleAthentication/GoogleLogin';

function  Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
       console.log(user)
    });
  }, []);

  const handleLogout = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleLogin />
      )}
    </div>
  );
}

export default Dashboard;
