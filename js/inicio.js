import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_A7ce7rxbD6QR1k8MtxxmiERBGb3bQz0",
    authDomain: "space-calm.firebaseapp.com",
    projectId: "space-calm",
    storageBucket: "space-calm.appspot.com",
    messagingSenderId: "236518444248",
    appId: "1:236518444248:web:51847e2f757d9a8c489bad",
    measurementId: "G-ND4YSRH202"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function displayUserName() {
    const userNameElement = document.getElementById('userName');

    if (!userNameElement) {
        console.error('Elemento com ID "userName" não encontrado.');
        return;
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('Usuário autenticado:', user); // Verifique as propriedades do usuário
            userNameElement.textContent = `${user.displayName || 'Usuário'}`;
        } else {
            console.log('Nenhum usuário autenticado.');
            userNameElement.textContent = 'Olá, Usuário';
        }
    });
}

displayUserName();
    