function sum(x, y) {
    return (x + y);
}
function dif(x, y) {
    return (x - y);
}
function mult(x, y) {
    return (x * y);
}
function div(x, y) {
    return (x / y);
}
function mathOperation(x, y, operation) {
    return operation(x, y);
}

let a = +prompt("Укажите 1ю переменную:");
let b = +prompt("Укажите 2ю переменную:");
let operation = prompt("Введите знак операции (+, -, *, /)");
let action
switch (operation) {
    case "+":
        action = sum;
        break;
    case "-":
        action = dif;
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
    alert(mathOperation(a, b, action));
}
