
import 'animate.css'
import './Login.css'

import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Login () {

    const provider = new GoogleAuthProvider();
    const login = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }


    return (
        <div className='main container'>
            <h1 className='main__heading'>Login Page</h1>
            <div className='main__login'>
                <p>Please use an gmail account</p>
                <img src="google.png" alt="google icon" onClick = {login} />
            </div>
        </div>
    )
}