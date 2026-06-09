// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiyS0yJ10dO0uhceRWMqLh6cVno5oRlNg",
  authDomain: "summarist-52f20.firebaseapp.com",
  projectId: "summarist-52f20",
  storageBucket: "summarist-52f20.firebasestorage.app",
  messagingSenderId: "404591973847",
  appId: "1:404591973847:web:4f68335f9a1fc7fc4b6792",
  measurementId: "G-3DW1KDMT1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);