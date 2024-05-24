const userGreeting = document.getElementById('userGreeting');

// Получаем имя из URL
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('name');

// Выводим приветствие с именем
userGreeting.textContent = userName;
