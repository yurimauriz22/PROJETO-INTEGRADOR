function deleteImage(index) {
    const key = `imagem${index}`;
    localStorage.removeItem(key);
    updateGallery();
}

function updateGallery() {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = '';

    // Criar um array de chaves ordenadas
    const keys = Object.keys(localStorage).filter(key => key.startsWith('imagem')).sort();

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        const img = document.createElement('img');
        img.src = localStorage.getItem(key);
        img.alt = `Imagem ${i + 1}`;

        const deleteButton = document.createElement('span');
        deleteButton.classList.add('close-button');
        deleteButton.innerHTML = '&times;';
        deleteButton.onclick = function () {
            deleteImage(parseInt(key.replace('imagem', '')));
        };

        // Adicione um evento de clique para abrir o modal
        img.onclick = function () {
            openModal(img.src);
        };

        imgContainer.appendChild(deleteButton);
        imgContainer.appendChild(img);
        gallery.appendChild(imgContainer);
    }
}

// Chame a função updateGallery apenas após a lógica acima ser definida
window.addEventListener('DOMContentLoaded', updateGallery);

document.getElementById('imageInput').addEventListener('change', handleImageChange);

function handleImageChange() {
    const input = document.getElementById('imageInput');
    const gallery = document.getElementById('imageGallery');

    if (input.files && input.files.length > 0) {
        for (let i = 0; i < input.files.length; i++) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const imageDataURL = e.target.result;
                localStorage.setItem(`imagem${localStorage.length}`, imageDataURL);
                updateGallery();
            };

            reader.readAsDataURL(input.files[i]);
        }
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