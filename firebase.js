// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIYDii6DfMHe8F4js3XB2L4bzpqTc3Q9E",
  authDomain: "ctse-bd51a.firebaseapp.com",
  projectId: "ctse-bd51a",
  storageBucket: "ctse-bd51a.appspot.com",
  messagingSenderId: "487306589191",
  appId: "1:487306589191:web:8076e216d06d14c83826a2",
  measurementId: "G-YXCYVQR03F"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const fireStoreDB = getFirestore(app);

export {auth, fireStoreDB};