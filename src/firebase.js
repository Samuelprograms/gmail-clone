import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBn92l5dxASGPVrLbhNbCOI1Nc1B4DoaF4",
  authDomain: "clone-c44e6.firebaseapp.com",
  projectId: "clone-c44e6",
  storageBucket: "clone-c44e6.appspot.com",
  messagingSenderId: "58700004997",
  appId: "1:58700004997:web:01c6e4f1705be5d260f3ec",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
