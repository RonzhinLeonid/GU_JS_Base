function isPrimeNumber(x) {
    if (x <= 1) return false;
    for (let i = 2; i < x; i++) {
        if (x % i == 0) {
            return false;
        }
    }
    return true;
}

function primeNumbers(n) {
    let result = "";
    let a = 0;
    while (a <= n) {
        if (isPrimeNumber(a)) {
            result += `${a} `;
        }
        a++;
    }
    return result;
}

let maxNumber = +prompt("Укажите число до которого вывести простые числа:");
alert(primeNumbers(maxNumber));
