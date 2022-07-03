const overlay = document.querySelector('.scanlines');
const input = document.querySelector('.input');
const lineInput = document.querySelector('.line-input');
const lineContainer = document.querySelector('.line-container');
let isPLaying = false;
const sfx = {
    click: new Howl({
        src: ['audio/click.mp3'],
        volume: 0.5,
    }),
    click2: new Howl({
        src: ['audio/click2.mp3'],
        volume: 0.5,
    }),
    click3: new Howl({
        src: ['audio/click3.mp3'],
        volume: 0.5,
    }),
    click4: new Howl({
        src: ['audio/click4.mp3'],
        volume: 0.5,
    }),
    click5: new Howl({
        src: ['audio/click5.mp3'],
        volume: 0.5,
    }),
    boop: new Howl({
        src: ['audio/boop.mp3'],
        volume: 0.5,
    }),
};

const clicks = [sfx.click, sfx.click2, sfx.click3, sfx.click4, sfx.click5];
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        console.log('enter');
        generateText(input.value, sampleText);
        input.value = '';
    }
});

overlay.addEventListener('click', () => {
    input.focus();
    if (!isPLaying) {
        let sound = new Howl({
            src: ['audio/computer_hum.mp3'],
        });
        sound.play();
        sound.fade(0.0, 0.8, 1000);
        sound.loop(true);
        isPLaying = true;
    }
});
const sampleText =
    'Nulla facilisi. Vivamus ultrices in eros et rhoncus. Aenean odio nulla, hendrerit id molestie quis, tempus sed leo. Donec pellentesque eget odio in maximus. Donec tristique hendrerit lobortis. Nullam porttitor turpis et mi fermentum facilisis. Etiam et orci non risus rhoncus lobortis in eget dolor. Duis sit amet massa vel quam dapibus pulvinar sed et dolor. Quisque luctus neque ac enim elementum ornare. Integer aliquam aliquet facilisis.';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const generateText = (inputValue, text) => {
    //print current command
    let line = document.createElement('div');
    line.classList.add('line');
    line.innerText = `G:\\dev>${inputValue}`;
    lineContainer.appendChild(line);

    //add new html element
    line = document.createElement('div');
    line.classList.add('line');
    let lineText = 'General Kenobi!';
    lineContainer.appendChild(line);
    lineByLine(line, lineText);
};
const lineByLine = async (element, text) => {
    input.style.opacity = '0';
    lineInput.classList.remove('line-input-before');
    for (let i = 0; i < text.length; i++) {
        click_id = Math.floor(Math.random() * 5);
        clicks[click_id].play();
        element.innerHTML += text[i];
        await sleep(50);
    }
    sfx.boop.play();
    input.style.opacity = '1';
    lineInput.classList.add('line-input-before');
};
