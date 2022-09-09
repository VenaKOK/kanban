let textarea = document.querySelector("textarea");

textarea.placeholder = "citron \nbanane";

function start(e) {
    e.dataTransfer.effectAllowed="move";
    e.dataTransfer.setData("text/plain", e.target.getAttribute("id"));
}

function over() {
    return false;
}

function dropBin(e) {
    e.preventDefault();
    var ob = e.dataTransfer.getData("text/plain");
    document.getElementById(ob).remove();
}

function drop(e) {
    e.preventDefault();
    var ob = e.dataTransfer.getData("text/plain");
    e.currentTarget.appendChild(document.getElementById(ob));
}

/*créer les notes */
let div, h4, p, time, date;
let count =1;

let noteTitle = document.querySelector("#noteTitle");
console.log(noteTitle.value);
let noteContent = document.querySelector("#noteContent");
console.log(noteContent.value);
let boardNote = document.querySelector(".boardNote")

function createElementHtmlNote() {
    div = document.createElement("div");
    h4 = document.createElement("h4");
    p = document.createElement("p");
    time = document.createElement("time");

}

function appendElement() {
    boardNote.appendChild(div);
    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(time);
}

function setAttributeElement() {
    div.setAttribute("draggable","true");
    div.setAttribute("id",`${count}`);
    div.classList.add("note");
    h4.classList.add("noteTitle");
}

/* permet de récupérer la date et heure ex : jeudi 8 septembre 2022 à 10:30:40*/
function createDate() {
    date = new Intl.DateTimeFormat("fr" , {
        timeStyle: "medium",
        dateStyle: "full"
    }).format(Date.now());
}

function fillElementHtmlNote() {
    h4.textContent = noteTitle.value;
    p.textContent = noteContent.value;
    time.textContent = date;
}

function saveData() {
    var note = {
        id : count,
        title : noteTitle.value,
        content : noteContent.value,
        time : date
    }
    localStorage.setItem(`note${note.id}`, JSON.stringify(note));
}


var tabNote = Object.entries(localStorage).filter(function (elem) {
    return elem[0].startsWith("note");
}).map(function (elem) {
    return JSON.parse(elem[1])
});

console.log(tabNote);
tabNote.sort(function (elem1, elem2) {
    return elem1.id - elem2.id;
})

console.log(tabNote);

function reloadData(note) {
    
}


function createNote() {
    createElementHtmlNote();
    appendElement();
    setAttributeElement();
    createDate();
    fillElementHtmlNote();
    saveData();
    count++;
}

function clearField() {
    noteTitle.value ="";
    noteContent.value = "";
}

/* clic bouton valider pour créer les notes */

let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    createNote();
    clearField();
});


/* Local Storage */
// localStorage.setItem(key, value) key et value en string
// localStorage.getItem(key)
// localStorage.clear();




