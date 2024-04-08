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

// Verifica se há uma URL de imagem armazenada no localStorage
const storedImageUrl = localStorage.getItem('uploadedImageUrl');
if (storedImageUrl) {
    document.getElementById('uploadedImage').src = storedImageUrl;
}

function uploadImages() {
    const files = document.querySelector("#imageInput").files;
    const ref = firebase.storage().ref();

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const name = +new Date() + "-" + file.name;
        const metadata = {
            contentType: file.type
        };
        const task = ref.child(name).put(file, metadata);
        task.then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                console.log(url);
                alert('image uploaded successfully');
                document.getElementById("uploadedImage").src = url;
                // Armazena a URL da imagem no localStorage
                localStorage.setItem('uploadedImageUrl', url);
            })
            .catch(console.error);
    }
}

function openModal(imgSrc) {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("modalImage");
    modalImg.src = imgSrc;
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}