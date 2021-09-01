const previewImages = document.getElementsByClassName("preview");
const bigImageWrapper = document.querySelector(".central-slide");
const previewImagesWrapper = document.querySelector(".preview-slides");


const setUpNewBigImages = (smallImageSrc) => {
    const bigImageSrc = smallImageSrc.replace("_small.jpg", "_big.jpg");

    isImage(bigImageSrc);
    const newBigImage = document.createElement("img");
    newBigImage.src = bigImageSrc;

    bigImageWrapper.innerHTML = "";
    bigImageWrapper.appendChild(newBigImage);
};

const setUpNewActivePreviewImage = (event) => {
    const activePreviewImage = document.querySelector(".preview-slides .active");
    activePreviewImage.classList.remove("active");

    event.target.parentElement.classList.add("active");
};

const galleryHandler = (event) => {
    if (event.target === event.currentTarget) return;

    setUpNewBigImages(event.target.src);
    setUpNewActivePreviewImage(event);
};

const setUpNewBigImagesLeft = (smallImageSrc) => {
    const bigImageSrc = smallImageSrc.replace("_small.jpg", "_big.jpg");

    const newBigImage = document.createElement("img");
    newBigImage.src = bigImageSrc;

    bigImageWrapper.innerHTML = "";
    bigImageWrapper.appendChild(newBigImage);
};

const setUpNewActivePreviewImageLeft = () => {
    const activePreviewImage = document.querySelector(".preview-slides .active");
    activePreviewImage.classList.remove("active");
    activePreviewImage.previousElementSibling.classList.add("active");
};

const galleryHandlerLeft = (event) => {
    if (event.keyCode === KEY_CODES.LEFT) {
        console.log("f pressed");
        const activePreviewImage = document.querySelector(".preview-slides .active");
        if (activePreviewImage.previousElementSibling === null) return;
        setUpNewBigImages(activePreviewImage.previousElementSibling.firstElementChild.src);
        setUpNewActivePreviewImageLeft(event);
    }
};
const galleryHandlerRight = (event) => {
    if (event.keyCode === KEY_CODES.RIGHT) {
        console.log("d pressed");
        const activePreviewImage = document.querySelector(".preview-slides .active");
        if (activePreviewImage.nextElementSibling === null) return;
        setUpNewBigImages(activePreviewImage.nextElementSibling.firstElementChild.src);
        setUpNewActivePreviewImageRight(event);
    }
};
const setUpNewActivePreviewImageRight = () => {
    const activePreviewImage = document.querySelector(".preview-slides .active");
    activePreviewImage.classList.remove("active");
    activePreviewImage.nextElementSibling.classList.add("active");
};
const KEY_CODES = {
    LEFT: 37,
    RIGHT: 39
};

const isImage = (imageSrc) => {
    const image = new Image();
    image.src = imageSrc;
    image.onerror = function () {
        alert("картинка не существует");
        return false;
    };
}

previewImagesWrapper.addEventListener("click", galleryHandler);
document.body.addEventListener("keyup", galleryHandlerLeft);
document.body.addEventListener("keyup", galleryHandlerRight);