// sketch.js - User can type with lowercase letters to produce different patterns of sine waves
// Author: Brandon Jacobson
// Date: Jan. 22, 2024

let lineY;
let sineWaves = [];
let sineAmplitude = 50;
let sineWidth = 20;
let keyValues = {};
let lastPressedKey = '';

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  $(window).resize(function() {
    console.log("Resizing...");
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
  })

  stroke(255);
  strokeWeight(2);
  lineY = height / 2;
  
  keyValues = {
    'a': 100,
    'b': 30,
    'c': 24,
    'd': 110,
    'e': 44,
    'f': 133,
    'g': 27,
    'h': 156,
    'i': 71,
    'j': 62,
    'k': 31,
    'l': 53,
    'm': 120,
    'n': 88,
    'o': 7,
    'p': 118,
    'q': 49,
    'r': 59,
    's': 166,
    't': 75,
    'u': 90,
    'v': 4,
    'w': 150,
    'x': 55,
    'y': 119,
    'z': 40,
  };
}

function draw() {
  background(0);

  stroke(255)
  line(0, lineY, width, lineY);
  
  fill(255);
  textSize(24);
  textAlign(CENTER, BOTTOM);
  text(lastPressedKey, width / 2, height - 10);

  for (let i = sineWaves.length - 1; i >= 0; i--) {
    sineWaves[i].update();
    sineWaves[i].draw();

    if (sineWaves[i].offScreen()) {
      sineWaves.splice(i, 1);
    }
  }
}

function keyPressed() {
    if (keyValues.hasOwnProperty(key)) {
    sineWaves.push(new SineWave(width, lineY, sineAmplitude, sineWidth, keyValues[key]));
      lastPressedKey = key;
  }
}

class SineWave {
  constructor(x, lineY, amplitude, width, keyValue){
    this.x = x;
    this.lineY = lineY;
    this.amplitude = amplitude;
    this.width = width;
    this.distOnLine = 0;
    this.speed = 5;
    this.shift = keyValue;
  }

  update() {
    this.x -= this.speed;
    this.distOnLine += this.speed / this.width;
  }

  draw() {
    let y = this.lineY + sin(this.distOnLine) * this.shift;
    let randomColor = color(random(255), random(255), random(255), random(255));
    stroke(randomColor);
    fill(randomColor);
    ellipse(this.x, y, this.width, this.amplitude);
  }

  offScreen() {
    return this.x + this.width < 0;
  }
}