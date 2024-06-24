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
const provider = new GoogleAuthProvider();
console.log('firebase config:', firebaseConfig);

// Googleログイン
async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log('Google user signed in:', user);
        return user;
    } catch (error) {
        console.error('Google sign-in error:', error.message);
        throw error;
    }
}

export { db };