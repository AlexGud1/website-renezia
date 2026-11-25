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

            // Логика правой панели
            if (targetId === 'intro') {
                panelHeader.innerText = "СТАТУС СИСТЕМЫ";
                panelSystem.classList.remove('hidden');
                panelLore.classList.add('hidden');
            } else if (targetId === 'lore') {
                panelHeader.innerText = "АРХИВНЫЕ ДАННЫЕ";
                panelSystem.classList.add('hidden');
                panelLore.classList.remove('hidden');
                resetLore(); // Сбрасываем лор при входе
            } else if (targetId === 'archive') {
                panelHeader.innerText = "АРХИВНЫЕ ДАННЫЕ";
                panelSystem.classList.add('hidden');
                panelLore.classList.remove('hidden');
                // Сбрасываем архив при входе
                archiveMenu.classList.remove('hidden');
                archiveContentArea.classList.add('hidden');
                loreImage.src = "placeholder.png";
                loreCaption.innerText = "Название главы или персонажа";
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

    // ==========================================
    // 3.5. ЛОГИКА АРХИВА СИНДИКАТА
    // ==========================================
    const archiveBtns = document.querySelectorAll('[data-archive]');
    const archiveMenu = document.getElementById('archive-files-menu');
    const archiveContentArea = document.getElementById('archive-content-area');
    const backToArchiveBtn = document.getElementById('back-to-archive');
    const archiveTextContainer = document.getElementById('archive-text-container');
    
    // Данные для архива (Досье)
    const archiveData = {
        "dir1": {
            title: "ДОСЬЕ: ГЕНЕРАЛЬНЫЙ ДИРЕКТОР",
            text: "Имя: [Скрыто]<br>Статус: Высшее руководство<br>Уровень допуска: Омега<br>Описание: Лидер корпорации, отвечающий за стратегическое развитие и связь с Тринитарией. Держит в тайне истинные цели 'Корня Затмения'.",
            img: "placeholder1.png", // Потом заменишь на фото
            caption: "Фото: Недоступно"
        },
        "dir2": {
            title: "ДОСЬЕ: ЛИДЕР ОТРЯДА 'AMNESIA'",
            text: "Имя: [Скрыто]<br>Отряд: Amnesia<br>Специализация: Мелкие кражи, сбор ресурсов, разведка начального уровня.<br>Описание: Командир отряда новичков. Отвечает за обучение и первичную подготовку личного состава.",
            img: "placeholder2.png",
            caption: "Фото: Засекречено"
        },
        "dir3": {
            title: "ДОСЬЕ: ЛИДЕР ОТРЯДА 'STARDUST'",
            text: "Имя: [Скрыто]<br>Отряд: Stardust<br>Специализация: Скрытые финансовые рейды, похищение людей, заморозка транзакций.<br>Описание: Командир сбалансированного отряда. Подчиняется напрямую Директору Операций.",
            img: "placeholder3.png",
            caption: "Фото: Засекречено"
        }
    };

    archiveBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const archiveId = btn.getAttribute('data-archive');
            const data = archiveData[archiveId];
            if (!data) return;

            archiveMenu.classList.add('hidden');
            archiveContentArea.classList.remove('hidden');
            
            archiveTextContainer.innerHTML = `<h3>${data.title}</h3><div class="lore-text">${data.text}</div>`;
            
            // Показываем картинку в правой панели (используем ту же панель, что и для Лора)
            loreImage.src = data.img;
            loreCaption.innerText = data.caption;
            
            // Меняем заголовок правой панели
            panelHeader.innerText = "АРХИВНЫЕ ДАННЫЕ";
            panelSystem.classList.add('hidden');
            panelLore.classList.remove('hidden');
        });
    });

    if (backToArchiveBtn) {
        backToArchiveBtn.addEventListener('click', () => {
            archiveMenu.classList.remove('hidden');
            archiveContentArea.classList.add('hidden');
            archiveTextContainer.innerHTML = "";
            loreImage.src = "placeholder.png";
            loreCaption.innerText = "Название главы или персонажа";
        });
    }

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

    // ==========================================
    // 8. МИНИ-ИГРА: САПЕР (ЧИСТЫЙ СЕКТОР)
    // ==========================================
    const startMinesBtn = document.getElementById('start-mines-btn');
    const minesGameArea = document.getElementById('mines-game-area');
    const minesGrid = document.getElementById('mines-grid');
    const minesStatus = document.getElementById('mines-status');

    const GRID_SIZE = 5; // Сетка 5x5
    const MINES_COUNT = 5; // Количество мин

    let minesArray = [];
    let isGameOver = false;

    if (startMinesBtn) {
        startMinesBtn.addEventListener('click', () => {
            startMinesBtn.classList.add('hidden');
            minesGameArea.classList.remove('hidden');
            initMinesGame();
        });
    }

    function initMinesGame() {
        minesGrid.innerHTML = '';
        minesArray = [];
        isGameOver = false;
        minesStatus.innerText = "Статус: Поиск угроз...";
        minesStatus.style.color = "#a855f7";

        // Создаем пустую сетку
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            const cell = document.createElement('div');
            cell.classList.add('mine-cell');
            cell.dataset.index = i;
            cell.addEventListener('click', () => revealCell(i));
            minesGrid.appendChild(cell);
            minesArray.push({ hasMine: false, revealed: false });
        }

        // Расставляем мины случайным образом
        let minesPlaced = 0;
        while (minesPlaced < MINES_COUNT) {
            const randIndex = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
            if (!minesArray[randIndex].hasMine) {
                minesArray[randIndex].hasMine = true;
                minesPlaced++;
            }
        }
    }

    function revealCell(index) {
        if (isGameOver || minesArray[index].revealed) return;

        const cellElement = minesGrid.children[index];
        minesArray[index].revealed = true;
        cellElement.classList.add('revealed');

        if (minesArray[index].hasMine) {
            // Попали на мину
            cellElement.classList.add('exploded');
            cellElement.innerText = '💀';
            minesStatus.innerText = "СБОЙ СИСТЕМЫ: Обнаружен вирус!";
            minesStatus.style.color = "#ff0000";
            isGameOver = true;
            // Показываем все мины
            minesArray.forEach((cell, i) => {
                if (cell.hasMine && !cell.revealed) {
                    minesGrid.children[i].classList.add('revealed');
                    minesGrid.children[i].innerText = '☣️';
                    minesGrid.children[i].style.color = '#ff5f56';
                }
            });
        } else {
            // Безопасная клетка - считаем мины вокруг
            let count = 0;
            const row = Math.floor(index / GRID_SIZE);
            const col = index % GRID_SIZE;

            for (let r = row - 1; r <= row + 1; r++) {
                for (let c = col - 1; c <= col + 1; c++) {
                    if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
                        const neighborIndex = r * GRID_SIZE + c;
                        if (minesArray[neighborIndex].hasMine) count++;
                    }
                }
            }

            if (count > 0) {
                cellElement.innerText = count;
                cellElement.style.color = count === 1 ? '#27c93f' : count === 2 ? '#ffbd2e' : '#ff5f56';
            }

            checkWin();
        }
    }

    function checkWin() {
        let safeCellsRevealed = 0;
        minesArray.forEach(cell => {
            if (!cell.hasMine && cell.revealed) safeCellsRevealed++;
        });

        if (safeCellsRevealed === (GRID_SIZE * GRID_SIZE) - MINES_COUNT) {
            minesStatus.innerText = "СЕКТОР ОЧИЩЕН: Доступ к данным открыт!";
            minesStatus.style.color = "#27c93f";
            isGameOver = true;
        }
    }
});