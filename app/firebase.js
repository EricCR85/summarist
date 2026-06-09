import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBiyS0yJ10dO0uhceRWMqLh6cVno5oRlNg",
  authDomain: "summarist-52f20.firebaseapp.com",
  projectId: "summarist-52f20",
  storageBucket: "summarist-52f20.firebasestorage.app",
  messagingSenderId: "404591973847",
  appId: "1:404591973847:web:4f68335f9a1fc7fc4b6792",
  measurementId: "G-3DW1KDMT1V"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const Auth = getAuth(app);