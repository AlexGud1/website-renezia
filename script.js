document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ПЕЧАТИ
    // ==========================================
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

    // ==========================================
    // 2. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК (ЛЕВОЕ МЕНЮ)
    // ==========================================
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
            } else {
                panelHeader.innerText = "ДАННЫЕ НЕДОСТУПНЫ";
                panelSystem.classList.add('hidden');
                panelLore.classList.add('hidden');
            }
        });
    });

    // ==========================================
    // 3. ЛОГИКА ГЛАВ (С ПРИНУДИТЕЛЬНОЙ ЗАМЕНОЙ КОНТЕНТА)
    // ==========================================
    const chapterBtns = document.querySelectorAll('.chapter-btn');
    const loreMenu = document.getElementById('lore-chapters-menu');
    const loreContentArea = document.getElementById('lore-content-area');
    const backBtn = document.getElementById('back-to-chapters');
    const loreTextContainer = document.getElementById('lore-text-container'); // Контейнер для текста

    const loreImage = document.getElementById('lore-image');
    const loreCaption = document.getElementById('lore-caption');

    // Тексты глав и картинки
    const chapters = {
        "ch1": {
            title: "Глава 1: Эхо прошлого",
            text: `
[ АРХИВНЫЙ ФАЙЛ №001 ]<br><br>
<strong>ДАТА СОБЫТИЙ:</strong> 1902 - 1918 гг.<br>
<strong>СТАТУС:</strong> РАССЕКРЕЧЕНО<br>
<strong>ИСТОЧНИК:</strong> Исторический отдел "Omicron-1"<br>
<strong>УРОВЕНЬ ДОСТУПА:</strong> Омега<br>
<hr>
<strong>ОПИСАНИЕ ОБЪЕКТА:</strong><br>
Подразделение "Omicron-1" было сформировано в 1902 году по секретному указу короля Александра I. Основной задачей отдела являлось создание элитного корпуса снайперов и разведчиков, оснащенных винтовками "Маузер 1899". В ряды подразделения отбирались исключительно студенты с выдающимися навыками стрельбы.<br><br>
<hr>
<strong>ИНЦИДЕНТ В САРАЕВО (1914 г.):</strong><br>
Под командованием офицера Драгутина Димитриевича, агенты "Omicron-1" были направлены на ликвидацию эрцгерцога Франца Фердинанда. 28 июня оперативники заняли позиции в декоративных кустах у входа в магазин. Выстрел, произведенный бойцом-студентом, стал детонатором для начала Первой Мировой войны.<br><br>
<strong>ПОСЛЕДСТВИЯ:</strong><br>
Данная операция привела к мобилизации сотен тысяч сербских солдат. "Omicron-1" перешел на режим "гибкой обороны", используя лесные массивы для сдерживания сил Антанты и Тройственного Союза. Благодаря тактическому превосходству отряда, государство избежало капитуляции.<br><br>
<hr>
<strong>ЗАКЛЮЧЕНИЕ:</strong><br>
После завершения конфликта, "Omicron-1" получил статус легендарного подразделения. Отдел был перевооружен и расширен. Его теневое влияние на Балканах сохранялось вплоть до 2000-х годов.
`,
            img: "placeholder1.png",
            caption: "Досье №001: Операция 'Сараево'"
        },
        "ch2": {
            title: "Глава 2: Корень Затмения",
            text: "Текст про культ, про Чадо, про то, как они нашли Renezia и заключили союз.",
            img: "placeholder2.png",
            caption: "Символ культа «Корень Затмения»"
        },
        "ch3": {
            title: "Глава 3: Omicron-1",
            text: "Текст про создание военного крыла, про отряды и их задачи.",
            img: "placeholder3.png",
            caption: "Бойцы Omicron-1 на задании"
        }
    };

    // Функция сброса (возврат в меню)
    function resetLore() {
        loreMenu.classList.remove('hidden');
        loreContentArea.classList.add('hidden');
        loreTextContainer.innerHTML = ""; // Очищаем текст
        loreImage.src = "placeholder.png";
        loreCaption.innerText = "Название главы или персонажа";
    }

    chapterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const chapterId = btn.getAttribute('data-chapter');
            const chapter = chapters[chapterId];

            if (!chapter) return;

            // 1. Скрываем меню, показываем контент
            loreMenu.classList.add('hidden');
            loreContentArea.classList.remove('hidden');
            
            // 2. Вставляем готовый HTML (без эффекта печати)
            loreTextContainer.innerHTML = `<h3>${chapter.title}</h3><div class="lore-text">${chapter.text}</div>`;

            // 3. Меняем картинку и подпись
            loreImage.src = chapter.img;
            loreCaption.innerText = chapter.caption;
        });
    });

    // Кнопка "Назад"
    if (backBtn) {
        backBtn.addEventListener('click', resetLore);
    }

    // ==========================================
    // 4. ЗАГРУЗКА ДАННЫХ ИЗ data.json
    // ==========================================
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

    // ==========================================
    // 5. ИМИТАЦИЯ АКТИВНОСТИ
    // ==========================================
    const cpuLoadElement = document.getElementById('cpu-load');
    const pingElement = document.getElementById('ping-val');
    setInterval(() => {
        if (cpuLoadElement) cpuLoadElement.innerText = Math.floor(Math.random() * 40) + 5 + "%";
        if (pingElement) pingElement.innerText = Math.floor(Math.random() * 45) + 15 + "ms";
    }, 2000);
});