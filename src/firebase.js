// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzv-_Vhuilhh4TkdGwqaZKPffr7byw29M",
  authDomain: "twitter-react-ad88a.firebaseapp.com",
  projectId: "twitter-react-ad88a",
  storageBucket: "twitter-react-ad88a.appspot.com",
  messagingSenderId: "251075873500",
  appId: "1:251075873500:web:ad79925d534cb065d14219",
  measurementId: "G-R64Z5352VL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);