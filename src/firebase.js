// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnACHgDSk1Y6vWLRPUdx8VLvF45KGvTEo",
  authDomain: "myntracolabshoptest.firebaseapp.com",
  projectId: "myntracolabshoptest",
  storageBucket: "myntracolabshoptest.appspot.com",
  messagingSenderId: "873847934884",
  appId: "1:873847934884:web:042a9214af6488ce36bb31",
  measurementId: "G-G88Z108NNT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
