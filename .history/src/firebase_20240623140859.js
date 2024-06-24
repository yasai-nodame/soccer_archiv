import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apikey:"AIzaSyCh50ChmIiOeADQrwg0Q0xA2gURZczAUzE",
    authDomain: "soccer-archive.firebaseapp.com",
    projectId: "soccer-archive",
    storageBucket: "soccer-archive.appspot.com",
    messagingSenderId: "275440401244",
    appId: "1:275440401244:web:51b87b219216a59c68df99"
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log('firebase config:', firebaseConfig);

export { db };