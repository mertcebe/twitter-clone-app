import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyY4t0JgUsxtCqUcwUp5d-U6QTikrz27E",
  authDomain: "twitter-app-2b0a1.firebaseapp.com",
  projectId: "twitter-app-2b0a1",
  storageBucket: "twitter-app-2b0a1.appspot.com",
  messagingSenderId: "582702491904",
  appId: "1:582702491904:web:90d5d08ada416bca8f6be5",
  measurementId: "G-LBCGEJ9FN1"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const database = getFirestore();

export {database as default, auth};