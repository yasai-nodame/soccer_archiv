const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');


// firebase初期化
admin.initializeApp();

// algoliaの初期化
const ALGOLIA_APP_ID = '5EL036RLDF'; // algoliaのアプリケーションID
const ALGOLIA_ADMIN_KEY = 'fd6ceab5ae7966c53bc81f07a33e3ced'; // algoliaのAPIキー
const ALGOLIA_INDEX_NAME = 'matches'; // algoliaのインデックス名

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// firebaseのドキュメントが作成されたときのトリガー
exports.onDocumentCreated = functions.firestore 
    .document('matches/{matchId}')
    .onCreate((snap, context) => {
        const data = snap.data();
        data.objectID = context.params.matchId;

        return index.saveObject(data)
            .then(() => {
                console.log('文書がalgoliaにインデックスされました', data.objectID);
            })
            .catch(error => {
                console.error('文書のインデックスに失敗しました', error);
            })
    })

exports.onDocumentDeleted = functions.firestore 
    .document('matches/{matchId}')
    .onDelete((snap, context) => {
        const objectID = context.params.matchId;

        return index.deleteObject(objectID)
            .then(() => {
                console.log('文書が削除され、algoliaからも削除されました', objectID);
            })
            .catch(error => {
                console.error('文書の削除に失敗しました', error);
            })
    })

