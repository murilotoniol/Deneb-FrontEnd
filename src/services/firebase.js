// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1990QD58ZWWkZs-2jwEKh6VtKtcv1FB0",
  authDomain: "denebcorp-70067.firebaseapp.com",
  projectId: "denebcorp-70067",
  storageBucket: "denebcorp-70067.firebasestorage.app",
  messagingSenderId: "645491861213",
  appId: "1:645491861213:web:bd2bcfcbac4ef477dd9d34",
  measurementId: "G-HGCVD84PVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export default app;