document.getElementById('addAccountBtn').addEventListener('click', function() {
    document.getElementById('addAccountForm').style.display = 'block';
});

document.getElementById('newAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const dogName = document.getElementById('dogName').value;
    const initialBalance = parseFloat(document.getElementById('initialBalance').value);

    // Создаем новый счет
    const newAccount = {
        id: Date.now(),
        dogName: dogName,
        balance: initialBalance
    };

    // Получаем информацию о текущем пользователе из сессии
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // Получаем пользователей из LocalStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Находим текущего пользователя
    const user = users.find(user => user.id === loggedInUser.id);

    // Добавляем новый счет пользователю
    user.accounts.push(newAccount);

    // Сохраняем обновленный список пользователей в LocalStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Очищаем форму
    document.getElementById('newAccountForm').reset();
    document.getElementById('addAccountForm').style.display = 'none';

    // Обновляем список счетов на странице
    displayAccounts();
});

function displayAccounts() {
    const accountList = document.getElementById('accountList');
    accountList.innerHTML = '';

    // Получаем информацию о текущем пользователе из сессии
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // Получаем пользователей из LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Находим текущего пользователя
    const user = users.find(user => user.id === loggedInUser.id);

    // Отображаем счета пользователя
    user.accounts.forEach(account => {
        const accountDiv = document.createElement('div');
        accountDiv.innerHTML = `
            <strong>${account.dogName}</strong> - Баланс: ${account.balance} руб.
            <button class="deleteAccountBtn" data-id="${account.id}">Удалить</button>
            <button class="requestCreditBtn" data-id="${account.id}">Запросить кредит</button>
        `;
        accountList.appendChild(accountDiv);
    });

    // Добавляем обработчики для кнопок удаления
    const deleteButtons = document.querySelectorAll('.deleteAccountBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountId = this.getAttribute('data-id');
            deleteAccount(accountId);
        });
    });

    // Добавляем обработчики для кнопок запроса кредита
    const requestCreditButtons = document.querySelectorAll('.requestCreditBtn');
    requestCreditButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountId = this.getAttribute('data-id');
            const amount = prompt('Введите сумму кредита:');
            if (amount) {
                requestCredit(accountId, parseFloat(amount));
            }
        });
    });
}

function deleteAccount(accountId) {
    // Получаем информацию о текущем пользователе из сессии
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // Получаем пользователей из LocalStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Находим текущего пользователя
    const user = users.find(user => user.id === loggedInUser.id);

    // Удаляем счет у пользователя
    user.accounts = user.accounts.filter(account => account.id != accountId);

    // Сохраняем обновленный список пользователей в LocalStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Обновляем список счетов на странице
    displayAccounts();
}

function requestCredit(accountId, amount) {
    // Получаем информацию о текущем пользователе из сессии
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // Получаем пользователей из LocalStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Находим текущего пользователя
    const user = users.find(user => user.id === loggedInUser.id);

    // Находим счет пользователя
    const account = user.accounts.find(acc => acc.id == accountId);

    if (account) {
        account.creditRequest = amount;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Запрос на кредит отправлен!');
        displayAccounts();
    }
}

// Отображаем счета при загрузке страницы
displayAccounts();