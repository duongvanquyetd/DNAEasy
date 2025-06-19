import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import React from 'react';

export  const LoginWithGoogle = () => {
  return (
<GoogleOAuthProvider clientId="701977169176-l3bgacd2v0975sj2ss7ajcqa8sttb7mo.apps.googleusercontent.com">
  <GoogleLogin
    onSuccess={credentialResponse => {
      console.log(credentialResponse);
      // gửi credentialResponse.credential (JWT) lên backend xác thực
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
</GoogleOAuthProvider>
  );
}