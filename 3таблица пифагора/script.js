const tableSize = 10;
const table = document.getElementById('pythagoras-table');
const resultDiv = document.getElementById('result');

// Создаем таблицу
for (let i = 1; i <= tableSize; i++) {
    const row = table.insertRow();
    for (let j = 1; j <= tableSize; j++) {
        const cell = row.insertCell();
        cell.textContent = i * j;
        cell.addEventListener('click', () => {
            resultDiv.innerHTML = `
                <div class="cloud">
                    ${i} x ${j} = ${i * j}
                </div>
            `;
            cell.style.backgroundColor = "#f44336";
            setTimeout(() => cell.style.backgroundColor = "", 200);
        });
    }
}
