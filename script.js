document.addEventListener("DOMContentLoaded", () => {
    // 0. ЭКРАН ЗАГРУЗКИ
    const loader = document.getElementById('loader');
    const progressFill = document.getElementById('progress-fill');
    const loaderStatus = document.getElementById('loader-status');
    
    const statusTexts = [
        "Инициализация ядра...",
        "Проверка целостности данных...",
        "Расшифровка архивов Renezia...",
        "Подключение к узлу Anaconda...",
        "Доступ разрешен."
    ];

    let progress = 0;
    let statusIndex = 0;

    const loadInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1;
        if (progressFill) progressFill.style.width = progress + "%";

        if (progress > 20 && statusIndex === 0) { statusIndex = 1; loaderStatus.innerText = statusTexts[1]; }
        if (progress > 50 && statusIndex === 1) { statusIndex = 2; loaderStatus.innerText = statusTexts[2]; }
        if (progress > 80 && statusIndex === 2) { statusIndex = 3; loaderStatus.innerText = statusTexts[3]; }
        if (progress >= 100 && statusIndex === 3) { 
            statusIndex = 4; 
            loaderStatus.innerText = statusTexts[4]; 
            loaderStatus.style.color = "#27c93f"; 
        }

        if (progress >= 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 500);
            }, 500);
        }
    }, 50);

    // 1. ФУНКЦИЯ ПЕЧАТИ
    function typeWriter(element, text, speed, callback) {
        element.innerHTML = ""; 
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    // 2. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
    const buttons = document.querySelectorAll('.menu-btn');
    const contents = document.querySelectorAll('.display-content');
    const panelHeader = document.getElementById('panel-header');
    const panelSystem = document.getElementById('panel-system');
    const panelLore = document.getElementById('panel-lore');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            const targetId = button.getAttribute('data-target');
            
            contents.forEach(c => c.classList.add('hidden'));
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.remove('hidden');

            if (targetId === 'intro') {
                panelHeader.innerText = "СТАТУС СИСТЕМЫ";
                panelSystem.classList.remove('hidden');
                panelLore.classList.add('hidden');
            } else if (targetId === 'lore') {
                panelHeader.innerText = "АРХИВНЫЕ ДАННЫЕ";
                panelSystem.classList.add('hidden');
                panelLore.classList.remove('hidden');
                resetLore();
            } else {
                panelHeader.innerText = "ДАННЫЕ НЕДОСТУПНЫ";
                panelSystem.classList.add('hidden');
                panelLore.classList.add('hidden');
            }
        });
    });

    // 3. ЛОГИКА ГЛАВ
    const chapterBtns = document.querySelectorAll('.chapter-btn');
    const loreMenu = document.getElementById('lore-chapters-menu');
    const loreContentArea = document.getElementById('lore-content-area');
    const backBtn = document.getElementById('back-to-chapters');
    const loreTextContainer = document.getElementById('lore-text-container');
    const loreImage = document.getElementById('lore-image');
    const loreCaption = document.getElementById('lore-caption');

    const chapters = {
        "ch1": {
            title: "Глава 1: Эхо прошлого",
            text: `[ АРХИВНЫЙ ФАЙЛ №001 ]<br><br><strong>ДАТА СОБЫТИЙ:</strong> 1902 - 1918 гг.<br><strong>СТАТУС:</strong> РАССЕКРЕЧЕНО<br>... (текст главы 1) ...`,
            img: "placeholder1.png",
            caption: "Досье №001: Операция 'Сараево'"
        },
        "ch2": {
            title: "Глава 2: Разногласие",
            text: `[ АРХИВНЫЙ ФАЙЛ №002 ]<br><br><strong>ДАТА СОБЫТИЙ:</strong> 2006 - 2021 гг.<br>... (текст главы 2) ...`,
            img: "placeholder2.png",
            caption: "Досье №002: Сделка с Тринитарией"
        },
        "ch3": {
            title: "Глава 3: Наёмники",
            text: `[ АРХИВНЫЙ ФАЙЛ №003 ]<br><br><strong>ДАТА СОБЫТИЙ:</strong> 2024 г.<br>... (текст главы 3) ...`,
            img: "placeholder3.png",
            caption: "Досье №003: Новая эра"
        }
    };

    function resetLore() {
        loreMenu.classList.remove('hidden');
        loreContentArea.classList.add('hidden');
        loreTextContainer.innerHTML = ""; 
        loreImage.src = "placeholder.png";
        loreCaption.innerText = "Название главы или персонажа";
    }

    chapterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const chapterId = btn.getAttribute('data-chapter');
            const chapter = chapters[chapterId];
            if (!chapter) return;
            loreMenu.classList.add('hidden');
            loreContentArea.classList.remove('hidden');
            loreTextContainer.innerHTML = `<h3>${chapter.title}</h3><div class="lore-text">${chapter.text}</div>`;
            loreImage.src = chapter.img;
            loreCaption.innerText = chapter.caption;
        });
    });

    if (backBtn) backBtn.addEventListener('click', resetLore);

    // 4. ЗАГРУЗКА ДАННЫХ ИЗ data.json
    const treasuryElement = document.getElementById('treasury-val');
    const raidsElement = document.getElementById('raids-val');
    const onlineElement = document.getElementById('online-val');

    async function fetchData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Ошибка загрузки');
            const data = await response.json();
            if (treasuryElement) treasuryElement.innerText = data.treasury;
            if (raidsElement) raidsElement.innerText = data.raids;
            if (onlineElement) onlineElement.innerText = data.online;
        } catch (error) {
            console.error("Не удалось загрузить данные:", error);
        }
    }
    fetchData();
    setInterval(fetchData, 60000); 

    // 5. ИМИТАЦИЯ АКТИВНОСТИ
    const cpuLoadElement = document.getElementById('cpu-load');
    const pingElement = document.getElementById('ping-val');
    setInterval(() => {
        if (cpuLoadElement) cpuLoadElement.innerText = Math.floor(Math.random() * 40) + 5 + "%";
        if (pingElement) pingElement.innerText = Math.floor(Math.random() * 45) + 15 + "ms";
    }, 2000);

    // 6. СИСТЕМА ЗВУКА
    const soundBtn = document.getElementById('sound-toggle');
    const ambientSound = new Audio('ambient.mp3'); 
    ambientSound.loop = true; 
    ambientSound.volume = 0.15; 
    const clickSound = new Audio('click.mp3');
    clickSound.volume = 0.4;
    const randomSounds = [
        new Audio('glitch.mp3'),
        new Audio('beep.mp3'),
        new Audio('static.mp3')
    ];
    randomSounds.forEach(snd => snd.volume = 0.3);

    let isSoundOn = false;
    let randomSoundTimer = null;

    function playRandomSound() {
        if (!isSoundOn) return;
        const randomIndex = Math.floor(Math.random() * randomSounds.length);
        const sound = randomSounds[randomIndex];
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Ошибка случайного звука:", e));
        const nextDelay = Math.random() * 10000 + 5000; 
        randomSoundTimer = setTimeout(playRandomSound, nextDelay);
    }

    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            if (!isSoundOn) {
                ambientSound.play().catch(e => console.log("Ошибка аудио:", e));
                soundBtn.innerText = "🔊 ВЫКЛЮЧИТЬ ЗВУК";
                soundBtn.style.color = "#27c93f"; 
                isSoundOn = true;
                randomSoundTimer = setTimeout(playRandomSound, 3000);
            } else {
                ambientSound.pause();
                soundBtn.innerText = "🔇 ВКЛЮЧИТЬ ЗВУК";
                soundBtn.style.color = "#a855f7"; 
                isSoundOn = false;
                if (randomSoundTimer) {
                    clearTimeout(randomSoundTimer);
                    randomSoundTimer = null;
                }
            }
        });
    }

    document.querySelectorAll('button, .chapter-btn, .menu-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSoundOn) {
                clickSound.currentTime = 0; 
                clickSound.play().catch(e => {}); 
            }
        });
    });

    // 7. МИНИ-ИГРА: ТЕРМИНАЛЬНЫЙ КВЕСТ
    const terminalInputArea = document.getElementById('terminal-input-area');
    const terminalInput = document.getElementById('terminal-input');
    const systemLog = document.getElementById('system-log-container'); 

    if (terminalInputArea) terminalInputArea.classList.remove('hidden');

    if (terminalInput) {
        terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                terminalInput.value = ''; 
                systemLog.innerHTML += `<br>> ${command}`;

                if (command === 'help') {
                    systemLog.innerHTML += `<br>[СИСТЕМА] Доступные команды: help, scan, decrypt, exit.`;
                } else if (command === 'scan') {
                    systemLog.innerHTML += `<br>[СЕТЬ] Сканирование портов... Обнаружено 3 открытых порта.`;
                } else if (command === 'decrypt') {
                    systemLog.innerHTML += `<br>[ОШИБКА] Недостаточно прав для расшифровки. Требуется ключ доступа.`;
                } else if (command === 'exit') {
                    systemLog.innerHTML += `<br>[СИСТЕМА] Выход из режима отладки...`;
                    terminalInputArea.classList.add('hidden'); 
                } else {
                    systemLog.innerHTML += `<br>[ОШИБКА] Неизвестная команда: ${command}`;
                }

                const contentDisplay = document.getElementById('display-screen');
                contentDisplay.scrollTop = contentDisplay.scrollHeight;
            }
        });
    }

});