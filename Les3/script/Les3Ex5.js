console.log("Простой вариант:");
let row = "";
for (let i = 0; i < 20; i++) {
    console.log(row += "*");
}

console.log("Вариант №2:");
row = "*";
for (let i = 0; i < 20; i++) {
    console.log(getIndent(20 - i) + row);
    row += "**";
}

function getIndent(count) {
    indent = "";
    for (let i = 0; i < count; i++) {
        indent += " ";
    }
    return indent;
}
