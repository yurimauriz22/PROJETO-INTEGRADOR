import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getDatabase, ref, onValue, push, remove, get } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

// Inicializa o Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB_A7ce7rxbD6QR1k8MtxxmiERBGb3bQz0",
    authDomain: "space-calm.firebaseapp.com",
    projectId: "space-calm",
    storageBucket: "space-calm.appspot.com",
    messagingSenderId: "236518444248",
    appId: "1:236518444248:web:51847e2f757d9a8c489bad",
    measurementId: "G-ND4YSRH202"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Obtém a instância do auth
const auth = getAuth(app);
const database = getDatabase(app);

const videoModal = document.getElementById("videoModal");
const musicForm = document.getElementById("musicForm");
const videoContainer = document.getElementById("video-container");
const videoContainerModal = document.getElementById("video-container-modal");
const deleteButton = document.getElementById("delete-button");
const adminButtonContainer = document.getElementById("admin-button-container");
let isAdmin = false;

let currentVideoLink = '';
let currentVideoButton = null;
let currentVideoId = null;  // Variável para armazenar o ID do vídeo atual

// Função para abrir o modal de vídeo
function openVideoModal(videoLink, videoId, button) {
    currentVideoLink = videoLink;
    currentVideoButton = button;
    currentVideoId = videoId;  // Salva o ID do vídeo

    // Exibir o modal de vídeo
    videoModal.style.display = "block";

    // Criar o iframe para o vídeo dentro do modal
    videoContainerModal.innerHTML = `<iframe id="videoModalIframe" width="100%" height="315" src="${videoLink}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    // Exibir o botão de exclusão
    if (isAdmin) {
        deleteButton.style.display = 'block';  // Exibir o botão de exclusão
    } else {
        deleteButton.style.display = 'none';  // Esconder o botão de exclusão para não administradores
    }

    // Adicionar o evento de clique no botão de exclusão
    deleteButton.onclick = deleteVideo;
}

// Função para excluir o vídeo dentro do modal
function deleteVideo() {
    if (currentVideoId) {
        // Remover o vídeo do Firebase
        removeVideoFromFirebase(currentVideoId);

        // Remover o vídeo do DOM
        if (currentVideoButton && currentVideoButton.parentElement) {
            currentVideoButton.parentElement.remove();
        }
    }
    closeVideoModal();
}

// Função para fechar o modal de vídeo
function closeVideoModal() {
    videoModal.style.display = "none";
    videoContainerModal.innerHTML = '';  // Limpar o conteúdo do modal
    deleteButton.style.display = 'none';  // Esconder o botão de exclusão
}

// Adicionar o evento de fechar o modal de vídeo
document.getElementById("closeButtonModalVideo").addEventListener("click", closeVideoModal);

// Função para remover o vídeo do Firebase
function removeVideoFromFirebase(videoId) {
    const videoRef = ref(database, `videos/${videoId}`);
    remove(videoRef)
        .then(() => {
            console.log(`Vídeo com ID ${videoId} foi removido do Firebase.`);
        })
        .catch((error) => {
            console.error('Erro ao remover vídeo do Firebase:', error);
        });
}

// Função para carregar vídeos do Firebase
function loadVideosFromFirebase() {
    const videoRef = ref(database, 'videos');
    onValue(videoRef, function(snapshot) {
        const videos = snapshot.val();
        videoContainer.innerHTML = ''; // Limpar vídeos atuais

        // Para cada vídeo, criar um botão com link para exibir no modal
        for (let videoId in videos) {
            const video = videos[videoId];
            const videoButton = document.createElement('button');
            videoButton.innerText = `Assistir: ${video.name}`;
            videoButton.setAttribute('data-video-id', videoId);

            // Adicionar o evento diretamente no JS, sem o onclick no HTML
            videoButton.addEventListener('click', () => openVideoModal(video.link, videoId, videoButton));

            const videoButtonContainer = document.createElement('div');
            videoButtonContainer.classList.add('video-button');
            videoButtonContainer.appendChild(videoButton);

            // Adicionar o botão do vídeo à tela
            videoContainer.appendChild(videoButtonContainer);
        }
    });
}

// Função para adicionar um vídeo no Firebase
function addVideoToDatabase(video) {
    const videosRef = ref(database, 'videos');
    push(videosRef, video);
}

// Função para verificar se o usuário é administrador
function checkAdminStatus(user) {
    const userRef = ref(database, 'users/' + user.uid);
    get(userRef).then(snapshot => {
        if (snapshot.exists() && snapshot.val().isAdmin === true) {
            isAdmin = true; 
            adminButtonContainer.style.display = 'block';  // Exibir o botão de adicionar vídeo
            deleteButton.style.display = 'block;'
        }

        else{
            isAdmin = false;
        }
    }).catch((error) => {
        console.error('Erro ao verificar status de admin:', error);
    });
}

// Ouvir as mudanças no estado de autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        checkAdminStatus(user);  // Verifica se o usuário é admin
        loadVideosFromFirebase();  // Carrega vídeos do Firebase
    }
});

// Adicionar novo vídeo
musicForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const musicName = document.getElementById('musicName').value;
    const musicTime = document.getElementById('musicTime').value;
    const musicLink = document.getElementById('musicLink').value;

    const newVideo = {
        name: musicName,
        time: musicTime,
        link: musicLink
    };

    addVideoToDatabase(newVideo);
    closeVideoModal();
    musicForm.reset();
});

// Função para abrir o modal de admin
function openAdminModal() {
    const adminModal = document.getElementById("myModal");
    if (adminModal) {
        adminModal.style.display = "block";  // Exibe o modal de admin
    }
}

// Função para fechar o modal de admin
function closeAdminModal() {
    const adminModal = document.getElementById("myModal");
    if (adminModal) {
        adminModal.style.display = "none";  // Fecha o modal de admin
    }
}

// Ligar evento de clique para o botão de administrador
const addButton = document.getElementById("admin-button-container");
if (addButton) {
    addButton.addEventListener("click", openAdminModal);
} else {
    console.error("Botão de administrador não encontrado.");
}

// Evento de clique para fechar o modal de admin
document.getElementById("closeButtonModal").addEventListener("click", closeAdminModal);
