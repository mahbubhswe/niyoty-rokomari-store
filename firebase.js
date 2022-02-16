import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCUKZdOfYBMmEYIofpCrfNeS7J28kWuHiw",
  authDomain: "niyoty-store.firebaseapp.com",
  projectId: "niyoty-store",
  storageBucket: "niyoty-store.appspot.com",
  messagingSenderId: "800040479848",
  appId: "1:800040479848:web:f44feae7f34b90fab41fdd",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
