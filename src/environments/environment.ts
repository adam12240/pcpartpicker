import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment= {
  apiKey: "AIzaSyDYduAUXXxDtHWrL2POf7o99ftEh1r9sek",
  authDomain: "pcpartpicker-36abe.firebaseapp.com",
  projectId: "pcpartpicker-36abe",
  storageBucket: "pcpartpicker-36abe.firebasestorage.app",
  messagingSenderId: "361342708535",
  appId: "1:361342708535:web:06d54742f8d7845918c8b2",
  measurementId: "G-H0CMQ4574W"
};

// Initialize Firebase
const app = initializeApp(environment);
const analytics = getAnalytics(app);