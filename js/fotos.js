const firebaseConfig = {
    apiKey: "AIzaSyB_A7ce7rxbD6QR1k8MtxxmiERBGb3bQz0",
    authDomain: "space-calm.firebaseapp.com",
    projectId: "space-calm",
    storageBucket: "space-calm.appspot.com",
    messagingSenderId: "236518444248",
    appId: "1:236518444248:web:51847e2f757d9a8c489bad",
    measurementId: "G-ND4YSRH202"
};
firebase.initializeApp(firebaseConfig);
document.getElementById('imageInput').addEventListener('change', uploadImages);
// Function to upload images
function uploadImages() {
    const files = document.querySelector("#imageInput").files;
    const storageRef = firebase.storage().ref(); // Reference to the root of storage

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const name = +new Date() + "-" + file.name;
        const fileRef = storageRef.child(name); // Reference to the file

        const metadata = {
            contentType: file.type
        };

        const task = fileRef.put(file, metadata); // Upload task

        task.then(snapshot => {
            console.log(file);
            return snapshot.ref.getDownloadURL(); // Get download URL after upload
        }).then(url => {
            localStorage.setItem('uploadedImageUrl', url);
        }).catch(error => {
            console.error('Error uploading file:', error);
        });
    }
}

function displayImagesInGallery() {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const gallery = document.getElementById('gallery');
    let imageCount = 0; // Contador para controlar o número de imagens exibidas

    // Limpa a galeria antes de preenchê-la
    gallery.innerHTML = '';

    // Lista todos os itens no diretório raiz
    storageRef.listAll().then((res) => {
        res.items.slice(0, 6).forEach((itemRef) => { // Limita o loop aos primeiros 6 itens
            if (imageCount < 6) { // Verifica se o número de imagens exibidas é menor que 6
                // Cria um novo elemento de imagem
                const img = document.createElement('img');
                // Define o atributo src da imagem como o URL do item
                itemRef.getDownloadURL().then((url) => {
                    img.src = url;
                    // Adiciona a imagem à galeria
                    gallery.appendChild(img);
                    imageCount++; // Incrementa o contador de imagens
                }).catch((error) => {
                    console.error('Error getting download URL:', error);
                });
            }
        });
    }).catch((error) => {
        console.error('Error listing items:', error);
    });
}

// Chama a função para exibir as imagens na galeria ao carregar a página
displayImagesInGallery();