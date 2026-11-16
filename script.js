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
            text: "История Корпорации «Omicron-1» начинается не с момента её основания, а с того дня, когда одна пуля изменила ход мировой истории.\n\nСербия, 1902 год. В расположение армейской части Белграда приходит секретный приказ от короля Александра I. Цель — создание элитного разведывательного подразделения, владеющего искусством дальней стрельбы. На вооружение отдела поступают передовые по тем временам винтовки «Маузер 1899». В ряды «Omicron-1» отбирали только лучших: студентов, снайперов и разведчиков. Они не просто служили — они были становым хребтом сербской армии, её самой тихой и смертоносной элитой.\n\n1914 год. Под командованием офицера Драгутина Димитриевича «Omicron-1» ввязываются в опасную авантюру по устранению эрцгерцога Франца Фердинанда, законного наследника Австро-Венгрии. 28 июня бойцы занимают позиции у входа в магазин, скрываясь в декоративных кустах. Когда карета эрцгерцога проезжала мимо, один из стрелков — тогда ещё студент — произвёл роковой выстрел. Эхо «Маузера» разорвало тишину, оборвав жизнь Франца Фердинанда и запустив цепную реакцию, которая ввергла мир в пучину Первой Мировой войны.\n\nПоследствия были катастрофическими. Австро-Венгрия объявила Сербии войну, и в конфликт мгновенно втянулись великие державы. Первая Мировая забрала сотни тысяч сербских солдат. Дивизии и отделы были обескровлены. «Omicron-1» получил приказ о гибкой обороне границ. Бойцы ушли в леса и горы, используя маскировку и снайперские навыки, чтобы сдерживать превосходящие силы врага. Именно они, растворяясь в тени, не позволили Сербии капитулировать.\n\nПосле окончания войны Сербия вышла победительницей, расширив свои территории и заложив основу будущей Югославии. Для «Omicron-1» это стало моментом триумфа. Подразделение пережило перевооружение и пополнение. Оно превратилось в легенду, окутанную славой и кровью. Тень «Omicron-1» будет нависать над Балканами впредь до 2000-х годов.",
            img: "placeholder1.png",
            caption: "Основание Omicron-1, 1902 год"
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
            
            // 2. Очищаем контейнер и вставляем заголовок
            loreTextContainer.innerHTML = `<h3>${chapter.title}</h3>`;
            
            // 3. Создаем параграф для текста и запускаем печать
            const p = document.createElement('p');
            loreTextContainer.appendChild(p);
            typeWriter(p, chapter.text, 20); // Печать текста

            // 4. Меняем картинку и подпись
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