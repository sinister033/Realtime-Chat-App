import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey:
    /*import.meta.env.VITE_FIREBASE_API_KEY*/ "AIzaSyCqLV_WVoP4f3yf9BNVCejIQXpSrpeqYeE",
  authDomain: "chat-web-app-8c8c6.firebaseapp.com",
  projectId: "chat-web-app-8c8c6",
  storageBucket: "chat-web-app-8c8c6.appspot.com",
  messagingSenderId: /*import.meta.env.VITE_SENDERID*/ "159829604926",
  appId: "1:159829604926:web:6240f32e8dfd777f41ef6f",
  measurementId: "G-1LE4XVNN8C",
};
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
