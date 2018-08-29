const playerIcon = document.createElement('div')
playerIcon.id = 'playerIcon';
const rowsWrapper = document.getElementById("rowsWrapper");
const map = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
];
let playerLocation = [];
var locationsOfBoxes = [];


function createBox(cellNumber, rowNumber) {
    let box = document.createElement('div');
    box.className = 'box';
    box.id = "boxAtcell" + cellNumber + "row" + rowNumber;
    // box.dataset.location = "boxAtrow" + rowNumber + "cell" + cellNumber;
    return box;
}

function createRows() {
    for (let i = 0; i < map.length; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        row.id = 'row' + i;
        row.dataset.rowNumber = i;
        createCells(row);
        rowsWrapper.appendChild(row)
    }
}

function createCells(row) {
    for (let i = 0; i < map[0].length; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = "cell" + i + row.id;
        switch (map[row.dataset.rowNumber][i]) {
            case 'W':
                cell.className = 'wall cell';
                break;
            case ' ':
                cell.className = 'floor cell';
                break;
            case 'S':
                cell.className = 'floor cell';
                playerLocation = [i, Number(row.dataset.rowNumber)];
                break;
            case 'O':
                cell.className = 'floor cell finish';
                break;
            case 'B':
                cell.className = 'floor cell';
                let box = createBox(i, Number(row.dataset.rowNumber));
                cell.appendChild(box);
                break;
            case 'X':
                let boxX = createBox(i, Number(row.dataset.rowNumber));
                cell.appendChild(boxX)
                cell.className = 'floor cell finish'
                break;
        }
        row.appendChild(cell);
    }
}

function changePlayerLocation(Right, Down) {
    let rowNumber = playerLocation[1] + Down;
    let cellNumber = playerLocation[0] + Right;
    let mapLocation = (map[rowNumber][cellNumber]);
    let playerNewLocationDiv = document.getElementById('cell' + cellNumber + 'row' + rowNumber)
    let direction = whatDirection(Right, Down);
    let newPlayerLocation = [cellNumber, rowNumber]
    canTheBoxMove = true;
    console.log(canBoxMove(Right, Down));
    if (mapLocation !== 'W' && mapLocation !== undefined && canTheBoxMove == true) {
        playerIcon.style.animationName = "slide" + direction
        let playerLocationDiv = document.getElementById('cell' + cellNumber + 'row' + rowNumber)
        playerLocationDiv.appendChild(playerIcon);
        playerLocation = newPlayerLocation;   
    }
    if (playerNewLocationDiv.childElementCount > 1) {
        moveBox(Right, Down, playerNewLocationDiv)
    }
}

function canBoxMove(Right, Down){
    let result = true;
    let newBoxLocationCell = playerLocation[0] + Right;
    let newBoxLocationRow = playerLocation[1] + Down;
    let newBoxLocationDiv = document.getElementById('cell' + newBoxLocationCell + 'row' + newBoxLocationRow)
    console.log(newBoxLocationDiv.childElementCount)
    console.log(newBoxLocationDiv.className.includes('floor'))
    if (newBoxLocationDiv.childElementCount !== 0 && !newBoxLocationDiv.className.includes('floor')) {
        result = false;
    }
    return result;
}

function moveBox(Right, Down, currentBoxParentDiv) {
    let location = currentBoxParentDiv.id;
    let box = document.getElementById('boxAt' + location);
    let newBoxLocationCell = playerLocation[0] + Right;
    let newBoxLocationRow = playerLocation[1] + Down;
    let newBoxLocationDiv = document.getElementById('cell' + newBoxLocationCell + 'row' + newBoxLocationRow)
    if (newBoxLocationDiv.childElementCount == 0 && newBoxLocationDiv.className.includes('floor')) {
        newBoxLocationDiv.appendChild(box);
        box.id = "boxAtcell" + newBoxLocationCell + "row" + newBoxLocationRow;
    }
}

function whatDirection(Right, Down) {
    let direction = '';
    switch (Right) {
        case 1:
            direction = 'Right';
            break;
        case -1:
            direction = 'Left';
            break;
    }
    switch (Down) {
        case 1:
            direction = 'Down';
            break;
        case -1:
            direction = 'Up';
            break;
    }
    return direction;
}

function youWon() {
    let text = document.createTextNode("You won!");
    let element = document.createElement('div');
    element.appendChild(text);
    element.id = "winDiv"
    rowsWrapper.appendChild(element);
    document.removeEventListener('keydown', arrowKeyPressed);
}

createRows();
changePlayerLocation(0, 0); //game init: sets the playerIcon and mapLocation to the start position

let arrowKeyPressed = function (event) {
    switch (event.key) {
        case 'ArrowRight':
            changePlayerLocation(1, 0);
            break;
        case 'ArrowLeft':
            changePlayerLocation(-1, 0);
            break;
        case 'ArrowDown':
            changePlayerLocation(0, 1);
            break;
        case 'ArrowUp':
            changePlayerLocation(0, -1);
            break;
    }
}

document.addEventListener('keydown', arrowKeyPressed);