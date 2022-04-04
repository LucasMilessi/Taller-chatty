import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDNeuYgc-eUND4eD9KSbMaAXadfClwNTTQ",
  authDomain: "chatty-nuevo.firebaseapp.com",
  projectId: "chatty-nuevo",
  storageBucket: "chatty-nuevo.appspot.com",
  messagingSenderId: "693496099220",
  appId: "1:693496099220:web:b67df0935cf2c6240f9f81",
  databaseURL: "https://chatty-nuevo-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();
