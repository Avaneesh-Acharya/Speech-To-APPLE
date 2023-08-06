x = 0;
y = 0;
screen_width = 0
screen_height = 0
apple = ""
speak_data = ""
to_number = ""

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";
  clear()
  recognition.start();
}

recognition.onresult = function (event) {

  console.log(event);

  content = event.results[0][0].transcript;

  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
  to_number = Number(content)
  if (content == "one") {
    to_number = 1
  } if (content == "two") {
    to_number = 2
  }
if (content == "five") {
  to_number = 5
}
  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started Drawing Apple"
    draw_apple = "set"
  }
  else {
    document.getElementById("status").innerHTML = "Not recognizing a number"
  }
}

function preload() {
  apple = loadImage("apple.png")
}
function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight
  canvas = createCanvas(screen_width, screen_height)
  canvas.position(0, 150)
}
function clear(params) {
  canvas.clearRect(0, 0, canvas.width, canvas.height)
}
function draw() {
  if (draw_apple == "set") {
    for (let index = 0; index < to_number; index++) {
      x = Math.floor(Math.random() * 700); y = Math.floor(Math.random() * 400); image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number + "Apples drawn";
    speak(); draw_apple = "";
  }
}

function speak() {
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";
}
