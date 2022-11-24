let songIndex = 0;

const audio = document.querySelector('.audio'),
    song = document.querySelector('.song'),
    imgSrc = document.querySelector('.imgSrc'),
    playlist = document.querySelector('.playlist'),
    prevBtn = document.querySelector('.prevBtn'),
    playBtn = document.querySelector('.playBtn'),
    nextBtn = document.querySelector('.nextBtn');

audio.crossOrigin="anonymous";

const songs = ['Pixies - Where Is My Mind', 'Lisa Gerrard - Now We Are Free', 'The Stranglers - Golden Brown']

function init() {
    song.innerHTML = songs[songIndex];
    audio.src = 'audio/' + songs[songIndex] + '.mp3';
}

function playAudio() {
    if(!context) {
        preparation();
    }
    playlist.classList.add('active');
    audio.play();
    loop();
}

function pauseAudio() {
    playlist.classList.remove('active');
    audio.pause();
}

function prevAudio() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    init();
    nextPrevPlay();
}

function nextPrevPlay() {
    const isPlaying = playlist.classList.contains('active');
    if (isPlaying) {
        playAudio();
    }
}

function nextAudio() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    init();
    nextPrevPlay();
}

playBtn.addEventListener('click', () => {
    const isPlaying = playlist.classList.contains('active');
    if (isPlaying) {
        pauseAudio();
        imgSrc.src = `icons/play.png`;
    } else {
        playAudio();
        imgSrc.src = `icons/pause.png`;
    }
})

prevBtn.addEventListener('click', () => {
    prevAudio();
})

nextBtn.addEventListener('click', () => {
    nextAudio();
})

let context, analyser, src, array, logo;

logo = document.getElementById("logo").style;

function preparation(){
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
}

function loop(){
    if(!audio.paused){
        window.requestAnimationFrame(loop);
    }
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    logo.minHeight = (array[40])+"px";
    logo.width =  (array[40])+"px";
}