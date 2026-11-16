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
            title: "Глава 2: Разногласие",
            text: `
[ АРХИВНЫЙ ФАЙЛ №002 ]<br><br>
<strong>ДАТА СОБЫТИЙ:</strong> 2006 - 2021 гг.<br>
<strong>СТАТУС:</strong> РАССЕКРЕЧЕНО<br>
<strong>ИСТОЧНИК:</strong> Аналитический отдел "Omicron-1"<br>
<strong>УРОВЕНЬ ДОСТУПА:</strong> Омега<br>
<hr>
<strong>КРИЗИС И ОБРЕТЕНИЕ НЕЗАВИСИМОСТИ:</strong><br>
После распада Югославии Сербия оказалась на грани истощения из-за войны с албанцами за территорию Косово. Внутри армии начались конфликты между руководством. На фоне этого хаоса отдел "Omicron-1" отделяется от государственной структуры и становится независимой военной организацией под командованием Милоша Биковича. Организация начинает вести пропаганду среди населения для вербовки новых бойцов, однако восполнение боеприпасов становится непозволительно дорогим.<br><br>
<hr>
<strong>ЭКОНОМИЧЕСКИЙ КРИЗИС И ПЕРЕХОД НА САМООБЕСПЕЧЕНИЕ:</strong><br>
Сербская экономика терпит крах. "Omicron-1" выходит из-под управления правительства и переходит на самостоятельную программу. Организация выкупает права на винодельню. За счет прибыли от продажи алкоголя "Omicron-1" модифицирует вооружение и систему тренировок в своих рядах.<br><br>
<hr>
<strong>ПЕРИОД УПАДКА И ВСТРЕЧА С КУЛЬТОМ (10 ЛЕТ СПУСТЯ):</strong><br>
После серии провальных миссий, инициированных неизвестными заказчиками, "Omicron-1" попадает в сложную ситуацию. Приток новых людей прекращается, вооружение истощается, а винодельня перестает приносить прибыль. Деятельность организации приостанавливается на неопределенный срок. В этот период внутри "Omicron-1" начинаются реформы.<br><br>
Именно тогда происходит судьбоносная встреча с представителями культа «Корень Затмения» (Тринитарией). Культ предлагает "Omicron-1" финансовую поддержку и ресурсы в обмен на выполнение «сакральных» задач. Так появляется подставная компания **Renezia**, легальный фасад для теневых операций.<br><br>
<hr>
<strong>ТРАНСФОРМАЦИЯ В ТЕНЕВУЮ КОРПОРАЦИЮ:</strong><br>
В течение следующих 5 лет организация модифицирует вооружение и становится опасным противником для крупных корпораций с миллионными счетами. Бойцы "Omicron-1" начинают вести внутрисетевую войну. Благодаря экипировке, они осуществляют кражи денег со счетов банков и других предприятий. В винодельне появляется подполье, где изготовление спирта является лишь прикрытием для настоящего производства.<br><br>
`,
            img: "placeholder2.png",
            caption: "Досье №002: Сделка с Тринитарией"
        },
    const chapters = {
        "ch1": {
            // ... (оставляем Главу 1) ...
        },
        "ch2": {
            // ... (оставляем Главу 2) ...
        },
        "ch3": {
            title: "Глава 3: Наёмники",
            text: `
[ АРХИВНЫЙ ФАЙЛ №003 ]<br><br>
<strong>ДАТА СОБЫТИЙ:</strong> 2024 г.<br>
<strong>СТАТУС:</strong> СОВЕРШЕННО СЕКРЕТНО<br>
<strong>ИСТОЧНИК:</strong> Отдел внутренней безопасности<br>
<strong>УРОВЕНЬ ДОСТУПА:</strong> Омега<br>
<hr>
<strong>ПЕРЕХОД В НЕЛЕГАЛЬНУЮ ДЕЯТЕЛЬНОСТЬ:</strong><br>
15 октября 2024 года. После ряда событий организация "Omicron-1" претерпела метаморфозу, окончательно перейдя в сферу нелегальной деятельности. Период адаптации к новой сфере, не связанной с военной службой, сопровождался значительными неудачами из-за отсутствия опыта и применения неэффективных армейских тактик.<br><br>
<hr>
<strong>ИДЕОЛОГИЧЕСКИЙ КОНФЛИКТ В РУКОВОДСТВЕ:</strong><br>
Внутри структуры возникло существенное противостояние между двумя ключевыми фигурами руководства. Один из директоров, представитель "старой школы", придерживался принципов профессионализма и ориентировался на безусловное выполнение задач, игнорируя политику. Его подход базировался на кодексе чести.<br><br>
Второй директор, более молодой и амбициозный, рассматривал корпорацию как инструмент для достижения политических целей и влияния на геополитическую ситуацию. В целях предотвращения внутренних расколов высшее руководство приняло решение об отстранении молодого директора.<br><br>
<hr>
<strong>НОВОЕ РУКОВОДСТВО И ТЕХНОЛОГИИ:</strong><br>
После кадровых изменений непосредственное управление перешло к нынешнему лидеру — Алеху Гудовичу. Под его руководством были инициированы существенные изменения, направленные на интеграцию новых технологий в деятельность корпорации.<br><br>
<hr>
<strong>ПОДПОЛЬНОЕ ПРОИЗВОДСТВО:</strong><br>
Параллельно с внедрением технологий, "Omicron-1" начала активно развивать подпольное производство. Запущен выпуск психотропных веществ для специальных операций и нелегальной торговли. Также налажено производство высокоэффективных зажигательных составов и широкого спектра боеприпасов, что позволило увеличить прибыль на черном рынке вооружений.<br><br>
<hr>
<strong>НОВАЯ ЦЕЛЬ:</strong><br>
Корпорация вновь возобновляет набеги на виртуальные счета компаний. "Omicron-1" находит новую цель — комплекс в Сибири. По данным разведки, в данный проект перечисляются крупные дивиденды. Дальнейшая судьба и успех корпорации зависят от нового Генерального Директора и личного состава.<br><br>
<strong>ГРЯДУТ ВЕЛИКИЕ РЕФОРМЫ...</strong><br>
`,
            img: "placeholder3.png",
            caption: "Досье №003: Новая эра"
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