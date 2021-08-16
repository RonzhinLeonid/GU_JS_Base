let a = +prompt("Укажите 1ю переменную:");
let b = +prompt("Укажите 2ю переменную:");
if (a >= 0 && b >= 0) {
    alert(a - b);
}
else if (a < 0 && b < 0) {
    alert(a * b);
}
else {
    alert(a + b);
}
