// sketch.js - A little game about receiving scary text messages and trying to delete them all in time.
// Author: Brandon Jacobson
// Date: Feb. 19th 2024

let boxes = [];
let messageFrequency = 60;
let scaryMessageProbability = 0.1;
let maxScaryBoxes = 30;
let scaryBoxCount = 0;
let isGameOver = false;

function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
    canvas.parent("canvas-container");

    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    })

  background(255);
  frameRate(30);
}

function draw() {
  strokeWeight(3);
  background(255);

  if (!isGameOver) {
    if (random() < 1 / messageFrequency) {
      let x = random(windowWidth - 160);
      let y = random(windowHeight - 50);
      let message;
      let isScary = random() < scaryMessageProbability;
      if (isScary) {
        message = random(["DANGER", "RUN AWAY", "WATCH OUT", "BEWARE"]);
        scaryBoxCount++;
      } else {
        message = random(["HELLO", "NICE", "HAPPY", "SMILE"]);
      }
      let w = textWidth(message) + 50;
      let h = 50;
      let textColor, boxColor;
      if (isScary) {
        textColor = color(255, 0, 0);
        boxColor = color(0);
        strokeColor = color(0);
      } else {
        textColor = color(255);
        boxColor = color(20, 141, 222);
        strokeColor = color(20, 141, 222);
      }
      let box = { x: x, y: y, w: w, h: h, message: message, isScary: isScary, textColor: textColor, boxColor: boxColor, strokeColor: strokeColor };
      boxes.push(box);
    }

    for (let i = 0; i < boxes.length; i++) {
      let box = boxes[i];
      let shakingX = box.x;
      let shakingY = box.y;
      if (box.isScary) {
        shakingX += random(-5, 5);
        shakingY += random(-5, 5);
      }

      fill(box.boxColor);
      stroke(box.strokeColor);
      rect(shakingX, shakingY, box.w, box.h, 50);
      textSize(30);
      fill(box.textColor);
      noStroke();
      text(box.message, shakingX + 25, shakingY + 35);
    }

    if (scaryBoxCount >= maxScaryBoxes) {
      isGameOver = true;
    }

    if (frameCount % 60 == 0 && messageFrequency > 10) { 
      messageFrequency -= 4;
      scaryMessageProbability += 0.04;
    }
  } else {
    background(0);
    fill(255, 0, 0);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("DO YOU FEEL SAFE?", width / 2, height / 2);
  }
}

function mouseClicked() {
  if (!isGameOver) {
    for (let i = 0; i < boxes.length; i++) {
      let box = boxes[i];
      if (mouseX > box.x && mouseX < box.x + box.w && mouseY > box.y && mouseY < box.y + box.h) {
        if (box.isScary) {
          scaryBoxCount--;
          boxes.splice(i, 1);
        }
        break;
      }
    }
  }
}