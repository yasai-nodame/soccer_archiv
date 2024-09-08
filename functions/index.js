const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

// Firebaseのサービスアカウント情報
const serviceAccount = {
  "type": "service_account",
  "project_id": "soccer-archive",
  "private_key_id": "36464a2cdbb95631efbf93afa5af348503d4ce0e",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDY+QH5EM8T5Fv4\n6vJBUH/G6/LAf9ospGu5C8XEMsa5pijvYBi8hu4yq14kyxqwGD33avXsTqxGulSM\n7nYIOog/OtKH3CbNr+wFh9+mjOnukw/W2pUA+ulL1TM+kGzb++ZYimlANOf0DkYf\n4+pJxJFblsmPfLxJUMs2y1tHzoA0OMyCi3lX3U+CKZb7XSpIOlr0lZclC7YdWqCr\npF0cIAppmHNmqTusQt/wJttoCF5gY/to2EsJ1Ut5hVXNSZsRybC6ZMswRBycPbtn\n0iaRhZijlF7ZYPL6b2aRSb7LOxPaaUUK7zkklGLu0WSiY0y1UKBKRA8X/nZvd7oS\nk5RZi1XvAgMBAAECggEAL9ODmdEYtDvMAixXxgnmgISV99S21MxRanKr3zmKEHYN\n4+X8zeG4M7cOg3G5qkNNtXIAT1xwIQ8FgCM4JUwxqC5hJc1jSEeU8QsoQ2AgWJRW\nE3gPDC5CqpKOPyY6uKrn9XBdDugakPNsha8Jf8UyfUvZliVao5aJlMRylHtySxAq\nB51xMSOYf/tY7M9e9ApoMNSvPZnkT0gwXU9rdkLaD9ma5PBBi+IfNEcxsmqXXmh8\nZo4gFAA2aDpffOrxtPWNoG4jBnlAouWLt1W15DACw+K/m/bRt8QZ3M6nayxid7sI\n4EQiDMT77AWZLw8LssMDaFuBTYXT13e1cOeuoGxWYQKBgQD4nQ5fTEOi7rB1DeXo\npJQIbsLvK1GzKopKrfo7oRfdt4xIFCDtha1hta2HrU8bbOrGmftlIMBxxN3LP3Wi\nt46ulZEvdTNDJ1ry0aymmGDTkzFku8YCVqJghKMDipmfqxf1weWyZF6ah8liOD3h\n5U4Cc6Bl63bbyf4XyIo42zMLZwKBgQDfa0r401bfKOaZC+fTUVQXj2mIbT+hdhVZ\nMIc01ne0tfO8fAzsAie1edZ4UBKUfHXuZrBD1JczOafdgGxTXr6qkO4O1iyd1wXB\nF7LJaVsWBCHXy3pNoVK3/UKaVGAj1cN+gcM0Ay2DM4GycfB9CIc0DeCy1NxbpHSM\nsaZpIxBUOQKBgQDCcFMlRUhAzd1ELzJ42P7N+ZKL651iOwsdjSQALuWzijI0zUlT\nexE3Mhgd3PXZxT15RkTPuuXIFOhCZcdjE5yL/n4mV8tX4hfHgSU+xj40OxKObi1W\n9trYEeRMiMHNlsqOcq9q7gTvZvOh1crQOb7hO/1euOGk1D3d7AHupcEuUQKBgGzb\nnj/22VEKYLEZd+8ipVKFceojMOm+21AFsRsxlEncjdG8r58evbJSlwkwGp12tw9d\nwWyLXNB8uynVtPI6K7R3wUZBXKPbbNZUcaxpRRRJFyRJ5GGGxQMYxybjDaToNsSg\n/TeOhNJ0ejE0CvUg/p+CU4VO6b9NNeyHcomvp/khAoGBAIGloIGc5Emg6+G5o3u3\nRyH1dzH81qftF8/Wf4+B9tCobIHczCHZd8dWwfuNzLqC6QFAO3He350CqdOtaF+/\naQXmF98WMTZAv5Zr74O6LwtrLHM9H0msdGarb/Yj/aCkUipZaaSwFYc2lFV2EBSh\nrCRq3U4Z+00poXdBUoLGHVcR\n-----END PRIVATE KEY-----\n",
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
  credential: admin.credential.cert(serviceAccount),
});

// Algoliaの設定
const ALGOLIA_APP_ID = "5EL036RLDF";
const ALGOLIA_UPLOAD_KEY = "bfcf336d89ab40a0315c7e2340bb6eaa";
const ALGOLIA_INDEX_NAME = "soccer-archive";


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
