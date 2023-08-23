import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

// your web app's firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9U-ATYkQ3lRvVZCEnfcclRZFs2nPTz8I",
    authDomain: "whats-new-de07f.firebaseapp.com",
    projectId: "whats-new-de07f",
    storageBucket: "whats-new-de07f.appspot.com",
    messagingSenderId: "1062109948350",
    appId: "1:1062109948350:web:c541cf1668641b6fad31ef"
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//export default db;