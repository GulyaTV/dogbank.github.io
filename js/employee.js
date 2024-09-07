function displayEmployeeAccounts() {
    const employeeAccountList = document.getElementById('employeeAccountList');
    employeeAccountList.innerHTML = '';

    // Получаем пользователей из LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Отображаем счета всех пользователей
    users.forEach(user => {
        user.accounts.forEach(account => {
            const accountDiv = document.createElement('div');
            accountDiv.innerHTML = `
                <strong>${user.name} - ${account.dogName}</strong> - Баланс: ${account.balance} руб.
                <button class="deleteAccountBtn" data-userId="${user.id}" data-accountId="${account.id}">Удалить</button>
                <button class="creditAccountBtn" data-userId="${user.id}" data-accountId="${account.id}">Выдать кредит</button>
                ${account.creditRequest ? `<button class="approveCreditBtn" data-userId="${user.id}" data-accountId="${account.id}">Одобрить кредит (${account.creditRequest} руб.)</button>` : ''}
            `;
            employeeAccountList.appendChild(accountDiv);
        });
    });

    // Добавляем обработчики для кнопок удаления
    const deleteButtons = document.querySelectorAll('.deleteAccountBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-userId');
            const accountId = this.getAttribute('data-accountId');
            deleteAccount(userId, accountId);
        });
    });

    // Добавляем обработчики для кнопок выдачи кредита
    const creditButtons = document.querySelectorAll('.creditAccountBtn');
    creditButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-userId');
            const accountId = this.getAttribute('data-accountId');
            const amount = prompt('Введите сумму кредита:');
            if (amount) {
                creditAccount(userId, accountId, parseFloat(amount));
            }
        });
    });

    // Добавляем обработчики для кнопок одобрения кредита
    const approveCreditButtons = document.querySelectorAll('.approveCreditBtn');
    approveCreditButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-userId');
            const accountId = this.getAttribute('data-accountId');
            approveCredit(userId, accountId);
        });
    });
}

function deleteAccount(userId, accountId) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.id == userId);
    if (user) {
        user.accounts = user.accounts.filter(account => account.id != accountId);
        localStorage.setItem('users', JSON.stringify(users));
        displayEmployeeAccounts();
    }
}

function creditAccount(userId, accountId, amount) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.id == userId);
    if (user) {
        const account = user.accounts.find(acc => acc.id == accountId);
        if (account) {
            account.balance += amount;
            localStorage.setItem('users', JSON.stringify(users));
            displayEmployeeAccounts();
        }
    }
}

function approveCredit(userId, accountId) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.id == userId);
    if (user) {
        const account = user.accounts.find(acc => acc.id == accountId);
        if (account) {
            account.balance += account.creditRequest;
            delete account.creditRequest;
            localStorage.setItem('users', JSON.stringify(users));
            displayEmployeeAccounts();
        }
    }
}

// Отображаем счета при загрузке страницы
displayEmployeeAccounts();