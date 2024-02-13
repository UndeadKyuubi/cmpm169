// sketch.js - A 3D display of a neco arc model with user functionality.
// Author: Brandon Jacobson
// Date: Feb. 12th 2024

let necoarc

let scaleAmount = 100;
let rotateXAmount = 0;
let rotateYAmount = 0;
let rotateZAmount = 0;
let translateXAmount = 0;
let translateYAmount = 150;
let translateZAmount = 0;

let autoRotateY = true;

let redValue = 255;
let greenValue = 255;
let blueValue = 255;

function preload(){
  necoarc = loadModel('js/models/necoarc.obj')
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");

  $(window).resize(function() {
    console.log("Resizing...");
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
  })
  
  rotateYAmount = HALF_PI;
  rotateXAmount = PI
}

function draw() {
  background(0)
  pointLight(redValue, greenValue, blueValue, 0, 0, 75 + translateZAmount);
  ambientLight(150, 120, 0)
  translate(translateXAmount, translateYAmount, translateZAmount);
  scale(scaleAmount);
  
  if (autoRotateY) {
    rotateYAmount += 0.01;
  }
  
  rotateX(rotateXAmount);
  rotateY(rotateYAmount);
  rotateZ(rotateZAmount);
  shininess(10)
  specularMaterial(255, 215, 0)
  noStroke()
  model(necoarc)
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    scaleAmount *= 1.1;
  } else if (keyCode === DOWN_ARROW) {
    scaleAmount *= 0.9;
  }
  
  if (key === 'W' || key === 'w') {
    translateYAmount -= 10;
  } else if (key === 'S' || key === 's') {
    translateYAmount += 10;
  } else if (key === 'A' || key === 'a') {
    translateXAmount -= 10;
  } else if (key === 'D' || key === 'd') {
    translateXAmount += 10;
  } else if (key === 'Q' || key === 'q') {
    translateZAmount -= 10;
  } else if (key === 'E' || key === 'e') {
    translateZAmount += 10;
  }
  else if (key === 'R' || key === 'r') {
    autoRotateY = !autoRotateY;
  }
}

function mouseDragged() {
  rotateYAmount += (pmouseX - mouseX) * 0.01;
  rotateXAmount += (pmouseY - mouseY) * 0.01;
  
  document.getElementById('redSlider').addEventListener('input', function() {
      redValue = this.value;
    });

  document.getElementById('greenSlider').addEventListener('input', function() {
      greenValue = this.value;
    });

  document.getElementById('blueSlider').addEventListener('input', function() {
      blueValue = this.value;
    });
}