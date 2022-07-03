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

class Terminal {
    constructor() {
        this.status = 'startup';
        this.overlay = document.querySelector('.scanlines');
        this.input = document.querySelector('.input');
        this.lineInput = document.querySelector('.line-input');
        this.lineContainer = document.querySelector('.line-container');
        this.prefix = '>';
        //don't allow interaction when terminal is printing something
        this.takesAction = false;
        this.humPlaying = false;
    }

    async generateLine(text) {
        //Generate one line for the terminal
        let line = document.createElement('div');
        line.classList.add('line');
        this.lineContainer.appendChild(line);
        for (let i = 0; i < text.length; i++) {
            this.playClick();
            line.innerHTML += text[i];
            await this.sleep(50);
        }
    }
    addLine(text, isCommand) {
        let line = document.createElement('pre');
        line.classList.add('line');
        line.innerHTML = isCommand ? this.prefix : '';
        line.innerHTML += text;
        this.lineContainer.appendChild(line);
        return line;
    }
    onEnter() {
        this.input.style.opacity = '0';
        this.lineInput.classList.remove('line-input-before');
        this.addLine(this.input.value, true);
        this.input.value = '';
        this.generateLine('Hello!');
        this.input.style.opacity = '1';
        this.lineInput.classList.add('line-input-before');
    }
    cleanLineContainer() {
        document.querySelectorAll('.line').forEach((element) => {
            element.remove();
        });
    }

    async sleep(ms) {
        //Stop the program for a moment
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    playClick() {
        //Play the click sound
        let click_id = Math.floor(Math.random() * 5);
        clicks[click_id].play();
    }
    playBoop() {
        //Play boop at the end of the sequence
        sfx.boop.play();
    }
    finishSequence() {
        this.lineInput.classList.add('line-input-before');
        terminal.lineInput.style.opacity = '1';
    }
}

terminal = new Terminal();

terminal.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (terminal.takesAction) return;
        terminal.lineInput.classList.remove('line-input-before');
        terminal.lineInput.style.opacity = '0';
        switch (terminal.status) {
            case 'startup':
                terminal.takesAction = true;
                startSequence(terminal);
                break;
            case 'bootup':
                terminal.takesAction = true;
                bootUpSequence(terminal);
                break;
            default:
                terminal.onEnter();
                break;
        }
    }
});

terminal.overlay.addEventListener('click', () => {
    //Play computer hum when starting the program
    terminal.input.focus();
});
