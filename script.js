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
    // 2. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
    // ==========================================
    const buttons = document.querySelectorAll('.menu-btn');
    const contents = document.querySelectorAll('.display-content');
    
    const panelHeader = document.getElementById('panel-header');
    const panelSystem = document.getElementById('panel-system');
    const panelLore = document.getElementById('panel-lore');

    const categoryTexts = {
        "lore": "Информация о корпорации Renezia, культе «Корень Затмения» и их истинных целях.",
        "hierarchy": "Структура управления: от рядового бойца до Генерального Директора.",
        "rules": "Базовые протоколы, субординация и наказания за нарушения.",
        "grimoire": "Секретные знания культа. Доступ только для прошедших ритуал."
    };

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
            } else {
                panelHeader.innerText = "ДАННЫЕ НЕДОСТУПНЫ";
                panelSystem.classList.add('hidden');
                panelLore.classList.add('hidden');
            }

            if (targetId !== "intro" && categoryTexts[targetId]) {
                const textElement = targetContent.querySelector('p');
                if (textElement) {
                    typeWriter(textElement, categoryTexts[targetId], 30);
                }
            }
        });
    });

    // ==========================================
    // 3. ЗАГРУЗКА ДАННЫХ ИЗ data.json
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
            
            console.log("Данные успешно обновлены:", data);
        } catch (error) {
            console.error("Не удалось загрузить данные:", error);
        }
    }

    fetchData();
    setInterval(fetchData, 60000); // Обновляем каждую минуту

    // ==========================================
    // 4. ИМИТАЦИЯ АКТИВНОСТИ (Для красоты)
    // ==========================================
    const cpuLoadElement = document.getElementById('cpu-load');
    const pingElement = document.getElementById('ping-val');

    setInterval(() => {
        // Меняем загрузку ядра и пинг, чтобы система казалась живой
        if (cpuLoadElement) cpuLoadElement.innerText = Math.floor(Math.random() * 40) + 5 + "%";
        if (pingElement) pingElement.innerText = Math.floor(Math.random() * 45) + 15 + "ms";
    }, 2000);
});