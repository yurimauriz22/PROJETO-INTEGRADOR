// Importação das funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";
import { getDatabase, ref as dbRef, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

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
const storage = getStorage(app);
const database = getDatabase(app);

// Função para fazer upload das imagens
function uploadImages(uid) {
    const files = document.querySelector("#imageInput").files;
    const storageRootRef = storageRef(storage); // Referência à raiz do storage

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const name = +new Date() + "-" + file.name;
        const sanitizedFileName = name.replace(/[.#$[\]]/g, '-'); // Substitui caracteres inválidos
        const userFolderRef = storageRef(storage, `${uid}/${sanitizedFileName}`); // Referência ao arquivo dentro da pasta do usuário

        const metadata = {
            contentType: file.type
        };

        uploadBytes(userFolderRef, file, metadata).then((snapshot) => {
            return getDownloadURL(snapshot.ref); // Obter URL de download após o upload
        }).then((url) => {
            // Salvar URL no Realtime Database
            const imageRef = dbRef(database, `images/${uid}/${sanitizedFileName}`);
            return set(imageRef, {
                url: url
            });
        }).then(() => {
            console.log('URL da imagem salva no Realtime Database.');
        }).catch((error) => {
            console.error('Erro ao fazer upload do arquivo:', error);
        });
    }
}

// Função para exibir imagens na galeria do usuário
function displayImagesInGallery(uid) {
    const gallery = document.getElementById('gallery');
    const databaseRootRef = dbRef(database);

    // Limpa a galeria antes de preenchê-la
    gallery.innerHTML = '';

    // Recuperar URLs das imagens do Realtime Database
    get(child(databaseRootRef, `images/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const imageData = snapshot.val();
            let imageCount = 0; // Contador para controlar o número de imagens exibidas

            for (const key in imageData) {
                if (imageCount < 6) { // Limita o número de imagens exibidas a 6
                    const img = document.createElement('img');
                    img.src = imageData[key].url;
                    gallery.appendChild(img);
                    imageCount++; // Incrementa o contador de imagens
                }
            }
        } else {
            console.log("Nenhuma imagem encontrada.");
        }
    }).catch((error) => {
        console.error('Erro ao recuperar imagens:', error);
    });
}

// Verificar se o usuário está autenticado
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid; // Obtém o UID do usuário autenticado
        document.getElementById('imageInput').addEventListener('change', () => uploadImages(uid));
        displayImagesInGallery(uid);
    } else {
        console.log("Usuário não autenticado");
        // Redirecionar para a página de login ou exibir uma mensagem
    }
});

window.addEventListener('load', function() {
    // Exibir a barra de progresso
    document.getElementById('progress-container').classList.remove('hidden');

    // Simulando o carregamento de todos os itens após 6 segundos (ajuste conforme necessário)
    setTimeout(function() {
        document.getElementById('progress-container').classList.add('hidden');
    }, 6000);
});
