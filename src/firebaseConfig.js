import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBd1kuLhE0VWwEV8XkQ9OyjVEepFEinHr0",

  authDomain: "fir-crud-b8507.firebaseapp.com",

  projectId: "fir-crud-b8507",

  storageBucket: "fir-crud-b8507.appspot.com",

  messagingSenderId: "1:732659046677:web:85d54ca2702fa4391df11c",

  appId: "1:732659046677:web:85d54ca2702fa4391df11c",

  measurementId: "G-Y8C12T74LY",
};

// Establish a connection
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
