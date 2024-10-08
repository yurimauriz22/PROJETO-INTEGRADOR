// Importação das funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { child, ref as dbRef, get, getDatabase, remove, set } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { deleteObject, getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

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
            alert('URL da imagem salva no Realtime Database.');
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
                if (imageCount < 10) { // Limita o número de imagens exibidas a 10
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

// Função para abrir o modal
function openModal(src) {
    const modal = document.getElementById("myModal");
    const modalImage = document.getElementById("modalImage");
    
    if (src) {
        modalImage.src = src; // Define a imagem no modal
    } else {
        const images = document.querySelectorAll("#gallery img");
        if (images.length > 0) {
            modalImage.src = images[0].src; // Abre a primeira imagem da galeria se nenhuma fonte for passada
        }
    }
    
    modal.style.display = "block";
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById("myModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Função para extrair o nome do arquivo da URL
function getFileNameFromURL(url) {
    // Remove o prefixo da URL e decodifica o nome do arquivo
    const fileName = decodeURIComponent(url.split('/').pop().split('?')[0]);
    return fileName;
}

// Função para deletar imagem
function deleteImage() {
    console.log("Iniciando processo de deletar imagem");
    const modalImage = document.getElementById("modalImage");
    const imageURL = modalImage.src;
    console.log("URL da imagem:", imageURL);

    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        console.log("UID do usuário:", uid);

        // Extrai o nome do arquivo da URL
        const fileName = getFileNameFromURL(imageURL);
        console.log("Nome do arquivo:", fileName);

        // Referência ao arquivo no Realtime Database
        const imageRef = dbRef(database, `images/${fileName}`);
        console.log("Referência do arquivo no Realtime Database:", imageRef.toString());

        // Verificar se o item existe antes de tentar removê-lo
        get(imageRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log('Item encontrado, removendo...');

                // Deletar o objeto do Realtime Database
                return remove(imageRef).then(() => {
                    console.log('Imagem removida do Realtime Database.');
                    // Atualiza a galeria após a remoção
                    displayImagesInGallery(uid);

                    // Fecha o modal
                    closeModal();
                });
            } else {
                console.log('Item não encontrado no Realtime Database.');
            }
        }).catch((error) => {
            console.error('Erro ao verificar o item no Realtime Database:', error);
        });
    } else {
        console.log("Usuário não autenticado");
    }
}

// Certifique-se de que o evento de clique no botão de fechar está funcionando
document.querySelector(".close").addEventListener("click", closeModal);

// Adiciona um evento de clique nas imagens da galeria para abrir o modal com a imagem correspondente
document.getElementById("gallery").addEventListener("click", function(event) {
    if (event.target.tagName === "IMG") {
        openModal(event.target.src);
    }
});

// Adiciona o evento de clique ao botão de deletar imagem no modal
document.getElementById("deleteButton").addEventListener("click", deleteImage);

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
    document.getElementById('loadingScreen').classList.remove('hidden');

    // Simulando o carregamento de todos os itens após 6 segundos (ajuste conforme necessário)
    setTimeout(function() {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 6000);
});

function removeSuccess() {
    document.querySelector('.button').classList.remove('success');
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.button').addEventListener('click', function() {
      this.classList.add('success');
      setTimeout(removeSuccess, 3000);
    });
  });
  