import { app } from "./firebaseConfig.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
