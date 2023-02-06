"use strict";

let url = "https://studenter.miun.se/~liba2103/writeable/webb3/projekt/webservice/menyapi.php";


window.onload = init;

function init() {
    //Läsa in kurser
    getFood();
}

//Läsa in meny från webtjänst
function getFood() {
    fetch(url)

        .then(response => response.json())
        .then(data => writeDrinks(data))
        .catch(err => console.log(err))

}

//Skriv ut mat till DOM
function writeDrinks(category) {
    const sodaEl = document.getElementById("soda");
    const wineEl = document.getElementById("wine");
    const beerEl = document.getElementById("beer");

    //Skriver ut till rätt plats beroende på kategori 
    category.forEach(type => {
        if (`${type.category}` == "Alkoholfritt") {
            sodaEl.innerHTML +=
                `<b>${type.name}</b><br> 
        <i>${type.description}<br> </i>
        ${type.price} kr <br><br>`
        }
        if (`${type.category}` == "Öl") {
            beerEl.innerHTML +=
                `<b>${type.name}</b><br>
        <i>${type.description} <br></i>
        ${type.price} kr<br><br>`
        }
        if (`${type.category}` == "Vin") {
            wineEl.innerHTML +=
                `<b>${type.name}</b><br> 
        <i>${type.description}<br> </i>
        ${type.price} kr<br>`
        }
    });

}