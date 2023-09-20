// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBWpQRR6V08rJpx3q4VlqPO1FjGrtYyq24",
    authDomain: "skanda-client-website.firebaseapp.com",
    projectId: "skanda-client-website",
    storageBucket: "skanda-client-website.appspot.com",
    messagingSenderId: "110782837976",
    appId: "1:110782837976:web:b6449ea43355bdf99f13ad",
    measurementId: "G-GPEXDCXNZP"
  };
  
  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

  export default firebaseConfig;
  