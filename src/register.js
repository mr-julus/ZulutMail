import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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
const db = getFirestore(app);

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const domain = document.getElementById('domain').value;
    const password = document.getElementById('password').value;
    const UserEmail = `${email}@${domain}`;

    try {
        // Créer un utilisateur avec Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, UserEmail, password);
        const user = userCredential.user;

        // Stocker les informations de l'utilisateur dans Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: UserEmail,
            domain: domain,
            createdAt: serverTimestamp()
        });

        alert('Successful!');
        window.location.href = "/auth/login";
    } catch (error) {
        alert(error.message);
    }
});