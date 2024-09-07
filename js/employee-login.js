document.getElementById('employeeLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Здесь будет логика для проверки данных сотрудника
    console.log('Email:', email);
    console.log('Password:', password);

    // Пример: проверка данных и перенаправление на страницу сотрудников
    if (email === 'maxim11393@gmail.com' && password === '11393') {
        alert('Вход выполнен успешно!');
        window.location.href = 'employee.html'; // Перенаправление на страницу сотрудников
    } else {
        alert('Неверный email или пароль');
    }
});