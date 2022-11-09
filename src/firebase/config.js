import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAVRj50cGi6tW-6tSUKAIVH2WUuOiq_5hI",
    authDomain: "chatapp2-b0ec5.firebaseapp.com",
    projectId: "chatapp2-b0ec5",
    storageBucket: "chatapp2-b0ec5.appspot.com",
    messagingSenderId: "214088913056",
    appId: "1:214088913056:web:ca0c5ebb88ae6f12b5f9c5",
    measurementId: "G-85CFZMDE8J"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const auth = firebase.auth();

export {firebaseApp, firestore, auth}

