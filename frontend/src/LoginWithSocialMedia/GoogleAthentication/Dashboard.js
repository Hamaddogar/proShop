// src/App.js

import React, { useState, useEffect } from 'react';
import firebase from './firebase';

import { useHistory } from 'react-router-dom';
function Dashboard() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
       if(user)
       {
        history.push('/')
       }
    });
  }, []);

  const handleLogout = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  return (
    <div>
      {/* <LoginScreen user={user} /> */}
      {user ? (
        <div>
          <h7>Welcome, {user.displayName}!  </h7>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>   Sign In</p>
      )}
    </div>
  );
}




export default Dashboard;
