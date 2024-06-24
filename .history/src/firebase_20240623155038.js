import { initializeApp } from "firebase/app";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apikey: process.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };