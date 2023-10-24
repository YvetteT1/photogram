// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.apiauthDomain,
  projectId: process.env.apiprojectId,
  storageBucket: process.env.apistorageBucket,
  messagingSenderId: process.env.apimessagingSenderId,
  appId: process.env.apiappId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);