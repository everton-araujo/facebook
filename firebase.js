// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjrR1UyoP4mm55fhw_Ixu3u0KnIfFEdJY",
  authDomain: "facebook-853db.firebaseapp.com",
  projectId: "facebook-853db",
  storageBucket: "facebook-853db.appspot.com",
  messagingSenderId: "727670727403",
  appId: "1:727670727403:web:e5938f0dfaa0a63b5c54ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const app = !firebase.apps.length ? firebase.initializedApp(firebaseConfig) : firebase.app();

const db = getFirestore();
const storage = getStorage();

export { db, storage };
