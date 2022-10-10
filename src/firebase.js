import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1BgSww1PUp2K8I5lRokxZ78Hkb-rEDkI",
  authDomain: "todo2-ca12c.firebaseapp.com",
  projectId: "todo2-ca12c",
  storageBucket: "todo2-ca12c.appspot.com",
  messagingSenderId: "238998479752",
  appId: "1:238998479752:web:330001ea47e136e5c4903d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
