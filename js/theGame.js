'use strict';

var gLevel;
var gNums;
var gBoard;
var gElClock = document.querySelector('.clock');
var gMillisec = 0;
var gSeconds = 0;
var gGetTimerInterval;
var gCurrNum = 0;

function toChooseLevel() {
    document.querySelector('.time').style.visibility = 'hidden';
    document.querySelector('table .board').style.visibility = 'hidden';
    document.querySelector('.buttons').style.visibility = 'hidden';
    document.querySelector('.main-head').style.visibility = 'hidden';
    document.querySelector('.main-nav').style.visibility = 'hidden';
    document.querySelector('.instructions').style.visibility = 'hidden';
    document.querySelector('.levels-head').style.visibility = 'visible';
    document.querySelector('.level-nav').style.visibility = 'visible';
}

function moveToGame(level) {
    gLevel = level;
    document.querySelector('.levels-head').style.visibility = 'hidden';
    document.querySelector('.level-nav').style.visibility = 'hidden';
    document.querySelector('.time').style.visibility = 'visible';
    document.querySelector('table .board').style.visibility = 'visible';
    document.querySelector('.buttons').style.visibility = 'visible';
    init(level);
}

function init(gameLevel) {
    document.querySelector('.instructions').style.visibility = 'visible';
    gNums = produceNums(gameLevel);
    gBoard = createBoard(gameLevel);
    renderBoard(gBoard);
    document.querySelector('.instructions').style.visibility = 'visible';
}

function produceNums(boardzise) {
    var nums = [];
    for (var i = 1; i <= boardzise ** 2; i++) {
        nums.push(i);
    }
    return nums;
}

function createBoard(boardSize) {
    var board = [];
    for (var i = 0; i < boardSize; i++) {
        board[i] = [];
        for (var j = 0; j < boardSize; j++) {
            var currNum = gNums.splice(getRandomInteger(1, gNums.length - 1), 1);
            board[i][j] = {
                value: currNum[0],
                isHit: false
            }
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j].value;
            strHTML += `\t<td style="color:${(board[i][j].isHit) ? 'black' : 'white'}; 
            background:${(board[i][j].isHit) ? 'repeating-radial-gradient(rgb(61, 10, 30), rgb(0, 0, 0))' : ''}"
             onclick="checkCell(${cell}, ${i}, ${j})">${cell}</td>\n`;
        }
        strHTML += '</tr>\n'
    }
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHTML;
}

function checkCell(pressedNum, rowNum, colNum) {
    if (pressedNum === gCurrNum) {
        gCurrNum++;
        gBoard[rowNum][colNum].isHit = true;
    }
    else {
        console.log('wrong');
    }
    renderBoard(gBoard)
    checkVictory();
}

function startGame() {
    gCurrNum = 1;
    document.querySelector('.instructions').style.visibility = 'hidden'
    timeCounter();
}

function timeCounter() {
    var startTime = Date.now();
    var currTime;
    gGetTimerInterval = setInterval(function () {
        currTime = Date.now() - startTime;
        gMillisec = currTime % 1000
        gSeconds = Math.floor(currTime / 1000)

        gElClock.innerText = gSeconds > 9 ? gSeconds + ':' + (gMillisec <= 99 ? '0' + gMillisec : gMillisec) : 
        '0' + gSeconds + ':' + (gMillisec <= 99 ? '0' + gMillisec : gMillisec)
        if (gMillisec >= 999) gMillisec = 0;

    }, 60);
}


function checkVictory() {
    if (gCurrNum > gBoard.length ** 2) {
        clearInterval(gGetTimerInterval);
        gCurrNum = 0;
        document.querySelector('.victory').innerText += `Great Job! \n Your time is: 
        ${gElClock.innerText}`
        document.querySelector('.victory').style.visibility = 'visible'
    }
}

function changeDifficulty() {
    toZero();
    toChooseLevel();
}

function startOver() {
    toZero();
    init(gLevel);
}

function toZero() {
    document.querySelector('.victory').style.visibility = 'hidden';
    clearInterval(gGetTimerInterval)
    gCurrNum = 1;
    gElClock.innerText = "00:000"
}

function getRandomInteger(min, max) {
    var num = Math.floor((Math.random() * (max - min)) + min);
    return num;
}