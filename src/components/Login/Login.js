
import 'animate.css'
import './Login.css'

import {MyContext} from '/chat app/chat/src/index';
import React, {useContext} from 'react';

export default function Login () {

    const {auth} = useContext(MyContext)
    return (
        <div className='main container'>
            <h1 className='main__heading'>Login Page</h1>
            <div className='main__login'>
                <p>Please use an gmail account</p>
                <img src="google.png" alt="google icon" />
            </div>
        </div>
    )
}