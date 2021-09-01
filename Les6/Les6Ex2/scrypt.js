const textButton = "В корзину";
const basket = [];

var products = {
    "131311": {
        "name": "Банан",
        "cost": 30,
        "img": "https://cdn2.iconfinder.com/data/icons/jetflat-fruits/90/002_014_banana_banan_plant_herb_fruit_food-128.png",
        "sklad": "да"
    },
    "131312": {
        "name": "Помидор",
        "cost": 40,
        "img": "https://cdn0.iconfinder.com/data/icons/nature-life-in-color/128/tomato-color-128.png",
        "sklad": "нет"
    },
    "131313": {
        "name": "Клубника",
        "cost": 60,
        "img": "https://cdn3.iconfinder.com/data/icons/fruits-and-vegetables-13/32/strawberry-fruit-berry-128.png",
        "sklad": "да"
    }
};

const createСontainer = () => {
    const divСontainer = document.createElement("div");
    divСontainer.className = "container";
    return divСontainer;
}

const createProduct = (product, code) => {
    const divProduct = document.createElement("div");
    divProduct.className = "product";
    divProduct.id = code;

    divProduct.appendChild(createImgElement(product.img, product.name));
    divProduct.appendChild(createSpanElement(`${product.name}<br>Цена: ${product.cost}<br>Наличие:${product.sklad}`));
    divProduct.appendChild(createButtonElement(textButton));

    return divProduct;
}

const createBasket = () => {
    const divBasket = document.createElement("div");
    divBasket.className = "basket";

    divBasket.appendChild(createSpanElement("Ваша корзина пуста."));
    divBasket.appendChild(createImgElement("https://image.flaticon.com/icons/png/512/3081/3081797.png", "Корзина"));

    return divBasket;
}

const createImgElement = (img, altText) => {
    const imageProduct = document.createElement("img");
    imageProduct.setAttribute('src', img);
    imageProduct.setAttribute('alt', altText);
    return imageProduct;
}

const createSpanElement = (text) => {
    const infoProduct = document.createElement("span");
    infoProduct.innerHTML = text;
    return infoProduct;
}

const createButtonElement = (text) => {
    const button = document.createElement("button");
    button.innerHTML = text;
    return button;
}

const createShop = () => {
    const container = createСontainer();
    container.appendChild(createBasket());
    for (let key in products) {
        container.appendChild(createProduct(products[key], key));
    }
    document.body.appendChild(container);
}

const addProductToBacket = (event) => {
    if (event.target.innerHTML !== textButton) return;
    const codeProduct = event.target.parentNode.id;

    if (products[codeProduct].sklad === "нет") {
        alert("Товара нет на складе.");
        return;
    }

    if (!checkProductInBacket(products[codeProduct].name)) {
        basket.push({ name: products[codeProduct].name, price: products[codeProduct].cost, amount: 1 });
    } else {
        addProductInBacket(products[codeProduct].name);
    }

    const backetElement = document.querySelector(".container .basket span");
    backetElement.innerHTML = `Товаров в корзине:  ${countBasketProduct()}<br>Стоимость: ${countBasketPrice()}`;
};

const countBasketPrice = () => {
    return basket.reduce(function (fullPrice, product) {
        return fullPrice + product.price * product.amount;
    }, 0);
}

const countBasketProduct = () => {
    return basket.reduce(function (fullCount, product) {
        return fullCount + product.amount;
    }, 0);
}

const checkProductInBacket = (nameProduct) => {
    for (let index in basket) {
        if (basket[index].name === nameProduct) return true;
    }
    return false;
}

const addProductInBacket = (nameProduct) => {
    for (let index in basket) {
        if (basket[index].name === nameProduct) basket[index].amount += 1;
    }

}

createShop();

const containerShop = document.querySelector(".container");
containerShop.addEventListener("click", addProductToBacket);
