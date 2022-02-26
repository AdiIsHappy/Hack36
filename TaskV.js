const infoPopup = document.getElementById("info_Popup")
const overlay = document.getElementById("overlay")


console.log("something");

function openInfoPopup (){
    infoPopup.classList.add("active")
    overlay.classList.add("active")
}
function closeInfoPopup (){
    infoPopup.classList.remove("active")
    overlay.classList.remove("active")
}




