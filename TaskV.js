const infoPopup = document.getElementById("info_Popup")
const overlay = document.getElementById("overlay")
const taskLists = document.getElementsByClassName("TaksList")


showTasks()
function openInfoPopup() {
    infoPopup.classList.add("active")
    overlay.classList.add("active")
}
function closeInfoPopup() {
    infoPopup.classList.remove("active")
    overlay.classList.remove("active")
}

function showTasks() {
    for (let i = 0; i < taskLists.length; i++) {
        let getLocalStorageData = localStorage.getItem(taskLists[i].id);
        if (getLocalStorageData == null) {
            listArray = [];
        } else {
            listArray = JSON.parse(getLocalStorageData);
        }
        let newLiTag = "";
        listArray.forEach((element, index) => {
            newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
        });
        taskLists[i].innerHTML = newLiTag;
    }
}





