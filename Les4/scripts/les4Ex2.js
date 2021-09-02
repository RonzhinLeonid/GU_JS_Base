const gameField = [
    [null, null, "goblin", null, null, null, null, "troll", null, null],
    ["goblin", null, null, "troll", null, "cyclops", null, null, "goblin", null],
    [null, null, "troll", null, "goblin", null, "goblin", null, null, "cyclops"],
    ["goblin", null, "goblin", null, null, "cyclops", null, null, "goblin", null],
    [null, null, null, null, "goblin", null, "cyclops", "troll", null, "troll"],
    ["troll", "goblin", "cyclops", "goblin", null, null, "goblin", null, "cyclops", null],
    [null, null, null, null, null, "cyclops", null, null, null, null],
    [null, "cyclops", null, "goblin", "cyclops", null, null, "goblin", null, "troll"],
    ["troll", null, "goblin", null, "goblin", "troll", null, null, null, null],
    [null, "goblin", null, null, null, null, "troll", "goblin", null, "dragon"],
];

class LogPosition {
    constructor(position) {
        this.x = position.x;
        this.y = position.y;
    }
    toString() {
        return `Позиция игрока: x:${this.x}, y:${this.y}`;
    }
}
class LogFight {
    constructor(position, enemyName, enemyPower, playerPower, isPlayerWin) {
        this.position = position;
        this.enemyName = enemyName;
        this.playerPower = playerPower;
        this.enemyPower = enemyPower;
        this.isPlayerWin = isPlayerWin;
    }
    toString() {
        return `Игрок ${this.isPlayerWin ? "победил" : "проиграл"} ${this.enemyName} с силой ${this.enemyPower},
        на клетке x:${this.position.x}, y:${this.position.y},\nСила игрока после боя стала: ${this.playerPower}`;
    }
}

class Logger {
    constructor() {
        this.logger = [];
    }

    logPosition(position) {
        const movementLog = new LogPosition(position);
        this.logger.push(movementLog);
    }

    logFight(position, enemyName, enemyPower, playerPower, isPlayerWin) {
        const fightLog = new LogFight(position, enemyName, enemyPower, playerPower, isPlayerWin);
        this.logger.push(fightLog);
    }

    readLog(step) {
        return this.log[step].toString();
    }
}

const logger = new Logger();

const MONSTERS = {
    goblin: {
        power: 10,
    },
    troll: {
        power: 20,
    },
    cyclops: {
        power: 50,
    },
    dragon: {
        power: 100,
    },
};

const stateOfGame = {
    player: {
        power: 10,
        position: {
            x: 0,
            y: 0,
        },
    },
};

const GAME_FIELD_SIZE = {
    WIDTH: gameField[0].length,
    HEIGHT: gameField.length,
};

const MOVEMENTS_OF_PLAYER = {
    up: "up",
    down: "down",
    right: "right",
    left: "left",
    endGame: "endGame"
};

const movementsOfPlayer = {
    up: () => {
        stateOfGame.player.position.y -= 1;
        logger.logPosition(stateOfGame.player.position);
    },
    down: () => {
        stateOfGame.player.position.y += 1;
        logger.logPosition(stateOfGame.player.position);
    },
    right: () => {
        stateOfGame.player.position.x += 1;
        logger.logPosition(stateOfGame.player.position);
    },
    left: () => {
        stateOfGame.player.position.x -= 1;
        logger.logPosition(stateOfGame.player.position);
    }
};

const validation = () => {
    // TODO: проверить всё ли игровое поле корректное
    // TODO: проверить все ли строки одинаковые
};

const getAvailableMovements = () => {
    const availableMovements = [];

    if (stateOfGame.player.position.y >= 1) {
        availableMovements.push(MOVEMENTS_OF_PLAYER.up);
    }

    if (stateOfGame.player.position.y < GAME_FIELD_SIZE.HEIGHT - 1) {
        availableMovements.push(MOVEMENTS_OF_PLAYER.down);
    }

    if (stateOfGame.player.position.x >= 1) {
        availableMovements.push(MOVEMENTS_OF_PLAYER.left);
    }

    if (stateOfGame.player.position.x < GAME_FIELD_SIZE.WIDTH - 1) {
        availableMovements.push(MOVEMENTS_OF_PLAYER.right);
    }

    return availableMovements;
};

const getMessageForMovement = (availableMovements) => {
    const movementString = `Введите направление движения(${availableMovements.join(
        ", "
    )}): `;
    const currentCoordinatesString = `Текущие координаты x: ${stateOfGame.player.position.x} y: ${stateOfGame.player.position.y}`;

    return `${currentCoordinatesString}\n${movementString}`;
};

while (true) {
    const availableMovements = getAvailableMovements();
    const stringMovementOfPlayer = prompt(
        getMessageForMovement(availableMovements)
    );
    if (stringMovementOfPlayer === MOVEMENTS_OF_PLAYER.endGame) {
        alert("Вы завершили игру");
        break;
    }
    if (availableMovements.indexOf(stringMovementOfPlayer) === -1) {
        let moveNumber = parseInt(stringMovementOfPlayer);
        if (!isNaN(moveNumber)) {
            if (moveNumber < logger.logger.length) {
                alert(logger.logger[moveNumber].toString());
            }
            continue;
        }
        // некорректный ввод
        alert("Некорректный ввод, попробуйте еще раз");
        continue;
    }

    movementsOfPlayer[stringMovementOfPlayer]();

    // проверка на монстра
    const gameCell =
        gameField[stateOfGame.player.position.y][stateOfGame.player.position.x];
    if (gameCell === null) {
        continue;
    }

    const monster = MONSTERS[gameCell];

    // сражение с монстром
    let messageOfBattle = `Вы встретили монстра ${gameCell}\n`;
    if (stateOfGame.player.power >= monster.power) {
        stateOfGame.player.power += monster.power;
        messageOfBattle += "Вы выиграли\n";
        messageOfBattle += `Ваша сила теперь ${stateOfGame.player.power}`;
        logger.logFight(stateOfGame.player.position, gameCell, monster.power, stateOfGame.player.power, true);
        alert(messageOfBattle);
    } else {
        messageOfBattle += "Вы проиграли\n";
        messageOfBattle += "Конец игры";
        logger.logFight(stateOfGame.player.position, gameCell, monster.power, stateOfGame.player.power, false);
        alert(messageOfBattle);
    }
}
