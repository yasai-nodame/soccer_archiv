const admin = require('firebase-admin');
const algliasearch = require('algoliasearch');

// firebaseの初期化
admin.initializeApp();
const db = admin.firestore();

// algoliaの設定
const ALGOLIA_APP_ID = '5EL036RLDF';
const ALGOLIA_SEARCH_KEY = 'efb172bdcbc0ad93fe8771ddfe8c7a2a'
const ALGOLIA_INDEX_NAME = 'soccer-archive'

const client = algliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// firebaseからデータを取得する関数
async function getFirebaseData() {
    const snapshot = await db.collection('matches').get();
    const documents = snapshot.docs.map(doc => doc.data());
    
    return documents;
}


// algoliaへデータをアップロードする関数
async function uploadDatatoAlgolia() {
    try {
        const firebaseData = await getFirebaseData();

        // algoliaにデータをアップロードする
        const algoliaResponse = await index.saveObjects(firebaseData);
        console.log('algoliaへデータをアップロードしました', algoliaResponse);
    } catch (error) {
        console.error('algoliaへのデータアップロードに失敗しました', error);
    }
}

// algoliaで検索を実行する関数
async function searchAlgolia(query) {
    try {
        const response = await index.search(query);
        return response.hits;
    } catch (error) {
        console.error('検索エラー', error);
        return [];
    }
}

// データをalgoliaにアップロードする
uploadDatatoAlgolia();

// algoliaで検索を実行する例
searchAlgolia('チェルシー').then(results => {
    console.log('algoliaでの検索結果', results);
}).catch (error => {
    console.error('algoliaでの検索エラー', error);
})

// データの取得
getFirebaseData().then(data => {
    console.log(data);
}).catch(error => {
    console.error('firebaseのデータエラー', error);
})