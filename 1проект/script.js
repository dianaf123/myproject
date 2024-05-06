const timeEl = document.getElementById('time');
const exampleEl = document.getElementById('example');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const nextLevelButton = document.getElementById('nextLevelButton');
const errorEl = document.getElementById('errorInfo');
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);



let firstNumber, secondNumber, correctAnswer;
let timeLeft = 15; // Начальное время на ответ
let currentLevel = 1;
let correctAnswersInLevel = 0;
let animTimerId = null;

function generateExample() {
  firstNumber = Math.floor(Math.random() * 10);
  secondNumber = Math.floor(Math.random() * 10);
  correctAnswer = firstNumber * secondNumber;
  exampleEl.textContent = `${firstNumber} * ${secondNumber} = ?`;

  // Генерация вариантов ответов
  const options = [correctAnswer];
  while (options.length < 4) {
    const option = Math.floor(Math.random() * 100);
    if (!options.includes(option)) {
      options.push(option);
    }
  }

  options.sort(() => Math.random() - 0.5); // Перемешиваем варианты ответов

  optionsEl.innerHTML = '';
  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(option));
    optionsEl.appendChild(button);
  });
}

function startTimer() {
  timeLeft = 15;
  timeEl.textContent = timeLeft;
  if(animTimerId != null)
    cancelAnimationFrame(animTimerId);
  animTimerId = null;
  let startTime = performance.now(); // Используем performance.now() для большей точности

  function updateTimer(currentTime) {
    const elapsedTime = currentTime - startTime;
    const secondsElapsed = Math.floor(elapsedTime / 1000);

    if (secondsElapsed >= 1) {
      timeLeft -= secondsElapsed;
      timeEl.textContent = timeLeft;
      startTime = currentTime;
    }

    if (timeLeft <= 0) {
      checkAnswer(null);
    } else {
      animTimerId = requestAnimationFrame(updateTimer);
    }
  }

  animTimerId = requestAnimationFrame(updateTimer);
}

function checkAnswer(userAnswer) {
  if (userAnswer === correctAnswer) {
    resultEl.textContent = 'Правильно!';
    resultEl.style.color = 'green';
    correctAnswersInLevel++;

    if (correctAnswersInLevel === 10) {
      // Уровень пройден
      currentLevel++;
      correctAnswersInLevel = 0;
      alert(`Поздравляем! Вы прошли уровень ${currentLevel - 1}!`);
      nextLevel(); // Переход на следующий уровень
    } else {
      nextLevelButton.style.display = 'block';
    }
  } else {
    resultEl.textContent = 'Неправильно!';
    resultEl.style.color = 'red';
    errorEl.textContent = `Ошибка! Пример: ${firstNumber} * ${secondNumber} = ? Ваш ответ: ${userAnswer}. Правильный ответ: ${correctAnswer}`;
    errorEl.style.display = 'block';
    restartButton.style.display = 'block'; // Показываем кнопку "Начать заново"
  }

  // Скрываем элементы после проверки ответа
  timeEl.style.display = 'none';
  exampleEl.style.display = 'none';
  optionsEl.style.display = 'none';
}

function restartGame() {
  generateExample();
  startTimer();
  resultEl.textContent = '';
  errorEl.textContent = '';
  errorEl.style.display = 'none';
  restartButton.style.display = 'none';
  timeEl.style.display = 'block';
  exampleEl.style.display = 'block';
  optionsEl.style.display = 'block';
}

function nextLevel() {
  if (currentLevel > 3) {
    alert('Вы прошли все уровни! Поздравляем!');
    restartGame(); // Начинаем игру заново
  } else {
    generateExample();
    startTimer();
    resultEl.textContent = '';
    nextLevelButton.style.display = 'none';
    errorEl.style.display = 'none';
    timeEl.style.display = 'block';
    exampleEl.style.display = 'block';
    optionsEl.style.display = 'block';
  }
}

// Запускаем игру при загрузке страницы
generateExample();
startTimer();

nextLevelButton.addEventListener('click', nextLevel);
