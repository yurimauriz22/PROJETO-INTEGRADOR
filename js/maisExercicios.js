// Importação das funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB_A7ce7rxbD6QR1k8MtxxmiERBGb3bQz0",
    authDomain: "space-calm.firebaseapp.com",
    projectId: "space-calm",
    storageBucket: "space-calm.appspot.com",
    messagingSenderId: "236518444248",
    appId: "1:236518444248:web:51847e2f757d9a8c489bad",
    measurementId: "G-ND4YSRH202"
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Função para verificar se o usuário é admin
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Pega o UID do usuário autenticado
        const userId = user.uid;
        
        // Referência no Realtime Database para buscar o dado do usuário
        const userRef = ref(database, 'users/' + userId);
        
        // Busca os dados do usuário
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                // Verifica se o usuário é admin
                if (userData && userData.isAdmin) {
                    // Exibe o botão de admin se for um administrador
                    document.getElementById("admin-button-container").style.display = "block";
                }
            } else {
                console.log("Usuário não encontrado no banco de dados");
            }
        }).catch((error) => {
            console.error("Erro ao buscar os dados do usuário:", error);
        });
    } else {
        console.log("Usuário não autenticado");
    }
});
