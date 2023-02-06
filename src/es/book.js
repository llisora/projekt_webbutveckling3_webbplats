"use strict";

let url = "https://studenter.miun.se/~liba2103/writeable/webb3/projekt/webservice/bookingapi.php";

const nameInput = document.getElementById("name");
const timeInput = document.getElementById("time");
const dateInput = document.getElementById("date");
const quantityInput = document.getElementById("quantity");
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", createBooking);


//Lägg till kurs
function createBooking(event) {
    event.preventDefault();

    //Sparar värdena för de olika "inputs" som görs när man skapar en kurs
    let name = nameInput.value;
    let time = timeInput.value;
    let date = dateInput.value;
    let quantity = quantityInput.value;

    let messageEl = document.getElementById("message");

    //Kontrollerar om fält är ifyllda, annars kommer felmeddelandet upp
    if (name == "" && time == "" && date == "" && quantity == "") {
        messageEl.innerHTML = "Fyll i alla fält!";
        //Kontrollerar att namn är ifyllt
    } else if (name == "") {
        messageEl.innerHTML = "Du måste fylla i namn!";
        //Kontrollerar att datum är valt
    } else if (!date) {
        messageEl.innerHTML = "Du måste välja datum!";
        //Kontrollerar att tid är valt
    } else if (!time) {
        messageEl.innerHTML = "Du måste välja en tid!";
        //Kontrollerar om antal gäster är valt
    } else if (quantity == "") {
        messageEl.innerHTML = "Du måste välja antal gäster!";
        //Om allt stämmer - skicka med fetch
    } else {
        //Skapar en json textsträng
        let jsonStr = JSON.stringify({
            name: name,
            time: time,
            date: date,
            quantity: quantity
        });
        //Skickar fetch-anrop med post-metod
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: jsonStr
        })
            .then(response => response.json())
            //Rensa formuläret
            .then(data => {
                //Lyckat anrop - skriv ut meddelande
                let messageEl = document.getElementById("message");
                messageEl.innerHTML = "TACK för din bokning! ♥ ";
                clearForm()
            })
            .catch(err => console.log(err))
    }
}


//Rensa formulär 
function clearForm() {
    nameInput.value = "";
    timeInput.value = "";
    dateInput.value = "";
    quantityInput.value = "";
}
