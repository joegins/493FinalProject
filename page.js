let dragindex = 0;
let dropindex = 0;
let clone = "";
let leafArray = new Array();
let leafCount = 0;

function startPomodoroFunction(){

    var img = document.createElement("img");
    img.src = "LEAF.svg";

    if(leafCount > 0){ 
        img.style.top = leafArray[leafCount-1].style.top + img.height;
        console.log(img.style.top);
        console.log(leafArray.length);
    }

    leafArray[leafCount] = img;
    var imgSrc  = document.getElementById("leaves");

    imgSrc.appendChild(leafArray[leafCount]);

    leafCount++;
    //document.getElementById('leaves').append();
    //$('body').append(img);
    
    //alert("lol");
}

function pausePomodoroFunction(){
    alert("lol");
}

function resetPomodoroFunction(){
    alert("lol");
}

var breakStarting = new Audio('breakstarting.mp3');
function allowDrop(ev) {
    ev.preventDefault();
}


var currentTime = new Date().getHours();
console.log(currentTime);
if(document.body)
{
  if(8 <= currentTime && currentTime < 20)
  {
    document.body.className = "day";
  }
  else
  {
    document.body.className = "night";
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

function pauseAnimation()
{
    console.log(document);
    console.log("paused");
    document.getElementById("circle").classList.remove("run");
    document.getElementById("circle").classList.add("paused");
}

function timer()
{
    startAnimation();
    var countdown = 20;
    console.log(document);
    console.log(document.getElementById("countdown-number"));

    var countdownNumber = document.getElementById("countdown-number");
    countdownNumber.textContent = countdown;
    
    setInterval(function() {
        countdown = --countdown <= 0 ? 20 : countdown;
        countdownNumber.textContent = countdown;
    }, 1000);   

}

function pausePomodoro()
{
    pauseAnimation();
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

