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
    
    // Элементы правой панели
    const panelHeader = document.getElementById('panel-header');
    const panelSystem = document.getElementById('panel-system');
    const panelLore = document.getElementById('panel-lore');

    // Тексты для центрального экрана
    const categoryTexts = {
        "lore": "Информация о корпорации Renezia, культе «Корень Затмения» и их истинных целях.",
        "hierarchy": "Структура управления: от рядового бойца до Генерального Директора.",
        "rules": "Базовые протоколы, субординация и наказания за нарушения.",
        "grimoire": "Секретные знания культа. Доступ только для прошедших ритуал."
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Меняем активную кнопку
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            const targetId = button.getAttribute('data-target');
            
            // 2. Скрываем все центральные блоки и показываем нужный
            contents.forEach(c => c.classList.add('hidden'));
            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.remove('hidden');

            // 3. Логика для правой панели
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

            // 4. Запускаем печать текста (если это не "Система")
            if (targetId !== "intro") {
                const textElement = targetContent.querySelector('p');
                if (textElement && categoryTexts[targetId]) {
                    typeWriter(textElement, categoryTexts[targetId], 30);
                }
            }
        });
    });
});