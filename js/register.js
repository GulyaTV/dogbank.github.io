document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Создаем нового пользователя
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        accounts: []
    };

    // Получаем существующих пользователей из LocalStorage или создаем новый массив
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);

    // Сохраняем обновленный список пользователей в LocalStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Регистрация выполнена успешно!');
    window.location.href = 'login.html'; // Перенаправление на страницу входа
});