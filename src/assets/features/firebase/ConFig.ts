
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCwAtZyNkfTNibZnr5jloSafURPNz9U10",
  authDomain: "ecommerce-project-9375b.firebaseapp.com",
  projectId: "ecommerce-project-9375b",
  storageBucket: "ecommerce-project-9375b.appspot.com",
  messagingSenderId: "824574820533",
  appId: "1:824574820533:web:9a8d16d10e1e32051b3efc",
  measurementId: "G-1W4ETCW500"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// export const analytics = getAnalytics(app);