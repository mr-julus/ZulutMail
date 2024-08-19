import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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

auth.onAuthStateChanged(async (user) => {
    if (user) {
        const email = user.email;
        const [username, domain] = email.split('@');
        const response = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=${domain}`);
        const messages = await response.json();
        document.getElementById("usermail").innerText = `You are logged in with the email: ${email}`;

        let messagesHtml = '';
        messages.forEach(message => {
            messagesHtml += `<button class="email-button" onclick="seeMail('${username}', '${domain}', ${message.id})">Subject: ${message.subject} - From: ${message.from}</button>`;
        });

        document.getElementById('emailMessages').innerHTML = messagesHtml;
    } else {
        alert("Please login first...");
        window.location.href = '/auth/login';
    }
});

// Fonction pour voir un email spécifique
window.seeMail = async (username, domain, emailId) => {
    try {
        const response = await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${username}&domain=${domain}&id=${emailId}`);
        const emailDetails = await response.json();
        
        // Afficher les détails dans la popup
        document.getElementById('emailSubject').textContent = emailDetails.subject;
        document.getElementById('emailFrom').textContent = emailDetails.from;
        document.getElementById('emailDate').textContent = emailDetails.date;
        document.getElementById('emailBody').innerHTML = emailDetails.textBody || emailDetails.htmlBody;

        document.getElementById('emailPopup').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
};

// Fermer la popup
document.getElementById('closePopup').onclick = function() {
    document.getElementById('emailPopup').style.display = 'none';
}

// Fermer la popup si l'utilisateur clique en dehors de celle-ci
window.onclick = function(event) {
    if (event.target === document.getElementById('emailPopup')) {
        document.getElementById('emailPopup').style.display = 'none';
    }
}

document.getElementById('logoutButton').addEventListener('click', () => {
    signOut(auth).then(() => {
        alert('Successful!');
        window.location.href = '/auth/login';
    }).catch((error) => {
        alert(error.message);
    });
});