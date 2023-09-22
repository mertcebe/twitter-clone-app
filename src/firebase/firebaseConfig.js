import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHvbx0EOczxShMqiebjuUOBSjynRXs2zo",
  authDomain: "react-twitter-app-1b9f0.firebaseapp.com",
  projectId: "react-twitter-app-1b9f0",
  storageBucket: "react-twitter-app-1b9f0.appspot.com",
  messagingSenderId: "343336545820",
  appId: "1:343336545820:web:a31845ff838b1c5c41b9d9",
  measurementId: "G-8CFLRXH170"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const database = getFirestore();

export {database as default, auth};