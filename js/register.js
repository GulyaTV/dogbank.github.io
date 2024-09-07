document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Здесь будет логика для сохранения данных пользователя
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    // Пример: сохранение данных в LocalStorage
    localStorage.setItem('user', JSON.stringify({ name, email, password }));

    alert('Регистрация выполнена успешно!');
    window.location.href = 'login.html'; // Перенаправление на страницу входа
});