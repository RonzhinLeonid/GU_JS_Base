function IsPrimeNumber(x) {
    let result = true;
    if (x > 1) {
        for (let i = 2; i < x; i++) {
            if (x % i == 0) {
                result = false;
                break;
            }
        }
    }
    else {
        result = false;
    }
    return result;
}

function PrimeNumbers(n) {
    let result = "";
    let a = 0;
    while (a <= n) {
        if (IsPrimeNumber(a)) {
            result += `${a} `;
        }
        a++;
    }
    return result;
}
let maxNumber = +prompt("Укажите число до которого вывести простые числа:");
alert(PrimeNumbers(maxNumber));
