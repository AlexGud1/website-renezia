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
                // Сбрасываем Лор при входе (возвращаем меню)
                resetLore();
            } else {
                panelHeader.innerText = "ДАННЫЕ НЕДОСТУПНЫ";
                panelSystem.classList.add('hidden');
                panelLore.classList.add('hidden');
            }
        });
    });

    // ==========================================
    // 3. ЛОГИКА ОТКРЫТИЯ ГЛАВ В РАЗДЕЛЕ "ЛОР"
    // ==========================================
    const chapterBtns = document.querySelectorAll('.chapter-btn');
    const loreMenu = document.getElementById('lore-chapters-menu');
    const loreContentArea = document.getElementById('lore-content-area');
    const backBtn = document.getElementById('back-to-chapters');
    const chapterTexts = document.querySelectorAll('.chapter-text');
    
    // Элементы правой панели для Лора
    const loreImage = document.getElementById('lore-image');
    const loreCaption = document.getElementById('lore-caption');

    // Данные для глав (Картинка и подпись в правой панели)
    const chapterData = {
        "ch1": { img: "placeholder1.png", caption: "Основание Renezia, 1991 год" },
        "ch2": { img: "placeholder2.png", caption: "Символ культа «Корень Затмения»" },
        "ch3": { img: "placeholder3.png", caption: "Бойцы Omicron-1 на задании" }
    };

    // Функция сброса Лора (возврат в меню)
    function resetLore() {
        loreMenu.classList.remove('hidden');
        loreContentArea.classList.add('hidden');
        // Возвращаем заглушку в правой панели
        loreImage.src = "placeholder.png";
        loreCaption.innerText = "Название главы или персонажа";
    }

    chapterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const chapterId = btn.getAttribute('data-chapter');
            
            // 1. Скрываем меню, показываем контент
            loreMenu.classList.add('hidden');
            loreContentArea.classList.remove('hidden');
            
            // 2. Прячем ВСЕ тексты глав
            chapterTexts.forEach(t => t.classList.add('hidden'));
            
            // 3. Показываем ТОЛЬКО нужный текст
            const targetChapter = document.getElementById(chapterId);
            if (targetChapter) {
                targetChapter.classList.remove('hidden');
            }

            // 4. Меняем картинку и подпись в правой панели
            if (chapterData[chapterId]) {
                loreImage.src = chapterData[chapterId].img;
                loreCaption.innerText = chapterData[chapterId].caption;
            }
        });
    });

    // Кнопка "Назад"
    if (backBtn) {
        backBtn.addEventListener('click', resetLore);
    }

    // ==========================================
    // 4. ЗАГРУЗКА ДАННЫХ ИЗ data.json
    // ==========================================
    // ... (остальной код для fetchData и имитации активности) ...
    // Скопируй его из прошлого сообщения, он не менялся
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

    const cpuLoadElement = document.getElementById('cpu-load');
    const pingElement = document.getElementById('ping-val');
    setInterval(() => {
        if (cpuLoadElement) cpuLoadElement.innerText = Math.floor(Math.random() * 40) + 5 + "%";
        if (pingElement) pingElement.innerText = Math.floor(Math.random() * 45) + 15 + "ms";
    }, 2000);
});