import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_M5jwrSRzGjgp65ZWvFaMBx8JHDQsz0Y",
  authDomain: "derwazainterview.firebaseapp.com",
  projectId: "derwazainterview",
  storageBucket: "derwazainterview.appspot.com",
  messagingSenderId: "175685483415",
  appId: "1:175685483415:web:98cb049560eb26c3e3a2d2",
  measurementId: "G-G23FZDKEWY",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
