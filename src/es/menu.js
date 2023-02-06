//Mobilmeny - vid klick visas "links-mobile"
function menu() {
    var x = document.getElementById("links-mobile");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }