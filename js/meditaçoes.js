// Seu código JavaScript aqui
var abrirVideoBtn1 = document.getElementById("abrirVideo1");
var abrirVideoBtn2 = document.getElementById("abrirVideo2");
var abrirVideoBtn3 = document.getElementById("abrirVideo3");
var abrirVideoBtn4 = document.getElementById("abrirVideo4");
// Adicione mais botões conforme necessário
var modal = document.getElementById("modal");
var fecharModalBtn = document.getElementById("fecharModal");
var videoFrame = document.getElementById("videoFrame");

// Variável para armazenar o tempo de reprodução atual do vídeo
var currentTime = 0;

// Vídeos disponíveis
var videos = {
    video1: "https://www.youtube.com/embed/sJjyX9W-E-Y?si=n-uEAOnKbXT_kxqP",
    video2: "https://www.youtube.com/embed/vJfwuCB5C8o?si=AyC-GuqPtKQ4CXyH", // Substitua pelo link do segundo vídeo
    video3: "https://www.youtube.com/embed/rVTqBPop4LA?si=GW2S4FxrzvRuFHKF", // Substitua pelo link do terceiro vídeo
    video4: "https://www.youtube.com/embed/ioZaofmFkjM?si=V4dhLg4fHJ8yBlTI",
};

// Função para abrir um vídeo com base no botão clicado
function abrirVideo(botao) {
    var videoSelecionado = botao.getAttribute("data-video");
    modal.style.display = "block";
    
    // Aumente o tamanho do vídeo (exemplo de tamanho maior)
    videoFrame.style.width = "99%"; // Defina a largura do vídeo
    videoFrame.style.height = "400px"; // Defina a altura do vídeo
    
    videoFrame.src = videos[videoSelecionado]; // Carregue o vídeo selecionado no iframe
}

// Adicione ouvintes de evento para abrir vídeos quando os botões são clicados
abrirVideoBtn1.addEventListener("click", function() {
    abrirVideo(abrirVideoBtn1);

});

abrirVideoBtn2.addEventListener("click", function() {
    abrirVideo(abrirVideoBtn2);

});

abrirVideoBtn3.addEventListener("click", function() {
    abrirVideo(abrirVideoBtn3);

});

abrirVideoBtn4.addEventListener("click", function() {
    abrirVideo(abrirVideoBtn4);

});

// Adicione mais ouvintes de evento para mais botões, se necessário

// Adicione um ouvinte de evento para fechar o modal quando o botão de fechar é clicado
fecharModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
    
    // Redefina o tamanho do vídeo para o tamanho original
    videoFrame.style.width = ""; // Redefina a largura do vídeo para automático
    videoFrame.style.height = ""; // Redefina a altura do vídeo para automático
    
    videoFrame.src = ""; // Limpe o atributo src para interromper o vídeo
});

// Feche o modal e interrompa o vídeo se o usuário clicar fora dele
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        
        // Redefina o tamanho do vídeo para o tamanho original
        videoFrame.style.width = ""; // Redefina a largura do vídeo para automático
        videoFrame.style.height = ""; // Redefina a altura do vídeo para automático
        
        videoFrame.src = ""; // Limpe o atributo src para interromper o vídeo
    }
});
