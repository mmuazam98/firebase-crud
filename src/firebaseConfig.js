import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";

const config = process.env;

const firebaseConfig = {
  apiKey: config.REACT_APP_API_KEY,

  authDomain: config.REACT_APP_AUTH_DOMAIN,

  projectId: config.REACT_APP_PROJECT_ID,

  storageBucket: config.REACT_APP_STORAGE_BUCKET,

  messagingSenderId: config.REACT_APP_MESSAGING_SENDER_ID,

  appId: config.REACT_APP_APP_ID,

  measurementId: config.REACT_APP_MEASUREMENT_ID,
};

// Establish a connection
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
