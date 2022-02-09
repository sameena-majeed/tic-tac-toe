const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restartButton');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {  
    circleTurn = false;
    cellElements.forEach(cells => {
        cells.classList.remove(CIRCLE_CLASS)
        cells.classList.remove(X_CLASS)
        cells.removeEventListener('click',handleClick)
        cells.addEventListener('click', handleClick, { once: true }) })
    // once true -- so that each cell can be clicked exactly once.
    // setBOardClass is for hover
    setBoardClass()
    winningMessageElement.classList.remove('show');
}


function handleClick(e) {
    //place mark
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    //check for win
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        switchTurns();
        setBoardClass();
    }
    //check for draws
    //switch turns

}
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(CIRCLE_CLASS) || cell.classList.contains(X_CLASS)
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = "Draw! :( "
        winningMessageElement.classList.add('show');
    } else {
        winningMessageText.innerText = `${circleTurn ? " o's" : "x's"} Win!!`
        winningMessageElement.classList.add('show');
    }
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurns() {
    circleTurn = !circleTurn;
}

function setBoardClass() {
    // for hover

    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}
// every cell inside the cell is correct for atleast one combination, then its a win 
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
