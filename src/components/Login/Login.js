
import 'animate.css'
import './Login.css'

import React from 'react';
import {firebaseApp, auth} from '../../firebase/config';
import firebase from 'firebase/app'

export default function Login () {

    // sign in with google provider

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
      }


    return (
        <div className='main container'>
            <h1 className='main__heading'>Login Page</h1>
            <div className='main__login'>
                <p>Please use an gmail account</p>
                <img src="google.png" alt="google icon" onClick={signInWithGoogle} />
            </div>
        </div>
    )
}