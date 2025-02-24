// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8oMEHhqJPfGNme0g6O0iEkOnz7FkaEX4",
  authDomain: "auth-yt-58cbe.firebaseapp.com",
  projectId: "auth-yt-58cbe",
  storageBucket: "auth-yt-58cbe.firebasestorage.app",
  messagingSenderId: "444269606457",
  appId: "1:444269606457:web:25a7373fa5634eb75c3fe8",
  measurementId: "G-C1RPD78NZ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Auth provider
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
