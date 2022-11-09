
import React, {useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import Chat from './Chat/Chat';
import Login from './Login/Login';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/config';

export default function AppRouter () {

    const [user, setUser] = useState(false);
    const [about, setAbout] = useState([]);

    if (user) {
        return ( 
         <Routes>
             <Route exact path={CHAT_ROUTE} element={<Chat about={about} setUser={setUser} />} />
             <Route path='*' element={<Navigate to={CHAT_ROUTE} replace />}/>
         </Routes>
        )
     } else {
         return (
         <Routes>
             <Route exact path={LOGIN_ROUTE} element={<Login setUser={setUser} setAbout={setAbout} />} /> 
             <Route path='*' element={<Navigate to={LOGIN_ROUTE} replace />} />
         </Routes>
         )   
     }
}
