const infoPopup = document.getElementById("info_Popup")
const addTaskPopup = document.getElementById("Add_Task_popup")
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
function openAddTaskPopup() {
    addTaskPopup.classList.add("active")
    overlay.classList.add("active")
}
function closeAddTaskPopup() {
    addTaskPopup.classList.remove("active")
    overlay.classList.remove("active")
}

overlay.onclick = ()  => {
    closeAddTaskPopup()
    closeInfoPopup()
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





