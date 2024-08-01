document.addEventListener("DOMContentLoaded", function() {
    var abrirVideoBtns = document.querySelectorAll("[id^='abrirVideo']");
    var modal = document.getElementById("modal");
    var fecharModalBtn = document.getElementById("fecharModal");
    var videoFrame = document.getElementById("videoFrame");

    // Vídeos disponíveis
    var videos = {
        video1: "https://www.youtube.com/embed/sJjyX9W-E-Y?si=n-uEAOnKbXT_kxqP",
        video2: "https://www.youtube.com/embed/vJfwuCB5C8o?si=AyC-GuqPtKQ4CXyH",
        video3: "https://www.youtube.com/embed/rVTqBPop4LA?si=GW2S4FxrzvRuFHKF",
        video4: "https://www.youtube.com/embed/ioZaofmFkjM?si=V4dhLg4fHJ8yBlTI",
        video5: "https://www.youtube.com/embed/xTlIkRAbK08?si=KFKZulBXuDXvtG2i",
        video6: "https://www.youtube.com/embed/pv-aymg97JM?si=rCJ8KjT5qgS0oDsv",
        video7: "https://www.youtube.com/embed/CE6kq_8YlIk?si=75Zc7t9o0w72vw9D"
    };

    // Função para abrir um vídeo com base no botão clicado
    function abrirVideo(botao) {
        var videoSelecionado = botao.getAttribute("data-video");
        modal.style.display = "block";
        videoFrame.style.width = "99%";
        videoFrame.style.height = "400px";
        videoFrame.src = videos[videoSelecionado];
    }

    // Adicione ouvintes de evento para abrir vídeos quando os botões são clicados
    abrirVideoBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            abrirVideo(btn);
        });
    });

    // Adicione um ouvinte de evento para fechar o modal quando o botão de fechar é clicado
    fecharModalBtn.addEventListener("click", function() {
        modal.style.display = "none";
        videoFrame.style.width = "";
        videoFrame.style.height = "";
        videoFrame.src = "";
    });

    // Feche o modal e interrompa o vídeo se o usuário clicar fora dele
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            videoFrame.style.width = "";
            videoFrame.style.height = "";
            videoFrame.src = "";
        }
    });
});
