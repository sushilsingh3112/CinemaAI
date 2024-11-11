// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVml-lyAuNk3gmFxxKMJCnrW-OFM2xDpE",
  authDomain: "moviesgpt12.firebaseapp.com",
  projectId: "moviesgpt12",
  storageBucket: "moviesgpt12.appspot.com",
  messagingSenderId: "346493405878",
  appId: "1:346493405878:web:f397fb5a775df7fb6c7417",
  measurementId: "G-6X33ZN7XSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();