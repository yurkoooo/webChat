
import React, { Component } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import Chat from './Chat/Chat';
import Login from './Login/Login';
// import {useAuthState} from 'react-firebase-hooks/auth'

export default function AppRouter () {
    // const [user] = useAuthState();
    const user = true;
     return user ? 
    (
        <Routes>
            <Route exact path={CHAT_ROUTE} element={<Chat />} />
            <Route path='*' element={<Navigate to={CHAT_ROUTE} replace />}/>
        </Routes>
    )
    :
    (
        <Routes>
            <Route exact path={LOGIN_ROUTE} element={<Login />} /> 
            <Route path='*' element={<Navigate to={LOGIN_ROUTE} replace />} />
        </Routes>
    )
}
