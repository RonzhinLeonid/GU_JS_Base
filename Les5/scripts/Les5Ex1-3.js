const CELL_TYPES = {
    LIGHT: "light",
    DARK: "dark",
};

const COLOR_TEXT = {
    LIGHT: "light-text",
    DARK: "dark-text",
};

// const CELL_LIGHT_FIGURES = {
//     KING: "Кр",
//     QUEEN: "Ф",
//     BISHOP: "С",
//     KNIGHT: "К",
//     ROOK: "Л",
//     PAWN: "П"
// }
// const CELL_DARK_FIGURES = {
//     KING: "Кр",
//     QUEEN: "Ф",
//     BISHOP: "С",
//     KNIGHT: "К",
//     ROOK: "Л",
//     PAWN: "П"
// }

const CELL_LIGHT_FIGURES = {
    KING: "&#9812",
    QUEEN: "&#9813",
    BISHOP: "&#9815",
    KNIGHT: "&#9816",
    ROOK: "&#9814",
    PAWN: "&#9817;"
}
const CELL_DARK_FIGURES = {
    KING: "&#9818",
    QUEEN: "&#9819",
    BISHOP: "&#9821",
    KNIGHT: "&#9822",
    ROOK: "&#9820",
    PAWN: "&#9823;"
}

const lightTeam = [CELL_LIGHT_FIGURES.ROOK,
CELL_LIGHT_FIGURES.KNIGHT,
CELL_LIGHT_FIGURES.BISHOP,
CELL_LIGHT_FIGURES.QUEEN,
CELL_LIGHT_FIGURES.KING,
CELL_LIGHT_FIGURES.BISHOP,
CELL_LIGHT_FIGURES.KNIGHT,
CELL_LIGHT_FIGURES.ROOK];

const darkTeam = [CELL_DARK_FIGURES.ROOK,
CELL_DARK_FIGURES.KNIGHT,
CELL_DARK_FIGURES.BISHOP,
CELL_DARK_FIGURES.QUEEN,
CELL_DARK_FIGURES.KING,
CELL_DARK_FIGURES.BISHOP,
CELL_DARK_FIGURES.KNIGHT,
CELL_DARK_FIGURES.ROOK];

let currentCell = CELL_TYPES.LIGHT;
const startSymbolIndex = "A".charCodeAt();
const countRows = 8

function getSymbol(index) {
    return String.fromCharCode(index);
}

function changeCurrentCell() {
    if (currentCell === CELL_TYPES.LIGHT) { currentCell = CELL_TYPES.DARK; }
    else { currentCell = CELL_TYPES.LIGHT; }
    return;
}

function createCellTHead(valueCell, tr) {
    let th = document.createElement("th");
    th.innerHTML = valueCell;
    tr.appendChild(th);
}

function getColorText(currentCell) {
    if (currentCell === CELL_TYPES.LIGHT) return COLOR_TEXT.DARK;
    return COLOR_TEXT.LIGHT;
}

function createFigure(tr, figure) {
    let td = tr.insertCell();
    td.className = currentCell;

    let div = document.createElement("div");
    div.className = getColorText(currentCell);
    div.innerHTML = figure;

    td.appendChild(div)
    changeCurrentCell();
}

function createCellBoard(row, col, tr) {
    switch (row) {
        case 1: {
            createFigure(tr, darkTeam[col]);
            return;
        }
        case 2: {
            createFigure(tr, CELL_DARK_FIGURES.PAWN);
            return;
        }
        case 7: {
            createFigure(tr, CELL_LIGHT_FIGURES.PAWN);
            return;
        }
        case 8: {
            createFigure(tr, lightTeam[col]);
            return;
        }
        default: {
            let td = tr.insertCell();
            td.className = currentCell;
            changeCurrentCell();
        }
    }
}

function createCell(row, col, tr) {
    if (row == 0 && col == 0) {
        createCellTHead("", tr);
    }
    if (col > 0 && row == 0) {
        createCellTHead(getSymbol(startSymbolIndex + col - 1), tr);
    }
    if (col == 0 && row > 0) {
        createCellTHead(countRows - row + 1, tr);
    }
    if (row > 0 && col > 0) {
        createCellBoard(row, col - 1, tr);
    }
}

function createChessBoard() {
    const body = document.body;
    const chessBoard = document.createElement("table");
    chessBoard.className = "chess-board";
    let caption = chessBoard.createCaption();
    caption.className = "chess-board-heading";
    caption.innerHTML = "Шахматная доска";

    for (let i = 0; i <= countRows; i++) {
        let tr = chessBoard.insertRow();
        for (let j = 0; j <= countRows; j++) {
            createCell(i, j, tr);
        }
        if (i !== 0) changeCurrentCell();
    }
    body.appendChild(chessBoard);
}
createChessBoard()


