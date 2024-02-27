// sketch.js - Given a .txt file, parse it into individual words and create a heatmap based off of the frequency of every unique word.
// Author: Brandon Jacobson
// Date: 26 Feb. 2024

let wordCounts = {};
let minFrequency, maxFrequency;
let gridSize, cellSize;
let tooltipText = '';

function preload() {
  loadStrings('js/data/freddy_five_bear.txt', parse);
}

function parse(data) {
  let text = data.join(' ');
  
  let words = text.split(/[^\w']+/);
  
  for (let word of words) {
    if (word !== '') {
      let wordLower = word.toLowerCase();
      if (wordCounts[wordLower]) {
        wordCounts[wordLower]++;
      } else {
        wordCounts[wordLower] = 1;
      }
    }
  }
  
  console.log(wordCounts);
}

function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
  
    $(window).resize(function() {
      console.log("Resizing...");
      resizeCanvas(canvasContainer.width(), canvasContainer.height());
    })
}

function draw() {
  background(255);
  
  let uniqueWords = Object.keys(wordCounts);
  gridSize = Math.ceil(Math.sqrt(uniqueWords.length)); 
  
  cellSize = min(canvasContainer.width() / gridSize, canvasContainer.height() / gridSize);
  
  minFrequency = min(Object.values(wordCounts));
  maxFrequency = max(Object.values(wordCounts));
  
  for (let i = 0; i < uniqueWords.length; i++) {
    let word = uniqueWords[i];
    let frequency = wordCounts[word];
    
    let row = Math.floor(i / gridSize);
    let col = i % gridSize;
    
    let colorValue = lerpColor(color(0, 255, 0), color(255, 0, 0), map(frequency, minFrequency, maxFrequency, 0, 1));
    
    fill(colorValue);
    rect(col * cellSize, row * cellSize, cellSize, cellSize);
    
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(0);
    text(word, col * cellSize + cellSize / 2, row * cellSize + cellSize / 2);
  }
  
  displayTooltip(tooltipText, mouseX, mouseY);
}

function mouseMoved() {
  let col = Math.floor(mouseX / cellSize);
  let row = Math.floor(mouseY / cellSize);
  
  let index = row * gridSize + col;
  
  if (index >= 0 && index < Object.keys(wordCounts).length) {
    let word = Object.keys(wordCounts)[index];
    let frequency = wordCounts[word];
    
    if (frequency == 1) {
      tooltipText = `${word}: ${frequency} time`;
    }
    else {
      tooltipText = `${word}: ${frequency} times`;
    }
  }
  else {
    tooltipText = '';
  }
}

function displayTooltip(tooltip, x, y) {
  if (x + textWidth(tooltip) > canvasContainer.width()) {
    x = mouseX - 10 - textWidth(tooltip);
  }
  else {
    x = x + 10;
  }
  
  textSize(20);
  fill(0);
  textAlign(LEFT, BOTTOM);
  text(tooltip, x, y - 10);
}