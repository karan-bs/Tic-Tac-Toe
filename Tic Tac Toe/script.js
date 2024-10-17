const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

const checkWinner = () => {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `${currentPlayer} Wins!`;
      isGameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "Draw!";
    isGameActive = false;
  }
};

const handleClick = (e) => {
  const index = e.target.getAttribute('data-index');
  if (board[index] === "" && isGameActive) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (isGameActive) {
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
};

const restartGame = () => {
  board.fill("");
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

statusText.textContent = `Player ${currentPlayer}'s turn`;
