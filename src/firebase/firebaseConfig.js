import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVYfRU371n9AksTXZjTfVrwstyfZzP25E",
  authDomain: "clone-app-6a41c.firebaseapp.com",
  projectId: "clone-app-6a41c",
  storageBucket: "clone-app-6a41c.appspot.com",
  messagingSenderId: "386808238648",
  appId: "1:386808238648:web:b065f54da3aadcd7398ccd",
  measurementId: "G-MDMJYTD8Q7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const database = getFirestore();

export {database as default, auth};