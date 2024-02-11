// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXNr88YygHsSohzDh8vxFFodzu3YAh7Io",
  authDomain: "stream-flix-82174.firebaseapp.com",
  projectId: "stream-flix-82174",
  storageBucket: "stream-flix-82174.appspot.com",
  messagingSenderId: "603992373702",
  appId: "1:603992373702:web:a953144e4c0f649c419ac7",
  measurementId: "G-W73K5HRPS7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
