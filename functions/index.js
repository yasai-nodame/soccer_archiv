const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

// Firebaseのサービスアカウント情報
const serviceAccount = VITE_REACT_APP_FIREBASE_SERVICE_ACCOUNT;

// Firebaseの初期化 credentialにサービスアカウント情報を使用する
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Algoliaの設定
const ALGOLIA_APP_ID = VITE_REACT_APP_ALGOLIA_APP_ID;
const ALGOLIA_UPLOAD_KEY = VITE_REACT_APP_ALGOLIA_UPLOAD_KEY;
const ALGOLIA_INDEX_NAME = VITE_REACT_APP_ALGOLIA_INDEX_NAME;


const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_UPLOAD_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// Firebaseからデータを取得する関数
async function getFirebaseData() {
  const snapshot = await admin.firestore().collection("matches").get({ source: 'server'});
  const documents = snapshot.docs.map((doc) => ({
    objectID: doc.id, // ドキュメントでユーザーが設定したidとは別物。 firebaseが自動的に割り当てるドキュメントの固有識別子。
    ...doc.data(),
  }));
  return documents;
}

// Algoliaにデータをアップロードする関数
async function uploadDatatoAlgolia() {
  try {

    const firebaseData = await getFirebaseData();
    const objectsToUpload = firebaseData.map((doc) => ({
      objectID: doc.id,
      ...doc,
    }));
    const algoliaResponse = await index.saveObjects(objectsToUpload);
    console.log("Algoliaへのデータアップロードが成功しました", algoliaResponse);
  } catch (error) {
    console.error("Algoliaへのデータアップロードに失敗しました", error);
  }
}


// データをAlgoliaにアップロードする
uploadDatatoAlgolia();


// データの取得
getFirebaseData().then((data) => {
  console.log("Firebaseのデータ", data);
}).catch((error) => {
  console.error("Firebaseのデータ取得エラー", error);
});
