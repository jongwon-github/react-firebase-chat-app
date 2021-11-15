// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBiMiu7cWBsR3Bl4Lwx1Lmq6vkyUM5BLj8',
  authDomain: 'react-firebase-chat-app-caefd.firebaseapp.com',
  projectId: 'react-firebase-chat-app-caefd',
  storageBucket: 'react-firebase-chat-app-caefd.appspot.com',
  messagingSenderId: '945755114273',
  appId: '1:945755114273:web:1ab4f9d35b5ef0d7be4c60',
  measurementId: 'G-FHZKQ9KTBW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
