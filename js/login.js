document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Получаем пользователей из LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверяем, существует ли пользователь с таким email и паролем
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Сохраняем информацию о пользователе в сессии
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Вход выполнен успешно!');
        window.location.href = 'accounts.html'; // Перенаправление на страницу счетов
    } else if (email === 'maxim11393@gmail.com' && password === '11393') {
        alert('Вход выполнен успешно!');
        window.location.href = 'accounts.html'; // Перенаправление на страницу сотрудников
    } 
    else {
        alert('Неверный email или пароль');
    }
});