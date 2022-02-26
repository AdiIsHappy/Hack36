const infoPopup = document.getElementById("info_Popup")
const addTaskPopup = document.getElementById("Add_Task_popup")
const overlay = document.getElementById("overlay")
const taskLists = document.getElementsByClassName("TaksList")
let previouslyOpened = null;
const quotes = ["Genius is one percent inspiration and ninety-nine percent perspiration.",
    "The more you know yourself, the more you forgive yourself.",
    "Someone remembers, someone cares; your name is whispered in someone's prayers.",
    "Without faith, nothing is possible. With it, nothing is impossible.",
    "Once we accept our limits, we go beyond them.",
    "Don't be pushed by your problems; be led by your dreams.",
    "Whatever we expect with confidence becomes our own self-fulfilling prophecy.",
    "Everything you can imagine is real.",
    "Fear is a arkroom where negatives develop.",
    "The truest wisdom is a resolute determination.",
    "Life is the flower for which love is the honey.",
    "Freedom is the right to live as we wish.",
    "Change your thoughts, change your life!",
    "No one saves us but ourselves. No one can and no one may. We ourselves must walk the path.",
    "The moment one gives close attention to anything, it becomes a mysterious, awesome, indescribably magnificent world in itself.",
    "Happiness is when what you think, what you say, and what you do are in harmony.",
    "The greatest antidote to insecurity and the sense of fear is compassion it brings one back to the basis of one's inner strength",
    "Courage is the discovery that you may not win, and trying when you know you can lose.",
    "To be thoughtful and kind only takes a few seconds compared to the timeless hurt caused by one rude gesture.",
  
]
document.getElementById("RandomQuotes").innerText = quotes[Math.floor(Math.random()*quotes.length)]
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
const clearAllButton = document.getElementById("Calender_Button")


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

    let getLocalStorageData = localStorage.getItem(Storagename);
    if (getLocalStorageData == null) { //if localstorage has no data
        listArray = []; //create a blank array
    } else {
        listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
    }
    task = {
        storageName : Storagename,
        id : listArray.length,
        title: Title.value,
        type: typo,
        startDate: Sdate.value,
        startTime: Stime.value,
        link: Link.value,
        description: desc.value
    }

    listArray.push(task); //pushing or adding new value in array
    localStorage.setItem(Storagename, JSON.stringify(listArray));
    showTasks()
    resetInputs()
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
            newLiTag += `<li>
                            <button onclick="showDetails(this)">${element.title}</button>
                            <button onclick = "deleteTask(this)", class = "${element.storageName} ${element.id}"S>done</button>
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

function showDetails(element) {
    if (previouslyOpened != null) {
        previouslyOpened.classList.remove("active")
    }
    element.parentElement.lastElementChild.classList.add("active")
    previouslyOpened =  element.parentElement.lastElementChild
}

function deleteTask(element) {
    const deleteStorageName = element.classList[0]
    const deleteIndex = element.classList[1]
    let getLocalStorageData = localStorage.getItem(deleteStorageName);
    if (getLocalStorageData == null) {
        return
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    listArray.splice(deleteIndex, 1)
    for (let i = deleteIndex; i < listArray.length; i++) {
        listArray[i].id -= 1
    }
    console.log(deleteIndex - 1);
    localStorage.setItem(deleteStorageName, JSON.stringify(listArray));
    showTasks()
    
}

clearAllButton.onclick = () => {
    localStorage.clear()
    showTasks()
}



