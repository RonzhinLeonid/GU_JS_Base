const temperatureInCelcius = +prompt("Укажите температуру в цельсиях:");
if (temperatureInCelcius < -273.15) {
    alert("Указанная температура ниже температуры абсолютного нуля.");
}
else {
    const temperatureInFahrenheit = (9 / 5) * temperatureInCelcius + 32;
    alert(`Температура в фаренгейтах: ${temperatureInFahrenheit}`);
}
