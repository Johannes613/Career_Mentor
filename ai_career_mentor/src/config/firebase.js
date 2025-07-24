import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsv4JDONaL0jXW37r_t0MeSe69I_aOHYM",
  authDomain: "ai-career-mentor-e2095.firebaseapp.com",
  projectId: "ai-career-mentor-e2095",
  storageBucket: "ai-career-mentor-e2095.appspot.com", // Corrected storage bucket name
  messagingSenderId: "17154740601",
  appId: "1:171547-40601:web:e3735475f8e7ecbb149fa8",
  measurementId: "G-MVML83CVYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export all the necessary functions and services
export { 
    auth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithPopup,
    googleProvider,
    signOut,
    onAuthStateChanged
};