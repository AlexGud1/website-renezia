document.addEventListener("DOMContentLoaded", () => {
    // 1. Приветствие пользователя
    const welcomeText = document.getElementById('welcome-text');
    
    // ТУТ можно потом заменить на реальное имя, пока просто "Оперативник"
    const userName = "Оперативник"; 
    
    // Эффект печатной машинки для приветствия
    let i = 0;
    const text = `Добро пожаловать, ${userName}. Ваш профиль загружен.`;
    
    function typeWriter() {
        if (i < text.length) {
            welcomeText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    welcomeText.innerHTML = ""; // Очищаем перед печатью
    typeWriter();

    // 2. Переключение меню
    const buttons = document.querySelectorAll('.menu-btn');
    const contents = document.querySelectorAll('.display-content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс со всех кнопок и блоков
            buttons.forEach(b => b.classList.remove('active'));
            contents.forEach(c => c.classList.add('hidden'));

            // Добавляем активный класс текущей кнопке
            button.classList.add('active');

            // Показываем нужный блок
            const targetId = button.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });
});