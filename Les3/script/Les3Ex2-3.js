let basket = [
    { name: "Товар №1", price: 100, amount: 1 },
    { name: "Товар №2", price: 90, amount: 3 },
    { name: "Товар №3", price: 110, amount: 5 },
    { name: "Товар №4", price: 115, amount: 4 },
    { name: "Товар №5", price: 200, amount: 8 }
];

function countBasketPrice(basket) {
    let fullPrice = 0;
    basket.forEach((product) => {
        fullPrice += product.price * product.amount;
    });
    return fullPrice;
}

alert(`Полная стоимость товаров в корзине составляет ${countBasketPrice(basket)} у.е.`);
