const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

admin.initializeApp();

const ALGOLIA_APP_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.admin_key;
const ALGOLIA_INDEX_NAME = "matches";

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

exports.onMatchCreated = functions.firestore
    .document("matches/{matchId}")
    .onCreate((snap, context) => {
    const matchData = snap.data();
    const objectID = context.params.matchId;

    return index.saveObject({
        objectID,
        ...matchData
    });
});

exports.onMatchDeleted = functions.firestore
    .document("matches/{matchId}")
    .onDelete((snap, context) => {
    const objectID = context.params.matchId;
    return index.deleteObject(objectID);
});
