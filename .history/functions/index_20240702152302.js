const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');

const ALGOLIA_APP_ID = process.env.VITE_REACT_APP_ALGOLIA_APP_ID;
const ALGOLIA_SEARCH_KEY = process.env.VITE_REACT_APP_ALGOLIA_SEARCH_KEY;
const ALGOLIA_INDEX_NAME = process.env.VITE_REACT_APP_ALGOLIA_INDEX_NAME;

console.log('algolia_app_id:', ALGOLIA_APP_ID);
console.log('algolia_search:', ALGOLIA_SEARCH_KEY);
console.log('algolia_index_name:', ALGOLIA_INDEX_NAME);

// Firebaseのサービスアカウント情報
const serviceAccount = {
  "type": "service_account",
  "project_id": "soccer-archive",
  "private_key_id": "75858a0d22e83b887695be30e3a56623e4d33b9f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsk1t8CDrGKMsW\nzburhnHF1HnOOXdxnovIS1feHG5RlsOq6pPNiHV6NKmi0vJCh4GY+ex0YkIuD4p3\nmgzP/HvpVOqxPcxncnxKRT/B5xz52hEsV8Ppm/OvoVOZb3cyrTCsB2hixcxkHmTL\nhaqaWQ/hmoVvSruHUNrE4LloFYYtIP/ThPWSd9b1b4ZwBlF/AbZTwQAi7c32G1mY\nsoqLwo44Td5RWXEuP2mqSVhUA0YttKBZYTrdSRy3oVEBMLIHLbssBtbScbZaWXgt\nRQiwxsymcZ6UzvrvtRtIhbG+BqR+kvMx0pCvhBZyfb+TWQ7BpBhV4WWgE5LNWni4\nG4xo9WIVAgMBAAECggEAC+HvlCg658cKSM0spWBR+CWrp2P0kfmxNT7e03fQrsR7\nP4r8V1QUhrAWmBP/Q05yQXa/7bmQRfyi855DUJTZcVT7/e075EmRPknrXG4N5DQ8\nJ3n5jt3Cly68A14V7oLXTZkK+nYVHzWqigrvlsYYHlgV5PZX2DbcgV7Z1U1aGkRE\n9qWAb30vGpW0rcdBKLWx3Dl1kztcgXRissDh8fe/Yl/ug3GY7Nbf8TTrnFi3VGDL\niFDiBmG+gePMR/zFmfWkfIRUCsTMyvBl2Vt2EX6graBAHMu5i9TN+FurcQ76X6Jc\nvwpeDcabHWDZFlki1ZMymQJX2ZoVdU786or/sMAg0QKBgQDUv7VZLAYl4wQzehcr\nYZhQhy8fv+CBa1sBnNF2csz0IR+VPYPFvvg08q3UCTaimdKum6z2lQ1ve5cyizju\nMR3Z8YRxsocXghFIjmWNVTz680kOzCPaNSJL5fqJM7N3mFOj9Dzfpn5O+AsHAkYe\nNPjUoivgDUJPUAMRjVUsGTCMWQKBgQDPqN/cHCXO7PzEpq8wGgQg2Mb9Bn+ZXdrM\n164YGwTmPtFsM4NGXxe79cOxYOCu+a4KTKS7O5EXiphVrCvspCcryvUv/YSV8+18\nFHWY3EAky/uA46dHcdo3u6HVeQbDHhX80MSElAFU/tUuGlKcNNjd24mtLNF8tZCw\nWUViZYHcHQKBgA49wwL0GnlAyBA2FQT3ZH3HftUOQBYJvK7P84mNR8Dz0qxn0MFU\n9kJ9GDvAXiLmTx8XFq3u7lZPHKDqhuYS7Z+gNjByNe7R6xxDQ/MBCLL3xCU0bxX1\nRpV0EKBMkK/px3eLKuQBviTFH9/ZPB5bh2icbnlyCcVLYtky78ei7AgJAoGBAMtf\nYJ55Eq4tewA9HqXFVPW2WGvFyYGyYW7sbBw/mfTE4OVPLenlh6EVeKpnbqTu8nwz\nw8F6/QZJPhfpnrsLqTFCfA6cAxW454T1pJYoXsmq3I3GZzWZU1Xx9PTUqsK83FvV\nOiF9sjBDwxR7wxwoxZvCPnvTwPaZ+zI6u7E6KIwhAoGARorxKz0Ci/4t6KcYLM6M\n2rznNNxPHrb5SGCe5usz39nKXrMUt/UP9l2+Cp3DyGLJ70e57Gtn0ZFdYMZ1IYLc\n4pm2zbFkUUG05vsE1OCaRMVoUJ4MbdchwqT581LSfVBkvUo2GwQEurUTq3G7WuA2\ncD0uBFyJXo53Lp/VcWWr0oY=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-7bezh@soccer-archive.iam.gserviceaccount.com",
  "client_id": "110052404983133249006",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7bezh%40soccer-archive.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Firebaseの初期化 credentialにサービスアカウント情報を使用する
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Algoliaの設定
// const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID; // アプリケーションID
// const ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY; //検索用APIキー
// const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME; //インデックス名

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// Firebaseからデータを取得する関数
async function getFirebaseData() {
  const snapshot = await admin.firestore().collection('matches').get();
  const documents = snapshot.docs.map(doc => ({
    objectID: doc.id, // ドキュメントでユーザーが設定したidとは別物。 firebaseが自動的に割り当てるドキュメントの固有識別子。
    ...doc.data()
  }));
  return documents;
}

// Algoliaにデータをアップロードする関数
async function uploadDatatoAlgolia() {
  try {
    const firebaseData = await getFirebaseData();
    const objectsToUpload = firebaseData.map(doc => ({
        objectID: doc.id,
        ...doc
    }));
    const algoliaResponse = await index.saveObjects(objectsToUpload);
    console.log('Algoliaへのデータアップロードが成功しました', algoliaResponse);
  } catch (error) {
    console.error('Algoliaへのデータアップロードに失敗しました', error);
  }
}



// データをAlgoliaにアップロードする
uploadDatatoAlgolia();


// データの取得
getFirebaseData().then(data => {
  console.log('Firebaseのデータ', data);
}).catch(error => {
  console.error('Firebaseのデータ取得エラー', error);
});


