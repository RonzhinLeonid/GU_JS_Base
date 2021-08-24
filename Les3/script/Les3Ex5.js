const rows = 20;
console.log("Простой вариант:");
let row = "";
for (let i = 0; i < rows; i++) {
    console.log(row += "*");
}

console.log("Вариант №2:");
row = "*";
for (let i = 0; i < rows; i++) {
    console.log(getIndent(rows - i) + row);
    row += "**";
}

function getIndent(count) {
    indent = "";
    for (let i = 0; i < count; i++) {
        indent += " ";
    }
    return indent;
}
