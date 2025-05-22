// Firebase Admin SDK initialization
const admin = require('firebase-admin');

// You should place your Firebase service account key JSON in the backend directory and reference it here
const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ksustadocs.firebaseio.com',
});

const db = admin.firestore();

module.exports = db;
