document.addEventListener("DOMContentLoaded", () => {
    const secretBtn = document.getElementById('secret-tab-btn');
    if (secretBtn) {
        secretBtn.classList.add('hidden');
    }
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
            } else if (targetId === 'secret') {
                panelHeader.innerText = "ЗАСЕКРЕЧЕНО";
                panelSystem.classList.add('hidden');
                panelLore.classList.add('hidden');
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

    // 4. ЗАГРУЗКА ДАННЫХ ИЗ GOOGLE APPS SCRIPT
    const treasuryElement = document.getElementById('treasury-val');
    const raidsElement = document.getElementById('raids-val');
    const onlineElement = document.getElementById('online-val');

    // ВСТАВЬТЕ СЮДА ВАШУ ССЫЛКУ ИЗ GOOGLE APPS SCRIPT (она начинается с https://script.google.com/macros/s/...)
    const API_URL = 'https://script.google.com/macros/s/AKfycbxVYcCgP4O5ouiJvTBrZs5DtAM3jDDrGef9qQM5YVRW4BiEYg8wdfRXx1a5Jb38Uxc/exec'; 

    async function fetchData() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Ошибка загрузки');
            const data = await response.json();

            // Форматируем число с пробелами (например, 1 250 000)
            if (treasuryElement) treasuryElement.innerText = data.treasury.toLocaleString('ru-RU');
            if (raidsElement) raidsElement.innerText = data.raids;
            if (onlineElement) onlineElement.innerText = data.online;
            
            console.log("[СИСТЕМА] Данные обновлены с Google Sheets:", data);
        } catch (error) {
            console.error("Не удалось загрузить данные с Google Apps Script:", error);
        }
    }
    fetchData();
    setInterval(fetchData, 60000); // Обновлять раз в минуту

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
                const fullCommand = terminalInput.value.trim(); // Сохраняем регистр для аргументов
                const command = fullCommand.toLowerCase();      // Для проверки самой команды
                const args = fullCommand.split(' ').slice(1);   // Аргументы (например, имя файла)

                terminalInput.value = ''; 
                systemLog.innerHTML += `<br>> ${fullCommand}`;

                if (command === 'help') {
                    systemLog.innerHTML += `<br>[СИСТЕМА] Доступные команды: help, scan, decrypt, whoami, ls, open [файл], sudo, clear, exit.`;
                } else if (command === 'scan') {
                    systemLog.innerHTML += `<br>[СЕТЬ] Сканирование портов... Обнаружено 3 открытых порта.`;
                } else if (command === 'decrypt') {
                    systemLog.innerHTML += `<br>[ОШИБКА] Недостаточно прав для расшифровки. Требуется ключ доступа.`;
                } else if (command === 'whoami') {
                    systemLog.innerHTML += `<br>[СИСТЕМА] Пользователь: Agent_077<br>[СИСТЕМА] Уровень допуска: <span class="highlight">Омега</span>`;
                } else if (command === 'ls') {
                    systemLog.innerHTML += `<br>[АРХИВ] Доступные файлы: dir1 (Генеральный Директор), dir2 (Amnesia), dir3 (Stardust).`;
                } else if (command.startsWith('open')) {
                    const targetFile = args[0] ? args[0].toLowerCase() : null;
                    if (targetFile === 'dir1' || targetFile === 'dir2' || targetFile === 'dir3') {
                        systemLog.innerHTML += `<br>[АРХИВ] Открытие файла ${targetFile}... Доступно во вкладке "АРХИВ СИНДИКАТА".`;
                        // Автоматически переключаем вкладку на архив
                        document.querySelector('[data-target="archive"]').click();
                        // И открываем нужное досье
                        setTimeout(() => {
                            const fileBtn = document.querySelector(`[data-archive="${targetFile}"]`);
                            if (fileBtn) fileBtn.click();
                        }, 100);
                    } else {
                        systemLog.innerHTML += `<br>[ОШИБКА] Файл не найден. Используйте "ls" для списка.`;
                    }
                } else if (command === 'sudo') {
                    systemLog.innerHTML += `<br>[ОШИБКА] Отказано в доступе. Попытка эскалации привилегий зарегистрирована.`;
                } else if (command === 'clear') {
                    systemLog.innerHTML = `> Подключение к терминалу "Anaconda"...<br>> Загрузка архивов корпорации "Renezia"...<br>> Доступ разрешен. Уровень допуска: <span class="highlight">Омега</span>.`;
                } else if (command === 'omicron') {
                    systemLog.innerHTML += `<br>[СИСТЕМА] Активация протокола "Омикрон"...<br>[ВНИМАНИЕ] Цветовая схема изменена.`;
                    document.body.style.filter = "hue-rotate(120deg)"; // Сдвиг цвета в красный/зеленый
                    setTimeout(() => { document.body.style.filter = "none"; }, 5000); // Возврат через 5 сек
                } else if (command === 'exit') {
                    systemLog.innerHTML += `<br>[СИСТЕМА] Выход из режима отладки...`;
                    terminalInputArea.classList.add('hidden'); 
                } else {
                    systemLog.innerHTML += `<br>[ОШИБКА] Неизвестная команда: ${fullCommand}`;
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
            document.getElementById('secret-tab-btn').classList.remove('hidden');
        }
    }
    // ==========================================
    // 8.5. МИНИ-ИГРА: ВЗЛОМ ПАРОЛЯ (В ТЕРМИНАЛЕ)
    // ==========================================
    let isHacking = false;
    let secretCode = [];
    let hackAttempts = 0;

    // Функция запуска игры
    window.startHackGame = function() {
        if (isHacking) {
            systemLog.innerHTML += `<br>[СИСТЕМА] Взлом уже запущен. Введите 4 цифры.`;
            return;
        }
        isHacking = true;
        hackAttempts = 0;
        // Генерируем 4 случайные цифры
        secretCode = [];
        for (let i = 0; i < 4; i++) {
            secretCode.push(Math.floor(Math.random() * 10));
        }
        systemLog.innerHTML += `<br><br>[ВЗЛОМ] Инициализация... Генерация ключа завершена.`;
        systemLog.innerHTML += `<br>[ВЗЛОМ] Введите 4-значный код (например: 1234). У вас 10 попыток.`;
        terminalInput.placeholder = "Введите 4 цифры...";
        terminalInput.focus();
        const contentDisplay = document.getElementById('display-screen');
        contentDisplay.scrollTop = contentDisplay.scrollHeight;
    };

    // Перехватываем ввод, если идет игра
    if (terminalInput) {
        terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && isHacking) {
                const guess = terminalInput.value.trim();
                terminalInput.value = '';
                
                if (!/^\d{4}$/.test(guess)) {
                    systemLog.innerHTML += `<br>> ${guess}<br>[ОШИБКА] Введите ровно 4 цифры.`;
                    return;
                }

                hackAttempts++;
                systemLog.innerHTML += `<br>> ${guess}`;

                const guessArr = guess.split('').map(Number);
                let exactMatches = 0; // На своем месте
                let colorMatches = 0; // Есть в коде, но не на месте

                const secretCopy = [...secretCode];
                const guessCopy = [...guessArr];

                // Считаем точные совпадения
                for (let i = 0; i < 4; i++) {
                    if (guessCopy[i] === secretCopy[i]) {
                        exactMatches++;
                        secretCopy[i] = null;
                        guessCopy[i] = null;
                    }
                }
                // Считаем совпадения по цвету
                for (let i = 0; i < 4; i++) {
                    if (guessCopy[i] !== null) {
                        const index = secretCopy.indexOf(guessCopy[i]);
                        if (index !== -1) {
                            colorMatches++;
                            secretCopy[index] = null;
                        }
                    }
                }

                if (exactMatches === 4) {
                    systemLog.innerHTML += `<br><span style="color:#27c93f">[УСПЕХ] Код взломан! Доступ к скрытым данным получен.</span>`;
                    // Разблокируем вкладку "Проект X"
                    document.getElementById('secret-tab-btn').classList.remove('hidden');
                    systemLog.innerHTML += `<br>[СИСТЕМА] Обнаружена новая вкладка в меню слева.`;
                    isHacking = false;
                    terminalInput.placeholder = "Введите команду (help)...";
                } else if (hackAttempts >= 10) {
                    systemLog.innerHTML += `<br><span style="color:#ff0000">[ПРОВАЛ] Превышено количество попыток. Система заблокирована.</span>`;
                    systemLog.innerHTML += `<br>[СИСТЕМА] Ключ сброшен. Попробуйте позже.`;
                    isHacking = false;
                    terminalInput.placeholder = "Введите команду (help)...";
                } else {
                    systemLog.innerHTML += `<br>[ВЗЛОМ] Точных совпадений: <span style="color:#27c93f">${exactMatches}</span>. Есть в коде, но не на месте: <span style="color:#ffbd2e">${colorMatches}</span>. Осталось попыток: ${10 - hackAttempts}`;
                }

                const contentDisplay = document.getElementById('display-screen');
                contentDisplay.scrollTop = contentDisplay.scrollHeight;
            }
        });
    }
    // ==========================================
    // 9. МУЗЫКАЛЬНЫЙ ПЛЕЕР (ПЛЕЙЛИСТ)
    // ==========================================
    const musicBtn = document.getElementById('music-toggle');
    const prevBtn = document.getElementById('prev-track');
    const nextBtn = document.getElementById('next-track');
    const trackName = document.getElementById('track-name');
    
    const playlist = [
        { src: 'music1.mp3', name: 'Working From Home' },
        { src: 'music2.mp3', name: 'Banger' },
        { src: 'music3.mp3', name: 'Белый Фосфор' }
    ];

    let currentTrackIndex = 0;
    let isMusicPlaying = false;
    
    const musicTrack = new Audio(); 
    musicTrack.volume = 0.3; // Громкость

    function loadTrack(index) {
        musicTrack.src = playlist[index].src;
        trackName.innerText = playlist[index].name;
    }

    if (trackName) loadTrack(currentTrackIndex);

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (!isMusicPlaying) {
                musicTrack.play().catch(e => console.log("Ошибка музыки:", e));
                musicBtn.innerText = "⏸";
                isMusicPlaying = true;
                trackName.style.color = "#27c93f";
            } else {
                musicTrack.pause();
                musicBtn.innerText = "▶";
                isMusicPlaying = false;
                trackName.style.color = "#ccc"; 
            }
        });
    }

    // Логика кнопки "Вперед"
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            loadTrack(currentTrackIndex);
            if (isMusicPlaying) {
                musicTrack.play().catch(e => {});
            }
        });
    }

    // Логика кнопки "Назад"
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrackIndex);
            if (isMusicPlaying) {
                musicTrack.play().catch(e => {});
            }
        });
    }

    // Автоматическое переключение на следующий трек, когда заканчивается текущий
    musicTrack.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        musicTrack.play().catch(e => {});
    });
});