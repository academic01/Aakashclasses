import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDSboboAbI5928Maa43oUoGJY_j12JsO_Q",
  authDomain: "akashacademics-683e7.firebaseapp.com",
  projectId: "akashacademics-683e7",
  storageBucket: "akashacademics-683e7.firebasestorage.app",
  messagingSenderId: "1095432258727",
  appId: "1:1095432258727:web:dfcc253232ab64f2680782",
  measurementId: "G-3ZGH5VVCX1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
