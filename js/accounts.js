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

    // Получаем существующие счета из LocalStorage или создаем новый массив
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts.push(newAccount);

    // Сохраняем обновленный список счетов в LocalStorage
    localStorage.setItem('accounts', JSON.stringify(accounts));

    // Очищаем форму
    document.getElementById('newAccountForm').reset();
    document.getElementById('addAccountForm').style.display = 'none';

    // Обновляем список счетов на странице
    displayAccounts();
});

function displayAccounts() {
    const accountList = document.getElementById('accountList');
    accountList.innerHTML = '';

    // Получаем счета из LocalStorage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Отображаем каждый счет
    accounts.forEach(account => {
        const accountDiv = document.createElement('div');
        accountDiv.innerHTML = `<strong>${account.dogName}</strong> - Баланс: ${account.balance} руб.`;
        accountList.appendChild(accountDiv);
    });
}

// Отображаем счета при загрузке страницы
displayAccounts();