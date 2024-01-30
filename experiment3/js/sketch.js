// sketch.js - An aquarium with generatively flowing water and fish that follow the cursor
// Author: Brandon Jacobson
// Date: Jan. 29, 2024

class Fish {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.angle = 0;
      this.color = color(random(255), random(255), random(255));
      this.size = 15;
      this.speed = 10;
      this.radius = this.size * 2;
    }
    
    seek(targetX, targetY) {
      let angleToTarget = atan2(targetY - this.y, targetX - this.x);
      this.angle = lerp(this.angle, angleToTarget, 0.1);
  
      this.x += cos(this.angle) * this.speed;
      this.y += sin(this.angle) * this.speed;
    }
    
    avoid(otherFish) {
      for (let fish of otherFish) {
        let d = dist(this.x, this.y, fish.x, fish.y);
  
        if (d > 0 && d < this.radius) {
          let angleAway = atan2(this.y - fish.y, this.x - fish.x);
          this.angle = lerp(this.angle, angleAway + PI, 0.1);
  
          this.x += cos(this.angle) * this.speed;
          this.y += sin(this.angle) * this.speed;
          break;
        }
      }
    }
  
    update(targetX, targetY, otherFish) {
      this.seek(targetX, targetY);
      this.avoid(otherFish);
    }
  
    display() {
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      
      fill(this.color);
      triangle(0, 0, -50, 50, -50, -50);
      ellipse(5, 0, 100, 50);
      fill(0);
      circle(45, 0, 10);
      
      pop();
    }
  }
  
  let time = 0.0;
  let noiseStrength = 100;
  let fishArray = [];
  
  function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
  
    $(window).resize(function() {
      console.log("Resizing...");
      resizeCanvas(canvasContainer.width(), canvasContainer.height());
    })

    noStroke();
    
    for (let i = 0; i < 10; i++) {
      fishArray.push(new Fish(random(width), random(height)));
    }
  }
  
  function draw() {
    background(0);
  
    for (let y = 0; y < height; y += 10) {
      for (let x = 0; x < width; x += 10) {
        
        let noiseValue = noise(
          (x + mouseX * 0.01) * 0.01,
          (y + mouseY * 0.01) * 0.01,
          time
        );
  
        let displacement = map(noiseValue, 0, 1, -noiseStrength, noiseStrength);
  
        let noiseColor = map(noiseValue, 0, 1, 0, 150);
        fill(noiseColor, 50, 150, 150);
        ellipse(x + displacement, y, 10, 10);
      }
    }
    
    for (let i = 0; i < fishArray.length; i++) {
      let targetX = mouseX;
      let targetY = mouseY;
  
      let others = fishArray.slice();
      others.splice(i, 1); 
  
      fishArray[i].update(targetX, targetY, others);
      fishArray[i].display();
    }
  
    time += 0.02;
  }