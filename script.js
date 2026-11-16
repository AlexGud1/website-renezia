document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. ПРИВЕТСТВИЕ ПОЛЬЗОВАТЕЛЯ
    // ==========================================
    const welcomeText = document.getElementById('welcome-text');
    const userName = "Оперативник"; // Потом можно заменить
    const welcomeMsg = `Добро пожаловать, ${userName}. Профиль загружен.`;

    // Функция печати текста (универсальная)
    function typeWriter(element, text, speed, callback) {
        element.innerHTML = ""; // Очищаем элемент
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback(); // Если есть коллбэк, вызываем после завершения
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

    // Тексты для каждой категории (чтобы при клике они печатались заново)
    const categoryTexts = {
        "intro": "Оперативник, ожидайте загрузки профиля...\n> Подключение к терминалу \"Anaconda\"...\n> Загрузка архивов корпорации \"Renezia\"...\n> Доступ разрешен. Уровень допуска: Омега.",
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

            // Получаем ID целевого блока
            const targetId = button.getAttribute('data-target');
            
            // Скрываем все блоки
            contents.forEach(c => c.classList.add('hidden'));

            // Показываем нужный блок
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                
                // Находим элемент с текстом внутри этого блока и запускаем печать
                const textElement = targetContent.querySelector('p');
                if (textElement) {
                    // Если это блок "intro", у него особый системный лог
                    if (targetId === "intro") {
                        const logElement = targetContent.querySelector('.system-log');
                        textElement.innerHTML = "Оперативник, ожидайте загрузки профиля..."; 
                        if (logElement) {
                            typeWriter(logElement, categoryTexts[targetId], 20);
                        }
                    } else {
                        // Для остальных категорий печатаем текст в <p>
                        typeWriter(textElement, categoryTexts[targetId], 30);
                    }
                }
            }
        });
    });
});