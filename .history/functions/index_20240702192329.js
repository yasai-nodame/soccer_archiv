const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

// Firebaseのサービスアカウント情報
const serviceAccount = {
  type: "service_account",
  project_id: "soccer-archive",
  private_key_id: "892fa2e6c3ed1dcf8c6fe52f6e2f13f86b7e73d2",
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC847PUCuZGTeBQ
tnMrujgNTAlTxjdIRMjrgabO7sVRFJ0MwyHY/F6sl+eHMyggjLAZTsZNefk2Spkq
j86UcFICVES/lT7RkhXQkDEx80b4wQu/Kwj0FlBU3QSG83sa5vwLzkxAF73wAVDa
B8uM5Lxg+DE1By9xLmqIrRpM/0mdUIN6yS+p2gHEExHn1qfGK6cVT91aUxNSUAfq
bbXHudgwQhsc+KUzCZi7P+/Swfb9lZE/GkHjnFDMjvpeK72xrZmX6plen0fpvFuo
/KLMoZfgfrXFSWjptjKP2fQee6mh3DLEQJbZzc3vUPg+Qj2fmlVsMEE4BNsNhU6S
ce822HsHAgMBAAECggEABwEFR4NzjQxqzDaS6BgUTcxRrwVAD1JBn8q9PGbjjFsD
0csG6iyKRCl9ZwJK5oR6ksDcuIqHzTwQS63TOEAL9aGM5QyFkxbKiUld3mv9AZ22
Fkuw6szmNw3Bxh4PWAZUA6OnW/VyNqaN1wluW+L7zmqvKtGBfSRkxEmkgOtmBH4j
k5tk7qlcRmQ3l0oXc7tpmpfsDt3q3t4mugaDsDiekXkNPfdyxSgfBEWhDUiT9zU2
bIK8xoIL8Llpl+2u6ANj3NJSpy5xpHIsPCE5BpmPY46hVbKU/AoU49Yu6VHC+evy
y9DIyp2vtXHvE8ng2q+GwBlp02A/6sfi76SJmfNScQKBgQDhCK5jLnzSRqv26YHj
GsD5+8pGbwuqZNSCGtwcc7qRIxMOQ+umlZK2UkdMmXV5e221gYiOV22CQIqI0+On
3pERpzSdF1JmHsZiQhw6/f/Xcdpp+bKbcmR1gcWuj5Mg9O2WZR9AF72rLvYWU+Qx
GQNOVpzg6MVVLIdYfIIokVqwVwKBgQDW4cC8GvaQjLiHX0hKfMi0KD8Tje9WTdxb
WTgmDixjOMCoOE4dgyvMBlzx7RQFGZz3sl1N0jw5Bc0651ihoQUi5vfMJU4/va+K
0gnXsTMmksX0beoEUTV4oZYzIg7GVgJJmE2iy99+wb23Gcm9NFPl0vLRCnXMNEyB
S/CCPIMc0QKBgHLbZXbGAXuqCpeJ83ug6iItu75ba07bDAQkBXiYMP9nMZC0ZhCu
gyV/tViJcwZAU2yy4qoUQZabrpnL3ISP+udRum77uljZGFSKfbI2dmDWga5ZfioN
Ju07AVTpfyTxHlsG3f5un6ZB3+ThiLTumVtgpc29wQqKIcKuOhjOp8UdAoGAK0et
GjYUE2lEgX+ff+FCS4cPrVCZNDjaeUuvE3snVZTIuRkeIrOYzq85aUDnF1/hTcKP
KG1/07xnacXPBD76Wd1La8LXz97UzJEhimAWfV5yoJjC2bvBmVpydjoV37zTGR+k
A3Ysvcsn+wkmqQUxIMksPw5sS4T9I82304N8pQECgYBt5nJVtVypILc6aJrbpgDw
P0CgWqJ2KAxcoQoNjyx8p4zkkHgB0RWD9upT5tE5KdZpU1F9+VUJcf387NDsuGog
UwAguVDX4jc7e0GmF2FiCI2ZSd1tPVSQJjb7KO/6g5Fz162buVaRC9uwSOdf7hG4
m5f6s36Z80no/xdkKyAMiA==
-----END PRIVATE KEY-----\n`,
  client_email: "firebase-adminsdk-7bezh@soccer-archive.iam.gserviceaccount.com",
  client_id: "110052404983133249006",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7bezh%40soccer-archive.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// Firebaseの初期化 credentialにサービスアカウント情報を使用する
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Algoliaの設定
const ALGOLIA_APP_ID = functions.config().algolia.app_id; // アプリケーションID
const ALGOLIA_UPLOAD_KEY = functions.config().algolia.upload_key; //検索用APIキー
const ALGOLIA_INDEX_NAME = functions.config().algolia.index_name; //インデックス名

console.log("algolia_app_id", ALGOLIA_APP_ID);

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_UPLOAD_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// Firebaseからデータを取得する関数
async function getFirebaseData() {
  const snapshot = await admin.firestore().collection("matches").get();
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
getFirebaseData()
  .then((data) => {
    console.log("Firebaseのデータ", data);
  })
  .catch((error) => {
    console.error("Firebaseのデータ取得エラー", error);
  });
