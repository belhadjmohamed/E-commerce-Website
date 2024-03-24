// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgOAEfoRQbDoRBt35Mkl_UKgRq0u38Cuw",
  authDomain: "e-commerce-video.firebaseapp.com",
  projectId: "e-commerce-video",
  storageBucket: "e-commerce-video.appspot.com",
  messagingSenderId: "194610774769",
  appId: "1:194610774769:web:13f6b0f5726719fafb1f50"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;