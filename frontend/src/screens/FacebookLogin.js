import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

function Login() {
  const [token, setToken] = useState('');

  const responseFacebook = (response) => {
    axios.post('http://localhost:7000/auth/facebook', {
      access_token: response.accessToken,
    }).then((res) => {
      setToken(res.data.accessToken);
    }).catch((error) => {
      console.log(error);
    });
  }

  const onFailure = (response) => {
    console.log(response);
  }

  if (token) {
    // Redirect the user to the homepage with the access token
    window.location.href = `http://localhost:3000/?token=${token}`;
  }

  return (
    <div>
      <FacebookLogin
        appId="937729870607312"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        onFailure={onFailure}
      />
    </div>
  );
}

export default Login;
