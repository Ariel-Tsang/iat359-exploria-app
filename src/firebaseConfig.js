// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // enter you config information here
  apiKey: "AIzaSyCDhTEiE-vT-H8nE07BSpIWiCt6kBRS7Uw",
  authDomain: "fir-demo-c6b68.firebaseapp.com",
  projectId: "fir-demo-c6b68",
  storageBucket: "fir-demo-c6b68.appspot.com",
  messagingSenderId: "316949206747",
  appId: "1:316949206747:web:bea70bfaaab40af8299efe"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const firebase_auth = getAuth(firebase_app);
