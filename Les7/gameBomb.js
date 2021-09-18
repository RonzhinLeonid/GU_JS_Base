const gameFieldWidth = 16;
const gameFieldHeight = 16;
const tickPerSecond = 3;

const bombExplositonTime = 3000;
const bombStopTime = 1000;
const stepWave = 250;

const countEnemies = 15;

const CELL_TYPE = {
    BOMBERMAN: "bomberman",
    BOMB: "bomb",
    ENEMY: "enemy",
    WALL: "wall",
    EXPLOSION: "explosion",
};

let countExplodeBomb = 0;
let gameField;
const gameState = {
    bomberman: {
        position: {
            rowNumber: 0,
            columnNumber: 0,
        },
    },
    // {rowNumber, columnNumber, startTimeMs}
    bombs: [],
    bombExplodeSize: 3,
    bombExploseCells: {
        // i,j: time of start explode
    },
    gameTickHandler: null,
    enemies: []
};

const htmlPositionAttributeName = "cell-position";

/**
 * Создание двойного массива и заполнение игрового поля null
 */
const createGameField = () => {
    //   gameField = [];

    //   for (let i = 0; i < gameFieldHeight; i++) {
    //     gameField.push([]);
    //     for (let j = 0; j < gameFieldWidth; j++) {
    //       gameField[i].push(null);
    //     }
    //   }

    const gameFieldRows = new Array(gameFieldHeight).fill(null);

    gameField = gameFieldRows.map(() => {
        return new Array(gameFieldWidth).fill(null);
    });
};

/**
 * Установка id в DOM элементы, для взаимодействия с ними
 */
const setDomTreeAttributes = () => {
    const allCells = document.querySelectorAll(".cell");
    for (let i = 0; i < allCells.length; i++) {
        const numberOfRow = Math.floor(i / gameFieldHeight);
        const numberOfColumn = i % gameFieldWidth;

        allCells[i].id = generateCellId(numberOfRow, numberOfColumn);
    }
};

/**
 * Генерация id ячейки
 */
const generateCellId = (rowNumber, columnNumber) => {
    return `${htmlPositionAttributeName}${rowNumber},${columnNumber}`;
};

/**
 * Получение DOM элемента по позиции в gameField
 */
const getCellDomElement = (rowNumber, columnNumber) => {
    return document.getElementById(generateCellId(rowNumber, columnNumber));
};

/**
 * Получение позиции в gameField из id DOM элемента
 */
const getPositionById = (cellElement) => {
    const cellId = cellElement.id;
    const arrayOfPosition = cellId
        .replace(htmlPositionAttributeName, "")
        .split(",");

    return {
        rowNumber: arrayOfPosition[0],
        columnNumber: arrayOfPosition[1],
    };
};

/**
 * Установка бомбы (gameField и DOM)
 */
const setBombPosition = (rowNumber, columnNumber) => {
    gameField[rowNumber][columnNumber] = CELL_TYPE.BOMB;

    gameState.bombs.push({ rowNumber, columnNumber, startTimeMs: Date.now() });

    const startBombermanElement = getCellDomElement(rowNumber, columnNumber);
    startBombermanElement.classList.add(CELL_TYPE.BOMB);
};

/**
 * Проверка на окончание игры
 */
const checkGameField = (rowNumber, columnNumber, cellType) => {
    if (gameField[rowNumber][columnNumber] === cellType) {
        stopGame();
        return;
    }
}

/**
 * Установка позиции бомбермена, с удалением старой позиции
 */
const setBombermanPosition = (rowNumber, columnNumber) => {
    gameState.bomberman.position.rowNumber = rowNumber;
    gameState.bomberman.position.columnNumber = columnNumber;

    checkGameField(rowNumber, columnNumber, CELL_TYPE.ENEMY);

    // if (gameField[rowNumber][columnNumber] === CELL_TYPE.ENEMY) {
    //     stopGame();
    //     return;
    // }

    gameField[rowNumber][columnNumber] = CELL_TYPE.BOMBERMAN;
    const currentBombermanPositionElement = document.querySelector(
        `.${CELL_TYPE.BOMBERMAN}`
    );
    if (currentBombermanPositionElement !== null) {
        const bombermanPosition = getPositionById(currentBombermanPositionElement);
        gameField[bombermanPosition.rowNumber][bombermanPosition.columnNumber] =
            null;

        currentBombermanPositionElement.classList.remove(CELL_TYPE.BOMBERMAN);
    }

    const startBombermanElement = getCellDomElement(rowNumber, columnNumber);
    startBombermanElement.classList.add(CELL_TYPE.BOMBERMAN);
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
/**
 * Установка врагов
 */
const setEnemyPosition = () => {

    while (countEnemies > gameState.enemies.length) {
        rowNumber = getRandomInt(gameFieldHeight);
        columnNumber = getRandomInt(gameFieldWidth);
        if (gameField[rowNumber][columnNumber] !== null) continue;

        gameField[rowNumber][columnNumber] = CELL_TYPE.ENEMY;
        gameState.enemies.push({ rowNumber, columnNumber });

        const startBombermanElement = getCellDomElement(rowNumber, columnNumber);
        startBombermanElement.classList.add(CELL_TYPE.ENEMY);
    }
};

/**
 * Инициализация игрового поля
 */
const initializeGameField = () => {
    createGameField();
    setDomTreeAttributes();
    setBombermanPosition(0, 0);
    setEnemyPosition();
};

const stepLeft = () => {
    if (gameState.bomberman.position.columnNumber === 0) {
        setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            gameFieldWidth - 1
        );
        return;
    }
    if (gameState.bomberman.position.columnNumber > 0) {
        setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            gameState.bomberman.position.columnNumber - 1
        );
    }
}
const stepRight = () => {
    if (gameState.bomberman.position.columnNumber === gameFieldWidth - 1) {
        setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            0
        );
        return;
    }
    if (gameState.bomberman.position.columnNumber < gameFieldWidth - 1) {
        setBombermanPosition(
            gameState.bomberman.position.rowNumber,
            gameState.bomberman.position.columnNumber + 1
        );
    }
}
const stepUp = () => {
    if (gameState.bomberman.position.rowNumber === 0) {
        setBombermanPosition(
            gameFieldHeight - 1,
            gameState.bomberman.position.columnNumber
        );
        return;
    }
    if (gameState.bomberman.position.rowNumber > 0) {
        setBombermanPosition(
            gameState.bomberman.position.rowNumber - 1,
            gameState.bomberman.position.columnNumber
        );
    }
}
const stepDown = () => {
    if (gameState.bomberman.position.rowNumber === gameFieldHeight - 1) {
        setBombermanPosition(
            0,
            gameState.bomberman.position.columnNumber
        );
        return;
    }
    if (gameState.bomberman.position.rowNumber < gameFieldHeight - 1) {
        setBombermanPosition(
            gameState.bomberman.position.rowNumber + 1,
            gameState.bomberman.position.columnNumber
        );
    }
}

const handler = (event) => {
    switch (event.key) {
        case "ArrowLeft":
            stepLeft();
            break;
        case "ArrowRight":
            stepRight();
            break;
        case "ArrowDown":
            stepDown();
            break;
        case "ArrowUp":
            stepUp();
            break;
        case " ":
            // поставить бомбу
            setBombPosition(
                gameState.bomberman.position.rowNumber,
                gameState.bomberman.position.columnNumber
            );
            break;
    }
}
/**
 * Обработчик нажатий на клавиатуре
 */
const setUpKeyboardHandlers = () => {
    document.body.addEventListener("keydown", handler);
};

const addExplodeWaveBombColumn = (explodedBomb, i) => {
    const explodeRowNumber = explodedBomb.rowNumber + i;
    if (explodeRowNumber < 0 || explodeRowNumber >= gameFieldHeight) {
        return;
    }

    //checkGameField(explodeRowNumber, explodedBomb.columnNumber, CELL_TYPE.BOMBERMAN);
    // if (gameField[explodedBomb.rowNumber][explodedBomb.columnNumber] === CELL_TYPE.BOMBERMAN) {
    //     stopGame();
    //     return;
    // }

    // gameState
    gameState.bombExploseCells[
        `${explodeRowNumber},${explodedBomb.columnNumber}`
    ] = Date.now() + Math.abs(i) * stepWave;
}

const addExplodeWaveBombRow = (explodedBomb, i) => {
    const explodeColumnNumber =
        explodedBomb.columnNumber + i;
    if (explodeColumnNumber < 0 || explodeColumnNumber >= gameFieldWidth) {
        return;
    }
    //

    // gameState
    gameState.bombExploseCells[
        `${explodedBomb.rowNumber},${explodeColumnNumber}`
    ] = Date.now() + Math.abs(i) * stepWave;
}

/**
 * Взрыв бомбы, рисование крестика
 */
const explodeBomb = (i) => {
    // удаление иконки бомбы
    const explodedBomb = gameState.bombs.splice(i, 1)[0];
    countExplodeBomb++;
    const elementWithBomb = getCellDomElement(
        explodedBomb.rowNumber,
        explodedBomb.columnNumber
    );
    elementWithBomb.classList.remove(CELL_TYPE.BOMB);

    // рисование взрыва по вертикали (gameState и DOM)
    for (let i = 0; i < gameState.bombExplodeSize; i++) {
        addExplodeWaveBombColumn(explodedBomb, i);
        addExplodeWaveBombColumn(explodedBomb, -i);
    }

    // рисование взрыва по горизонтали (gameState и DOM)
    for (let i = 0; i < gameState.bombExplodeSize; i++) {
        addExplodeWaveBombRow(explodedBomb, i);
        addExplodeWaveBombRow(explodedBomb, -i);
    }
};

/**
 * Проверка что пора бомбе взорваться
 * Вызывается на каждом тике
 */
const checkBombsExplosion = () => {
    const currentTime = Date.now();
    for (let i = gameState.bombs.length - 1; i >= 0; i--) {
        const bomb = gameState.bombs[i];
        if (currentTime - bomb.startTimeMs > bombExplositonTime) {
            // взорвать бомбу
            explodeBomb();
        }
    }
};

/**
 * Тушения взрыва бомб, в gameState и DOM дереве
 * Вызывается каждый тик
 */
const checkBombsStop = () => {
    const currentTime = Date.now();
    for (const explodeCellKey in gameState.bombExploseCells) {
        if (
            currentTime - gameState.bombExploseCells[explodeCellKey] >=
            bombStopTime
        ) {
            // удалить из gameState.bombExploseCells поле
            delete gameState.bombExploseCells[explodeCellKey];

            // убрать из DOM класс
            const [explodeCellRow, explodeCellColumn] = explodeCellKey.split(",");
            const explodeCell = getCellDomElement(explodeCellRow, explodeCellColumn);
            explodeCell.classList.remove(CELL_TYPE.EXPLOSION);
        }
    }
};

const checkBombsStart = () => {
    const currentTime = Date.now();
    for (const explodeCellKey in gameState.bombExploseCells) {
        if (currentTime - gameState.bombExploseCells[explodeCellKey] >= 0) {
            // добавить в DOM класс
            const [explodeCellRow, explodeCellColumn] = explodeCellKey.split(",");
            checkGameField(explodeCellRow, explodeCellColumn, CELL_TYPE.BOMBERMAN);

            const cellForExplode = getCellDomElement(explodeCellRow, explodeCellColumn);
            cellForExplode.classList.add(CELL_TYPE.EXPLOSION);
        }
    }
};

const addCountExplodeBomb = () => {
    const countExplodeBombElement = document.getElementById("countExplodeBomb");
    countExplodeBombElement.innerHTML = countExplodeBomb;
}

/**
 * Обработчик на каждом тике игры
 */
const startGame = () => {
    gameState.gameTickHandler = setInterval(() => {
        checkBombsExplosion();
        checkBombsStart();
        checkBombsStop();
        addCountExplodeBomb();
    }, 1000 / tickPerSecond);
};

/**
 * Остановка обработчика тиков игры
 */
const stopGame = () => {
    clearInterval(gameState.gameTickHandler);
    document.body.removeEventListener("keydown", handler);
    alert("Игра окончена.");
};

initializeGameField();
setUpKeyboardHandlers();
startGame();
