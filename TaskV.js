const infoPopup = document.getElementById("info_Popup")
const addTaskPopup = document.getElementById("Add_Task_popup")
const overlay = document.getElementById("overlay")
const taskLists = document.getElementsByClassName("TaksList")

// thses all are inputs from add task form 
const Title = document.getElementById("title")
const R1 = document.getElementById("1")
const R2 = document.getElementById("2")
const R3 = document.getElementById("3")
const R4 = document.getElementById("4")
const Sdate = document.getElementById("StartDate")
const Stime = document.getElementById("StartTime")
const Link = document.getElementById("Link")
const desc = document.getElementById("Description")
const reset = document.getElementById("Reset")
const addBtn = document.getElementById("AddToTask")



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

function resetInputs() {
    Title.value = ""
    R1.value = ""
    R2.value = ""
    R3.value = ""
    R4.value = ""
    Sdate.value = ""
    Stime.value = ""
    Link.value = ""
    desc.value = ""
}

reset.onclick = resetInputs()

overlay.onclick = () => {
    closeAddTaskPopup()
    closeInfoPopup()
}

addBtn.onclick = () => {

    if (R1.checked) {
        typo = 1
        Storagename = "I_U_L"
    } else if (R2.checked) {
        typo = 2
        Storagename = "NI_U_L"
    } else if (R3.checked) {
        typo = 3
        Storagename = "I_NU_L"
    } else if (R4.checked) {
        typo = 4
        Storagename = "NI_NU_L"
    } else {
        alert("Please select type of Task")
        return;
    }
    console.log(Title.value);
    task = {
        title: Title.value,
        type: typo,
        startDate: Sdate.value,
        startTime: Stime.value,
        link: Link.value,
        description: desc.value
    }

    let getLocalStorageData = localStorage.getItem(Storagename);
    if (getLocalStorageData == null) { //if localstorage has no data
        listArray = []; //create a blank array
    } else {
        listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
    }
    listArray.push(task); //pushing or adding new value in array
    localStorage.setItem(Storagename, JSON.stringify(listArray));
    showTasks()
    resetInputs()
}


function showTasks() {
    for (let i = 0; i < taskLists.length; i++) {
        let getLocalStorageData = localStorage.getItem(taskLists[i].id);
        console.log(taskLists[i].id);
        if (getLocalStorageData == null) {
            listArray = [];
        } else {
            listArray = JSON.parse(getLocalStorageData);
        }
        let newLiTag = "";
        listArray.forEach((element, index) => {
            newLiTag += `<li>
                            <button onclick="showDetails(this)">${element.title}</button>
                            <ul class = "ShowDetialOfTask">
                                <li>deadline : ${element.startDate || ""} ${element.Stime || ""}</li>
                                <li>link : ${element.Link || "not given"}</li>
                                <li>description : ${element.desc || "no description provided"}</li>
                            </ul>
                        </li>`
        });
        taskLists[i].innerHTML = newLiTag;
    }
}

function showDetails(element){
    element.parentElement.lastElementChild.classList.add("active")
}





