let squeres = document.querySelectorAll(".squere");
let message = document.querySelector("#message");
let colorDisplay = document.querySelector("#displayColor");

let newColorBtn = document.querySelector("#newColorBtn");
let easyBtn = document.querySelector("#easyBtn");
let hardBtn = document.querySelector("#hardBtn");
let h1Header = document.querySelector("h1");

let colorArray = [];
let correctColor = 0;
let squeresToShow = 3;

function randonRGB() {
    let r = Math.round(Math.random()*255);
    let g = Math.round(Math.random()*255);
    let b = Math.round(Math.random()*255);

    return `rgb(${r}, ${g}, ${b})`;
}

function populateArray(squeresToShow) {
    colorArray=[];
    for(let i = 0; i < squeresToShow; i++) {
        colorArray[i] = randonRGB();
    }
}

function displayRandomColors() {
    for(let i = 0; i < squeres.length; i++) {
        if(colorArray[i]) {
            squeres[i].style.backgroundColor = colorArray[i];
            squeres[i].addEventListener("click", handleSquereClick);
            squeres[i].style.display = "block";
        }
        else {
            squeres[i].style.display = "none";
        }
    }
}

function init() {
    newColorBtn.addEventListener("click", () => {
        reset();
    });
    easyBtn.addEventListener("click", () => {
        squeresToShow = 3;
        easyBtn.classList.add("selected");
        hardBtn.classList.remove("selected");
        reset();
    });
    hardBtn.addEventListener("click", () => {
        squeresToShow = 6;
        hardBtn.classList.add("selected");
        easyBtn.classList.remove("selected");
        reset();
    });
    reset();
}

function reset() {
    h1Header.style.backgroundColor = "steelblue";
    newColorBtn.textContent = "New color"
    message.textContent = "";
    populateArray(squeresToShow);
    correctColor = colorArray[Math.round(Math.random()*(squeresToShow-1))];
    colorDisplay.textContent = correctColor;
    displayRandomColors();
}

function handleSquereClick(e) {
    if(this.style.backgroundColor === correctColor) {
        message.textContent = "CORRECT";
        for(let i = 0; i < colorArray.length; i++) {
            squeres[i].style.backgroundColor = correctColor;
        }
        h1Header.style.backgroundColor = correctColor;
        newColorBtn.textContent = "Play again?"
    }
    else {
        this.style.backgroundColor = "#232323";
        message.textContent = "TRY AGAIN";
    }
}

init();