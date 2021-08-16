let a = +prompt("Укажите переменную в промежутке [0..15]:");
let rez = "";
switch (a) {
    case 0: rez += "0 ";
    case 1: rez += "1 ";
    case 2: rez += "2 ";
    case 3: rez += "3 ";
    case 4: rez += "4 ";
    case 5: rez += "5 ";
    case 6: rez += "6 ";
    case 7: rez += "7 ";
    case 8: rez += "8 ";
    case 9: rez += "9 ";
    case 10: rez += "10 ";
    case 11: rez += "11 ";
    case 12: rez += "12 ";
    case 13: rez += "13 ";
    case 14: rez += "14 ";
    case 15: rez += "15 ";
        alert(rez);
        break;
    default:
        alert("Введенное значение вне указанного диапазона");

}