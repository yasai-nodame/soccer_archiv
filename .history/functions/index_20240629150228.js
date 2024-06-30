const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');

admin.initializeApp();

const ALGOLIA_APP_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.admin_key;
const ALGOLIA_INDEX_NAME = 'your_index_name';

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

exports.syncDataToAlgolia = functions.firestore
  .document('your_collection/{documentId}')
  .onWrite((change, context) => {
    const data = change.after.exists ? change.after.data() : null;
    const objectID = context.params.documentId;

    if (data) {
      return index.saveObject({
        objectID,
        ...data
      });
    } else {
      return index.deleteObject(objectID);
    }
  });

exports.searchAlgolia = functions.https.onRequest((req, res) => {
  const query = req.query.query;

  index.search(query).then((response) => {
    res.status(200).send(response);
  }).catch((error) => {
    res.status(500).send(error);
  });
});
