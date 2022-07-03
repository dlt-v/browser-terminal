const overlay = document.querySelector('.scanlines');
const input = document.querySelector('.input');
let isPLaying = false;
let audio = new Audio('audio/hum.mp3');
overlay.addEventListener('click', () => {
    input.focus();
    if (!isPLaying) {
        audio.play();
    }
});
