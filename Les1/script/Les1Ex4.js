let number = 1000;
let stringWithNumber = "108";
let result = number + stringWithNumber;
alert(`${number} + ${stringWithNumber} = ${result} - ${typeof result}`);
//т.к. одна из переменных является строкой то число будет приведено при сложении так же в строку и произойдет конкатенация строк.
// в результате будет строка 1000108
