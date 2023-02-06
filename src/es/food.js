"use strict";

let url = "https://studenter.miun.se/~liba2103/writeable/webb3/projekt/webservice/menyapi.php";


window.onload = init;

function init() {
    //Läsa in kurser
    getFood();
}

//Läsa in mat från webtjänst
function getFood() {
    fetch(url)

        .then(response => response.json())
        .then(data => writeFood(data))
        .catch(err => console.log(err))

}

//Skriv ut mat till DOM
function writeFood(category) {
    const starterEl = document.getElementById("starter");
    const mainEl = document.getElementById("main");
    const dessertEl = document.getElementById("dessert");


    //Skriver ut till rätt plats beroende på kategori
    category.forEach(type => {
        if (`${type.category}` == "Förrätt") {
            starterEl.innerHTML +=
                `<b>${type.name}</b> <br>
        <i>${type.description}</i> <br>
        ${type.price} kr <br><br>`
        }
        if (`${type.category}` == "Varmrätt") {
            mainEl.innerHTML +=
                `<b>${type.name}</b><br> 
        <i>${type.description} </i><br>
        ${type.price} kr<br><br>`
        }
        if (`${type.category}` == "Efterrätt") {
            dessertEl.innerHTML +=
                `<b>${type.name}</b><br> 
        <i>${type.description} </i><br>
        ${type.price} kr<br>`
        }
    });

}

