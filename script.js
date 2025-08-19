 document.addEventListener('DOMContentLoaded', () => {
            const board = document.getElementById('board');
            const cells = document.querySelectorAll('.cell');
            const statusDisplay = document.querySelector('.status');
            const resetButton = document.getElementById('resetBtn');
            
            let gameState = ['', '', '', '', '', '', '', '', ''];
            let currentPlayer = 'X';
            let gameActive = true;
            
            const winningConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
                [0, 4, 8], [2, 4, 6]             // diagonais
            ];
            
            function handleCellClick(e) {
                const clickedCell = e.target;
                const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
                
                if (gameState[clickedCellIndex] !== '' || !gameActive) {
                    return;
                }
                
                updateCell(clickedCell, clickedCellIndex);
                checkGameResult();
            }
            
            function updateCell(cell, index) {
                gameState[index] = currentPlayer;
                cell.textContent = currentPlayer;
                cell.classList.add(currentPlayer.toLowerCase());
            }
            
            function changePlayer() {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                statusDisplay.textContent = `É a vez do Jogador ${currentPlayer}`;
            }
            
            function checkGameResult() {
                let roundWon = false;
                
                // Verifica condições de vitória
                for (let i = 0; i < winningConditions.length; i++) {
                    const [a, b, c] = winningConditions[i];
                    
                    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                        continue;
                    }
                    
                    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                        roundWon = true;
                        highlightWinningCells([a, b, c]);
                        break;
                    }
                }
                
                if (roundWon) {
                    statusDisplay.textContent = `Jogador ${currentPlayer} venceu!`;
                    gameActive = false;
                    return;
                }
                
                // Verifica empate
                if (!gameState.includes('')) {
                    statusDisplay.textContent = 'Empate!';
                    gameActive = false;
                    return;
                }
                
                changePlayer();
            }
            
            function highlightWinningCells(cells) {
                cells.forEach(index => {
                    document.querySelector(`.cell[data-index="${index}"]`).classList.add('winner');
                });
            }
            
            function resetGame() {
                gameState = ['', '', '', '', '', '', '', '', ''];
                currentPlayer = 'X';
                gameActive = true;
                
                statusDisplay.textContent = `É a vez do Jogador ${currentPlayer}`;
                
                cells.forEach(cell => {
                    cell.textContent = '';
                    cell.classList.remove('x', 'o', 'winner');
                });
            }
            
            cells.forEach(cell => cell.addEventListener('click', handleCellClick));
            resetButton.addEventListener('click', resetGame);
        });