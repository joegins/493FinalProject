let dragindex = 0;
let dropindex = 0;
let clone = "";

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    clone = ev.target.cloneNode(true);
    var data = ev.dataTransfer.getData("text");
    data.innerHTML = ev.dataTransfer.getData("text");
    ev.target.appendChild(data);
    let todolist = document.getElementById("app-4").childNodes;
    for (let i = 0; i < todolist.length; i++) {
        if (todolist[i].id === data) {
            dragindex = i;
        }

    }

    document.getElementById("app-4").replaceChild(document.getElementById(data), ev.target);

    document.getElementById("app-4").insertBefore(clone, document.getElementById("app-4").childNodes[dragindex]);

}



var countdown = 20;
console.log(document.getElementById("countdown-number"));
console.log($('#countdown-number'));
var countdownNumber = document.getElementById("countdown-number");
countdownNumber.textContent = countdown;

setInterval(function() {
    countdown = --countdown <= 0 ? 20 : countdown;
    countdownNumber.textContent = countdown;
}, 1000);


