function povRec(val, pow) {
    if (pow === 0) return 1;
    else return val * povRec(val, pow - 1);
}

let val = +prompt("Укажите число:");
let pow = +prompt("Укажите степень:");

alert(povRec(val, pow));
