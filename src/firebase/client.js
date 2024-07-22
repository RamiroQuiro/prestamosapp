// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEs8d9jY3MXDk9_eQRaqr7VTEcGrlf4-Y",
  authDomain: "prestamosapp-a2507.firebaseapp.com",
  projectId: "prestamosapp-a2507",
  storageBucket: "prestamosapp-a2507.appspot.com",
  messagingSenderId: "639711930052",
  appId: "1:639711930052:web:ee131af65bccff60470b91",
  measurementId: "G-148EJ9GKQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
