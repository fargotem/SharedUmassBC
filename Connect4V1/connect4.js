 // Function to initialize the game board
 function createBoard() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  }

  // Function to render the game board
  function renderBoard() {
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;

        if (board[row][col]) {
          cell.classList.add(board[row][col]);
        }
        boardContainer.appendChild(cell);
        cell.addEventListener('click', handleCellClick);
      }
    }
  }

  // Function to handle a click event
  function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    // Check if the clicked cell is valid and empty
    if (isValidMove(row, col)) {
      placeDisc(row, col);

      // Check for a win after placing the cell
      if (checkWin(row, col)) {
        alert(currentPlayer + ' wins!');
        createBoard();
        renderBoard();
        return;
      }

      // Check for a full board
      if (board.every(row => row.every(cell => cell))) {
        alert("It's a draw!");
        createBoard();
        renderBoard();
        return;
      }

      // Switch to the next player
      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    }
  }

  // Function to check if the move is valid
  function isValidMove(row, col) {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS && !board[row][col];
  }

  // Function to place a color cell on the board
  function placeDisc(row, col) {
    board[row][col] = currentPlayer;
    renderBoard();
  }

  // Function to check for a win
  function checkWin(row, col) {
    const directions = [
      [0, 1],  // Horizontal
      [1, 0],  // Vertical
      [-1, 1],  // Diagonal (top-left to bottom-right)
      [1,1],  // Diagonal (top-left to bottom-left)
      [1, -1]  // Diagonal (top-right to bottom-left)
    ];

    for (const [dx, dy] of directions) {
      let count = 1;

      for (let step = 1; step < 4; step++) {
        const newRow = row + (step * dx);
        const newCol = col + (step * dy);

        if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS || board[newRow][newCol] !== currentPlayer) {
          break;
        }

        count++;
      }

      for (let step = -1; step > -4; step--) {
        const newRow = row + (step * dx);
        const newCol = col +  (step * dy);

        if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS || board[newRow][newCol] !== currentPlayer) {
          break;
        }

        count++;
      }

      if (count >= 4) {
        return true;
      }
    }

    return false;
  }