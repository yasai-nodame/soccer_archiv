import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const authenticateAndFetchDocument = async () => {
    try {
        // ユーザーの認証
        const userCredential = await signInWithEmailAndPassword(auth, "yasainiwaka@gmail.com", "danngomaru02");
        const user = userCredential.user;

    } catch (error) {
        console.log('エラー:', error);
    }
};

authenticateAndFetchDocument();

export { db, auth };

// ホームとロゴを押すと、そのホームに戻るように設定する。

//  firebaseから、検索文字列を参照して、一致した情報を取得し表示させる。