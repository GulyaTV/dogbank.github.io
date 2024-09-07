document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Здесь будет логика для проверки данных пользователя
    console.log('Email:', email);
    console.log('Password:', password);

    // Пример: проверка данных и перенаправление на другую страницу
    if (email === 'user@example.com' && password === 'password') {
        alert('Вход выполнен успешно!');
        window.location.href = 'accounts.html'; // Перенаправление на страницу счета
    } else {
        alert('Неверный email или пароль');
    }
});