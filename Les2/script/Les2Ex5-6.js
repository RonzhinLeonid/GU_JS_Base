function sum(x, y) {
    return x + y;
}
function diff(x, y) {
    return x - y;
}
function mult(x, y) {
    return x * y;
}
function div(x, y) {
    return x / y;
}
function mathOperation(x, y, operation) {
    return operation(x, y);
}

function mathOperation_V2(x, y, operation) {
    switch (operation) {
        case "+":
            return sum(x, y);
        case "-":
            return diff(x, y);
        case "*":
            return mult(x, y);
        case "/":
            return div(x, y);
        default:
            console.log("Неверная операция");
            break;
    }
}

let firstNumb = +prompt("Укажите 1ю переменную:");
let secondNumb = +prompt("Укажите 2ю переменную:");
let operation = prompt("Введите знак операции (+, -, *, /)");
let action
switch (operation) {
    case "+":
        action = sum;
        break;
    case "-":
        action = diff;
        break;
    case "*":
        action = mult;
        break;
    case "/":
        action = div;
        break;
    default:
        action = NaN;
        alert("Неверная операция");
        break;
}

if (action != NaN) {
    alert(mathOperation(firstNumb, secondNumb, action));
}

alert(mathOperation_V2(firstNumb, secondNumb, operation));
