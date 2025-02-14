let musicas = [
    {titulo:'Dormir', artista:'', src:'../musicas/dormir.mp3', img:'../imagens/download.jpeg'},
    {titulo:'Estudar', artista:'', src:'../musicas/estudar.mp3', img:'../imagens/imagem-relaxante-02.jpeg'},
    {titulo:'Ansiedade', artista:'', src:'../musicas/ansiedade.mp3', img:'../imagens/imagem-relaxante-03.jpeg'},
    {titulo:'Paz', artista:'', src:'../musicas/PAZ.mp3', img:'../imagens/lugar-calmo-otimo-pra.jpg'},
    {titulo:'Leveza', artista:'', src:'../musicas/Leveza dos sons.mp3', img:'../imagens/pirenopolis-cachoeira-abade.jpg'},
];

let musica = document.getElementById('audioPlayer');
let indexMusica = 0;
let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('#musicImage');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let tempoDecorrido = document.querySelector('.inicio');

// Eventos
var elem = document.getElementById('myBar');
var progress = document.getElementById('myProgress');
var isMobile = false;

// Verifica se é um dispositivo móvel
if (/Mobi/.test(navigator.userAgent)) {
    isMobile = true;
}

// Adiciona os eventos de clique ou toque dependendo do dispositivo
if (isMobile) {
    elem.addEventListener('touchstart', function (e) {
        var x = e.touches[0].pageX - this.getBoundingClientRect().left;
        adjustProgress(x);
    });
} 
else {
    elem.addEventListener('click', function (e) {
        var x = e.pageX - this.getBoundingClientRect().left;
        adjustProgress(x);
    });
}

function adjustProgress(x) {
    var clickedValue = (x / elem.offsetWidth) * 100;
    progress.style.width = clickedValue + '%';
    musica.currentTime = (musica.duration / 100) * clickedValue;
}

document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = musicas.length - 1; // Volte para a última música
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica >= musicas.length) {
        indexMusica = 0; // Volte para a primeira música
    }
    renderizarMusica(indexMusica);
});

// Funções
function renderizarMusica(index){
    musica.setAttribute('src', musicas[index].src);
    imagem.src = musicas[index].img;
    nomeMusica.textContent = musicas[index].titulo;
    nomeArtista.textContent = musicas[index].artista;
    musica.load();
    musica.addEventListener('loadeddata', () => {
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
    tempoDecorrido.textContent = '0:00';
}

function tocarMusica(){
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = (musica.currentTime / musica.duration) * 100 + '%';
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = Math.floor(segundos % 60);
    return minutos + ':' + (segundosRestantes < 10 ? '0' : '') + segundosRestantes;
}

// Abrir e fechar modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('myModal');
const closeModalButton = document.getElementById('closeModalButton');

galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        const musicIndex = item.getAttribute('data-music-index');
        indexMusica = musicIndex;
        renderizarMusica(indexMusica);
        modal.style.display = 'block';
    });
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
    pausarMusica();
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
        pausarMusica();
    }
});
