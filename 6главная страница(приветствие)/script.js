const enterButton = document.getElementById("enterButton");

enterButton.addEventListener("click", function() {
    const username = document.getElementById("userName").value;

    if (username) {
        // Вывести приветствие с введенным именем и перенаправить на страницу с играми
        alert(Привет, ${username}!);
        window.location.href = "games.html";
    } else {
        // Если имя не введено, вывести сообщение об ошибке
        alert("Пожалуйста, введите свое имя.");
    }
});
