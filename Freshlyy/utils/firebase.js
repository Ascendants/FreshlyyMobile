import { getStorage } from 'firebase/storage';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import 'firebase/firestore';


import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBiMF12vtgUGyUlxgY-sq5Rqn5ama1WFR4',
  authDomain: 'freshlyy-437ac.firebaseapp.com',
  projectId: 'freshlyy-437ac',
  storageBucket: 'freshlyy-437ac.appspot.com',
  messagingSenderId: '940915596506',
  appId: '1:940915596506:web:84b0cf3b8f5d962e2e19e3',
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const app = firebase.app();
export const database = getFirestore(app);
export const auth = getAuth(app);

