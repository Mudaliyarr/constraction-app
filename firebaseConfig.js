import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDi1ItEx7EC_VDSh6gIMhB0FFiYBVZgZCs",
  authDomain: "app-auth-3d45a.firebaseapp.com",
  projectId: "app-auth-3d45a",
  storageBucket: "app-auth-3d45a.firebasestorage.app",
  messagingSenderId: "346645302720",
  appId: "1:346645302720:web:4721d1b26af258dcb38c25",
  measurementId: "G-5WPXJBM7V0"
};

// Initialize Firebase only if it's not already initialized
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}

const auth = getAuth(app);
const db = getFirestore(app);  // Pass the app instance to getFirestore()

export { app, auth, db };
