// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCBrSvSB-0STRQaSy8BI0QFvnSyRmsz74",
  authDomain: "myntracolabshopping.firebaseapp.com",
  projectId: "myntracolabshopping",
  storageBucket: "myntracolabshopping.appspot.com",
  messagingSenderId: "329144682037",
  appId: "1:329144682037:web:6bf576ae47c4166ce2537c",
  measurementId: "G-143QKGWQWP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
