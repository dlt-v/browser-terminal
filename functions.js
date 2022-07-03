const clearTerminal = (list) => {
    console.log('Clear terminal.');
};

const startSequence = async (terminal) => {
    terminal.status = 'bootup';
    const st_seq = [
        'Turning on main peripheral power supply A',
        'Turning on main peripheral power supply B',
        'Detecting HDD Primary Master',
        'Detecting HDD Primary Slave',
        'Detecting HDD Secondary Master',
        'Detecting HDD Secondary Slave',
    ];
    terminal.cleanLineContainer();
    terminal.input.value = '';
    for (let i = 0; i < st_seq.length; i++) {
        let line = terminal.addLine(st_seq[i]);
        terminal.playClick();
        switch (st_seq[i]) {
            case 'Detecting HDD Primary Master':
                await terminal.sleep(50);
                line.innerHTML += '...\t\t\t';
                await terminal.sleep(150);
                line.innerHTML += 'WV32543A (2.54TB)';

                break;
            case 'Detecting HDD Primary Slave':
                await terminal.sleep(50);
                line.innerHTML += '...\t\t\t';
                await terminal.sleep(300);
                line.innerHTML += 'HL-DT-ST GCE-8525B';
                break;
            case 'Detecting HDD Secondary Master':
            case 'Detecting HDD Secondary Slave':
                await terminal.sleep(50);
                line.innerHTML += '...\t\t';
                await terminal.sleep(500);
                line.innerHTML += 'None';
                break;

            default:
                await terminal.sleep(50);
                line.innerHTML += '...\t';
                await terminal.sleep(500);
                line.innerHTML += 'Done';
                break;
        }
        terminal.playClick();
        await terminal.sleep(100);
    }
    terminal.addLine('Press [ENTER] to start bootup sequence...');
    terminal.takesAction = false;
    terminal.playBoop();
    terminal.finishSequence();
};

const bootUpSequence = async (terminal) => {
    const seq0 = [
        'LG G3, An Energy Star Ally.',
        'Copyright (C) 1958-2015, LG Electronics Inc.',
        '',
        'Krait 400 CPU at 2500 MHz, 4 Processor(s)',
        'Memory Test : 0K',
        '',
        'Android Plug and Play ROM Extension v5.0.2',
        'Copyright (C) 2015, Google Inc.',
        'Detecting Flash ROM',
        'Detecting Flash Extension',
        'Detecting Phone Storage',
    ];
    const seq1 = [
        'PCI device listing.....',
        'Bus  Device   Device ID   Device Class',
        '=============================================',
        '0    37       24C2        IEEE 802.11 Networking Controller',
        '0    23       24C4        EEE 802.15.1 WPAN Controller',
        '0    22       24C7        Dispay Controller',
        '0    21       24C8        A-GPS Receiver Device',
        '1    8        4E44        Multi-Axis Accelerometer',
        '1    4        5F33        Proximity Sensor',
        '1    3        5F34        Ambient Light Sensor',
        '1    2        5F55        Digital Compass',
    ];
    let seq2 = [];
    for (let i = 0; i < 20; i++) {
        seq2.push(
            `${rInt()}${rInt()}${rInt()}${rInt()}   ${rInt()}${rInt()}${rInt()}${rInt()}   ${rInt()}${rInt()}${rInt()}${rInt()}`
        );
    }
    const seq3 = [
        "MMMMMMMMMMMN0xl:'..... ....,cokXWMMMMMMM Welcome to XXXXX",
        "MMMMMMMMWKd,.    .;;,;cc:,'.   .:kNMMMMM OS Name: Microsoft Windows 10 Pro",
        "MMMMMMMNd'  .:dkOXWWWWMMWWN0xo;.  ;kWMMM OS Version: 10.0.19004 N/A build 19044",
        'MMMMMMKc  .oKWMMMMMMMMMMMMMMMMN0c. .dNMM Product ID: 24245-32422-11125-23424',
        'MMMMMX:  :0WMMMMMMMMMMMMMMMMMMMMNo. .dWM System Model: To be Filled by O.E.M.',
        'MMMMWo  .OMMMMMMMMMMMMMMMMMMMMMMMK;  ,0M',
        "MMMM0'   :0MMMMMMMMMMMMMMMMMMMMMMMO. .kM",
        "MMMMk.    'okO0XWMMMMMMMMMMMMMMMMMK, .xM System Directory: C:\\Windows",
        "MMMWx.        .:KMMMMMMMMMMMMMMMMKc  '0M Boot Device: \\Device\\HarddiskVolume1",
        "MMNd.           'ldk0XWMMMMMMMMWXc   oNM System Locale: eng;English",
        "MXl.                .'kWMMMMMXo:'   lXMM Total Physical Memory: 16,313 MB",
        "M0;.                  '0Kookd,    .dNMMM Available Physical Memory: 8,792 MB",
        "MWNx.                  ',       .c0WMMMM",
        'MMMK,                          .oNMMMMMM',
        'MMMWx.                         ;KMMMMMMM',
        'MMMWx.                         cNMMMMMMM',
        "MMMWk'    ..                   cNMMMMMMM",
        'MMMMWXOkkO00o.                 ,KMMMMMMM',
        'MMMMMMMMMMMMK,                  lNMMMMMM',
        'MMMMMMMMMMMMNl..................;0MMMMMM',
    ];

    terminal.status = 'ready';
    terminal.cleanLineContainer();
    await terminal.sleep(2000);
    terminal.input.value = '';
    if (!terminal.humPlaying) {
        let bootUpSound = new Howl({
            src: ['audio/bootup.mp3'],
            volume: 0.1,
            onend: () => {
                let sound = new Howl({
                    src: ['audio/bootup2.mp3'],
                    volume: 1,
                });
                sound.play();
                sound = new Howl({
                    src: ['audio/computer_hum.mp3'],
                    loop: true,
                });
                sound.play();
            },
        });
        bootUpSound.play();
        isPLaying = true;
    }
    for (let i = 0; i < seq0.length; i++) {
        terminal.playClick();
        let mem_line = terminal.addLine(seq0[i]);
        switch (seq0[i]) {
            case 'Memory Test : 0K':
                for (let i = 0; i < 25; i++) {
                    mem_line.innerHTML = `Memory Test : ${2 ** i}K`;
                    await terminal.sleep(100);
                }
                break;
            case 'Detecting Flash ROM':
                mem_line.innerHTML += `...`;
                await terminal.sleep(500);
                terminal.playClick();
                mem_line.innerHTML += ` CyanogenMod 12`;
                break;
            case 'Detecting Flash Extension':
                mem_line.innerHTML += `...`;
                await terminal.sleep(500);
                terminal.playClick();
                mem_line.innerHTML += ` Generic microSD`;
                break;
            case 'Detecting Phone Storage':
                mem_line.innerHTML += `...`;
                await terminal.sleep(500);
                terminal.playClick();
                mem_line.innerHTML += ` Generic SIM Card`;
                break;
            default:
                break;
        }
        await terminal.sleep(100);
    }
    terminal.cleanLineContainer();
    terminal.input.value = '';
    for (let i = 0; i < seq1.length; i++) {
        terminal.playClick();
        terminal.addLine(seq1[i]);
        await terminal.sleep(100);
    }
    await terminal.sleep(300);
    terminal.cleanLineContainer();

    for (let i = 0; i < seq2.length; i++) {
        terminal.addLine(seq2[i]);
        await terminal.sleep(100);
    }
    terminal.addLine('Initialization Finished......');
    terminal.playClick();
    await terminal.sleep(100);
    let loadLine = terminal.addLine('Activating root access');
    const loadAnims = ['|', '/', '-', '\\', '|', '/', '-', '\\'];
    for (let i = 0; i < 10; i++) {
        const animIndex = i % loadAnims.length;
        loadLine.innerHTML = `Activating root access...... ${loadAnims[animIndex]}`;
        await terminal.sleep(150);
    }
    loadLine.innerHTML = `Activating root access...... SUCCESS!`;
    await terminal.sleep(300);
    terminal.cleanLineContainer();

    for (let i = 0; i < seq3.length; i++) {
        terminal.playClick();
        terminal.addLine(seq3[i]);
        await terminal.sleep(50);
    }
    await terminal.sleep(150);
    terminal.addLine('Primary boot successful, ready for command...');
    terminal.takesAction = false;
    terminal.playBoop();
    terminal.finishSequence();
};
const rInt = () => {
    return Math.floor(Math.random() * 9);
};
