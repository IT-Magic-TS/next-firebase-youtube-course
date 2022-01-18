// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARdQ-9O-Vq3-DBS7GRiu7huyYnrT6jVA8",
  authDomain: "next-react-8d1f4.firebaseapp.com",
  databaseURL:
    "https://next-react-8d1f4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "next-react-8d1f4",
  storageBucket: "next-react-8d1f4.appspot.com",
  messagingSenderId: "854540671672",
  appId: "1:854540671672:web:c8e737026f3bf817f5724d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
