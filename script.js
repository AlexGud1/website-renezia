document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. ПРИВЕТСТВИЕ ПОЛЬЗОВАТЕЛЯ
    // ==========================================
    const welcomeText = document.getElementById('welcome-text');
    const userName = "Оперативник"; 
    const welcomeMsg = `Добро пожаловать, ${userName}. Профиль загружен.`;

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

    // Запускаем печать приветствия при загрузке
    if (welcomeText) {
        typeWriter(welcomeText, welcomeMsg, 50);
    }

    // ==========================================
    // 2. ПЕРЕКЛЮЧЕНИЕ МЕНЮ С ЭФФЕКТОМ ПЕЧАТИ
    // ==========================================
    const buttons = document.querySelectorAll('.menu-btn');
    const contents = document.querySelectorAll('.display-content');

    // Тексты для категорий
    const categoryTexts = {
        "lore": "Информация о корпорации Renezia, культе «Корень Затмения» и их истинных целях.",
        "hierarchy": "Структура управления: от рядового бойца до Генерального Директора.",
        "rules": "Базовые протоколы, субординация и наказания за нарушения.",
        "grimoire": "Секретные знания культа. Доступ только для прошедших ритуал."
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс со всех кнопок
            buttons.forEach(b => b.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');

            const targetId = button.getAttribute('data-target');
            
            // Скрываем все блоки
            contents.forEach(c => c.classList.add('hidden'));

            // Показываем нужный блок
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                
                // Находим элемент с текстом и запускаем печать
                if (targetId !== "intro") {
                    const textElement = targetContent.querySelector('p');
                    if (textElement) {
                        typeWriter(textElement, categoryTexts[targetId], 30);
                    }
                }
            }
        });
    });
});