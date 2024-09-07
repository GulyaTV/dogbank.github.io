document.getElementById('employeeLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Здесь будет логика для проверки данных сотрудника
    console.log('Email:', email);
    console.log('Password:', password);

    // Пример: проверка данных и перенаправление на страницу сотрудников
    if (email === 'employee@example.com' && password === 'password') {
        alert('Вход выполнен успешно!');
        window.location.href = 'employee.html'; // Перенаправление на страницу сотрудников
    } else {
        alert('Неверный email или пароль');
    }
});