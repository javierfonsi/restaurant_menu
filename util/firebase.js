const dotenv = require('dotenv');
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');

dotenv.config({ path: './config.env' });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, //"AIzaSyDqdRVoH8ApDx3P4uH8BPeWL-6axDskgHY",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN, //"multer-project-f0ebe.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID, //"multer-project-f0ebe",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, //"multer-project-f0ebe.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, //"23747907749",
  appId: process.env.FIREBASE_APP_ID, //"1:23747907749:web:698c86ae07ad7b04a77d4c",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID //"G-1H7QEJQDCW"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { storage };
