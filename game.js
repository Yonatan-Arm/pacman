'use strict'
const WALL = '🧱'
const boom='🔥'
const FOOD = '🍀'
const SUPERFOOD = '🍕'
const EMPTY = ' '
var CHERRY= '🍒'
var foodQuntity=56;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    // console.log('Hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    // console.table(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    setInterval(cherryPop , 10000)

}

function buildBoard(){
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }else if( i===1 && j===1 || i===1 && j===8 || i===8 && j===1 || i===8 && j=== 8 ){
                board[i][j] = SUPERFOOD;
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
    foodQuntity--
    console.log(foodQuntity);
    if(foodQuntity === 0){
        gameOver(true)
    }
    
}

function gameOver(flag) {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = boom
    // update the DOM
    renderCell(gPacman.location, boom)
    var elModal= document.querySelector('.pop-modal')
    var elModalspan= document.querySelector('.pop-modal span')
    elModal.style.display = 'block'
    if(flag=== false) {
        elModalspan.innerText =' try again loser!'
    }else{
        elModalspan.innerText =' you are the winner!!'
    }
}

function restart(){
    var elModal= document.querySelector('.pop-modal')
    elModal.style.display = 'none'
    foodQuntity=56;
    gGame.score=0;
    init()
}

function cherryPop(){
	var emptyCells= checkCells(gBoard)
	var Index=getRandomIntInclusive(0, emptyCells.length);
	var newCherryPos=emptyCells[Index]
    gBoard[newCherryPos.i][newCherryPos.j]= CHERRY
    renderCell(newCherryPos, CHERRY)
}

function checkCells(gBoard){
	var arr=[]
	for(var i=0; i<gBoard.length; i++){
		for(var j=0; j<gBoard[i].length;j++){
			if(gBoard[i][j]===EMPTY ){
				arr.push({i:i, j:j})
			}
		}
	}
	return arr

}

