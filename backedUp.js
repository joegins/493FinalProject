let dragindex = 0;
let dropindex = 0;
let clone = "";
var img = document.createElement("img");
img.src = "LEAF.svg";

function startPomodoroFunction(){
    var img = document.createElement("img");
    img.src = "slowedGif.gif"
    img.id = "leaves";
    var imgSrc  = document.getElementById("leaves");
    imgSrc.appendChild(img);
}

function pausePomodoroFunction(){
   console.log('paused');
   setTimeout(function () {graduallyFadeAndRemoveElement(img)}, 5000);
}

function graduallyFadeAndRemoveElement(elementObj){
    // Fade to 0 opacity over 2 seconds

    var element = document.getElementById("leaves");

    elementObj.fadeTo(2000, 0, function(){
        element.parentNode.removeChild(element);
    });
        
  }

function resetPomodoroFunction(){
  reset();
  document.getElementById("leaves").remove();
  console.log("reset");
}

var breakStarting = new Audio('breakstarting.mp3');
function allowDrop(ev) {
    ev.preventDefault();
}

document.body.className = "day";
function toggleBackground()
{
  let checkBox = document.getElementById("check");
  
  if(document.body)
  {
    if(checkBox.checked == true)
    {
      document.body.className = "night";
    }
    else
    {
      document.body.className = "day";
    }
  }
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

function startAnimation()
{
    console.log(document);
    console.log('running');
    document.getElementById("circle").classList.remove("paused");
    document.getElementById("circle").classList.add("run");
}


//circle start
let progressBar = document.querySelector('.e-c-progress');
let indicator = document.getElementById('e-indicator');
let pointer = document.getElementById('e-pointer');
let length = Math.PI * 2 * 100;

progressBar.style.strokeDasharray = length;

function update(value, timePercent) {
  var offset = - length - length * value / (timePercent);
  progressBar.style.strokeDashoffset = offset; 
  pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`; 
};

//circle ends
const displayOutput = document.querySelector('.display-remain-time')
const pauseBtn = document.getElementById('pause');
const setterBtns = document.querySelectorAll('button[data-setter]');

let intervalTimer;
let timeLeft;
let wholeTime = 20 * 60; // manage this to set the whole time 
let isPaused = false;
let isStarted = false;

let setToFive = 1; // default is that it should go to 5 after first countdown to 0

update(wholeTime,wholeTime); //refreshes progress bar
displayTimeLeft(wholeTime);

function changeWholeTime(seconds){
  if ((wholeTime + seconds) > 0){
    wholeTime += seconds;
    update(wholeTime,wholeTime);
  }
}

for (var i = 0; i < setterBtns.length; i++) {
    setterBtns[i].addEventListener("click", function(event) {
        var param = this.dataset.setter;
        switch (param) {
            case 'minutes-plus':
                changeWholeTime(1 * 60);
                break;
            case 'minutes-minus':
                changeWholeTime(-1 * 60);
                break;
            case 'seconds-plus':
                changeWholeTime(1);
                break;
            case 'seconds-minus':
                changeWholeTime(-1);
                break;
        }
      displayTimeLeft(wholeTime);
    });
}

function resetToFiveMinutes()
{
  breakStarting.play();
  wholeTime = 5 * 60;
  progressBar.style.stroke = '#8acaed';
  pointer.style.stroke = '#8acaed';
  displayOutput.style.color = '#8acaed';
}

function resetToTwentyMinutes()
{
  breakStarting.play();
  wholeTime = 20 * 60;
  progressBar.style.stroke = '#F7958E';
  pointer.style.stroke = '#F7958E';
  displayOutput.style.color = '#F7958E';
}

function timer (seconds){ //counts time, takes seconds
  let remainTime = Date.now() + (seconds * 1000);
  displayTimeLeft(seconds);
  
  intervalTimer = setInterval(function(){
    timeLeft = Math.round((remainTime - Date.now()) / 1000);
    if(timeLeft < 0){
      if(setToFive == 1)
      {
        resetToFiveMinutes();
        setToFive = 0;
      }
      else if (setToFive == 0)
      {
        resetToTwentyMinutes();
        setToFive = 1;
      }
      clearInterval(intervalTimer);
      isStarted = false;
      setterBtns.forEach(function(btn){
        btn.disabled = false;
        btn.style.opacity = 1;
      });
      displayTimeLeft(wholeTime);
      pauseBtn.classList.remove('pause');
      pauseBtn.classList.add('play');
      return ;
    }
    displayTimeLeft(timeLeft);
  }, 1000);
}

function pauseTimer(event){
  if(isStarted === false){
    timer(wholeTime);
    isStarted = true;
    this.classList.remove('play');
    this.classList.add('pause');
    startPomodoroFunction();
    setterBtns.forEach(function(btn){
      btn.disabled = true;
      btn.style.opacity = 0.5;
    });

  } else if(isPaused){
    this.classList.remove('play');
    this.classList.add('pause');
    timer(timeLeft);
    isPaused = isPaused ? false : true
  }else{
    pausePomodoroFunction();
    this.classList.remove('pause');
    this.classList.add('play');
    clearInterval(intervalTimer);
    isPaused = isPaused ? false : true ;
  }
}

function displayTimeLeft (timeLeft){ //displays time on the input
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  displayOutput.textContent = displayString;
  update(timeLeft, wholeTime);
}

pauseBtn.addEventListener('click',pauseTimer);

function reset()
{
  clearInterval(intervalTimer);
  isStarted = false;
  isPaused = false;
  setterBtns.forEach(function(btn){
    btn.disabled = false;
    btn.style.opacity = 1;
  });
  displayTimeLeft(wholeTime);
  pauseBtn.classList.remove('pause');
  pauseBtn.classList.add('play');
  return ;
}




*{margin: 0px; padding: 0px}

body{
  background:#2c3e50;
  font-family: 'Open Sans', sans-serif;
}

 button{
  color:#fff;
  text-align: center;
  padding: 20px;
}

 .button-three{
  text-align: center;
  cursor: pointer;
  font-size:20px;
}

/*Button Three*/
.button-three {
    position: relative;
    background-color: #F7958E;
    border: none;
    padding: 20px;
    width: 200px;
    text-align: center;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
}

.button-three:hover{
   background:#fff;
   box-shadow:0px 2px 10px 5px #97B1BF;
   color:#000;
}

.button-three:after {
    content: "";
    background: #F7958E;
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px !important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.8s
}

.button-three:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s
}