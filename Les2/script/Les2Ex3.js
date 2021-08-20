let firstNumber = +prompt("Укажите 1ю переменную:");
let secondNumber = +prompt("Укажите 2ю переменную:");
if (firstNumber >= 0 && secondNumber >= 0) {
    alert(firstNumber - secondNumber);
}
else if (firstNumber < 0 && secondNumber < 0) {
    alert(firstNumber * secondNumber);
}
else {
    alert(firstNumber + secondNumber);
}
