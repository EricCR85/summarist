import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiyS0yJ10dO0uhceRWMqLh6cVno5oRlNg",
  authDomain: "summarist-52f20.firebaseapp.com",
  projectId: "summarist-52f20",
  storageBucket: "summarist-52f20.firebasestorage.app",
  messagingSenderId: "404591973847",
  appId: "1:404591973847:web:4f68335f9a1fc7fc4b6792",
  measurementId: "G-3DW1KDMT1V",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup, signInAnonymously, signOut, sendPasswordResetEmail };






// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";

// const app = initializeApp(firebaseConfig);

// let analytics;

// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }

// export const auth = getAuth(app);
// export { analytics };
// export const db = getFirestore(app);
