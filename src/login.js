import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "YOUR FIREBASE API KEY",
    authDomain: "YOUR FIREBASE AUTH DOMAIN",
    databaseURL: "YOUR FIREBASE DATABASE URL",
    projectId: "YOUR FIREBASE PROJECT ID",
    storageBucket: "YOUR FIREBASE STORAGE BUCKET",
    messagingSenderId: "YOUR FIREBASE MESSAGING SENDER ID",
    appId: "YOUR FIREBASE APP ID",  
    measurementId: "YOUR FIREBASE MEASUREMENT ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Successful!');
        window.location.href = '/';
    } catch (error) {
        alert(`${error.message}`);
    }
});