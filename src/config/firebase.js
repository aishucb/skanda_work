// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEJlazhRcbvonRy_BBA2hgqo5pcOemsRE",
  authDomain: "skanda-project-fd476.firebaseapp.com",
  projectId: "skanda-project-fd476",
  storageBucket: "skanda-project-fd476.appspot.com",
  messagingSenderId: "810284200286",
  appId: "1:810284200286:web:bff867b840c67537935fcf",
  measurementId: "G-9TXBJ8YRNV"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
