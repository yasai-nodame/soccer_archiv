const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

async function getFirebaseData() {
    const snapshot = await db.collection('matches').get();
    const documents = snapshot.docs.map(doc => doc.data());
    
    return documents;
}


// データの取得
