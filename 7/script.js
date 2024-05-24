const sticksContainer = document.querySelector('.sticks');
const counterBefore = document.querySelector('.before');
const counterAfter = document.querySelector('.after');
const clickSound = document.getElementById('clickSound');

let selectedStick = null;

// Создание палочек
for (let i = 0; i < 10; i++) {
    const stick = document.createElement('div');
    stick.classList.add('stick');
    stick.addEventListener('click', () => {
        clickSound.play();

        // Если палочка уже выбрана, снимаем выделение
        if (selectedStick) {
            selectedStick.classList.remove('selected');
        }

        // Выделяем выбранную палочку
        stick.classList.add('selected');
        selectedStick = stick;

        // Обновляем счетчики
        const sticksBefore = Array.from(sticksContainer.children).indexOf(stick);
        counterBefore.textContent = sticksBefore;
        counterAfter.textContent = 9 - sticksBefore;
    });
    sticksContainer.appendChild(stick);
}
