const overlay = document.querySelector('.scanlines');
const input = document.querySelector('.input');
let isPLaying = false;

overlay.addEventListener('click', () => {
    input.focus();
    if (!isPLaying) {
        let sound = new Howl({
            src: ['audio/hum.mp3'],
        });
        sound.play();
    }
});