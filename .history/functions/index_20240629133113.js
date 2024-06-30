const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');


// firebase初期化
admin.initializeApp();

// algoliaの初期化
const ALGOLIA_APP_ID = '5EL036RLDF'; // algoliaのアプリケーションID
const ALGOLIA_ADMIN_KEY = 'fd6ceab5ae7966c53bc81f07a33e3ced'; // algoliaのAPIキー
const ALGOLIA_INDEX_NAME = 'soccer_archive'; // algoliaのインデックス名

