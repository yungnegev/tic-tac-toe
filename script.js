/* variables */
const X_CLASS = 'x'
const O_CLASS = 'o'
const cellElements = document.querySelectorAll('[data-cell]')
const winningText = document.querySelector('[data-winning-message-text]')
const overlay = document.querySelector('#overlay')
const restartBtn = document.querySelector('#restart-button')
let oTurn = false
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


/* the game */
function startGame(){
    oTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once:true})  /* triggers the event one time only */
    })
}




/* handles the click event */
function handleClick(e){
    const cell = e.target /* Gonna be whatever cell was clicked on */
    const currentClass = oTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    }else{
        swapTurns()
    }
}

/* places the mark */
function placeMark(cell, currentClass){
    cell.classList.add(currentClass) /* adds the corresponding class */
    if(currentClass == X_CLASS){
        cell.style.color = '#FF7597' /* gives a color */
        cell.innerText = 'close' /* places the icon name */
    }else{
        cell.style.color = '#BB86FC'
        cell.innerText = 'circle'
    }
}
/* takes oturn and sets it to the opposite of itself */
function swapTurns(){
    oTurn = !oTurn  
}
/* if a combination has all 3 positions with the same class*/
/* mad ting tbh */
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => { 
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
/* to end the game */
function endGame(draw){
    if(draw){
        winningText.innerText = 'Draw (・`ω´・)'
    }else{
        winningText.innerText = `${oTurn ? "O's" : "X's"} win.`
    }
    overlay.classList.add('show')
}
/* to check for draws */
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

/* restart */
restartBtn.addEventListener('click', () => location.reload())

/* Starts the game */
startGame()