import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO6Xe-5Q-9otVdfegnVZGujUV_xBfv7EI",
  authDomain: "whatsapp-clone-542e4.firebaseapp.com",
  projectId: "whatsapp-clone-542e4",
  storageBucket: "whatsapp-clone-542e4.appspot.com",
  messagingSenderId: "495421684468",
  appId: "1:495421684468:web:f63d9862f482b47bbcfca1",
  measurementId: "G-DYGB844GHQ",
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get authentication and firestore instances
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
