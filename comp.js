const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ['','','','','','','','',''];

let currentPlayer ='X';
let running = false;


initialize();

function initialize() {
    cells.forEach((cell) => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `Kolej dla ${currentPlayer}`;
    running = true;
  }
  
function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');
  
    if (options[cellIndex] !== '' || !running) {
      return;
    }
  
    updateCell(this, cellIndex);
    setTimeout(() => {
        computerTurn();
    }, 5000);
    checkWinner();
  }

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    running = true;
    if (currentPlayer === 'O') {
      computerTurn();
    }
    statusText.textContent = `Kolej dla ${currentPlayer}`;
}  

function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == '' || cellB == '' || cellC == ''){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Kolej dla ${currentPlayer}`;
        running = false;
        statusText.textContent = `Wygrywa ${currentPlayer}`;
    } else if(!options.includes('')) {
        statusText.textContent = `Remis`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `Kolej dla ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
}

function computerTurn() {
    if (currentPlayer === 'O') {
      let availableCells = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i] === '') {
          availableCells.push(i);
        }
      }
  
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      const cellIndex = availableCells[randomIndex];
      const cell = cells[cellIndex];
  
      updateCell(cell, cellIndex);
      checkWinner();
    }
  }
  