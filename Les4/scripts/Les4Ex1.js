class NumberObject {
    constructor(number) {
        this.units = number % 10;
        this.tens = Math.floor((number / 10)) % 10;
        this.hundreds = Math.floor(number / 100);
    }
}

function convertNumberToNumberObject(number) {
    let numberObject;
    if (number > 999) {
        numberObject = {};
        console.log(`${number} больше 999`);
    } else {
        numberObject = new NumberObject(number);
    }
    return numberObject;
}

let number = +prompt("Укажите число до которого вывести простые числа:");
console.log(convertNumberToNumberObject(number));
