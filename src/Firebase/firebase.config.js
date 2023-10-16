
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaSBHanXyzwHzhTo95ZE4ehqUNMG5oMGs",
  authDomain: "coffee-maker-e8ec9.firebaseapp.com",
  projectId: "coffee-maker-e8ec9",
  storageBucket: "coffee-maker-e8ec9.appspot.com",
  messagingSenderId: "813019573328",
  appId: "1:813019573328:web:f93023cfc7f430deda3555"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;