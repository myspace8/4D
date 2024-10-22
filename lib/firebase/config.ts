// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5X4RY03pDizmS07ddD0PBCvGV04XhPkM",
  authDomain: "database-4d.firebaseapp.com",
  projectId: "database-4d",
  storageBucket: "database-4d.appspot.com",
  messagingSenderId: "43626265354",
  appId: "1:43626265354:web:e1a84eac4f6a86dfda58f3",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
