// sketch.js - Load an image and break it apart into a bunch of small tiles that enlarge and shrink
// based off of the amplitude of the song playing. Pressing the mouse button breaks apart and rebuilds the whole image.
// 'w' key increases amplitude, 's' key decreases amplitude
// Author: Brandon Jacobson
// Date: Feb. 7th 2024

let photo;
let sound;
let pixel;
let c = 0;
let boxes = [];
let moving = false;
let amplitude;

function preload() {
    photo = loadImage("images/sam.jpg");
    sound = loadSound("sounds/spoiler.mp3");
}

function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
  
    $(window).resize(function() {
      console.log("Resizing...");
      resizeCanvas(canvasContainer.width(), canvasContainer.height());
    })
    
	background(0);
    amplitude = new p5.Amplitude();
	photo.resize(width, height);
	for (let x = .2*photo.width; x < .8*photo.width; x += photo.width / 100) {
		for (let y = 0; y < photo.height; y += photo.height / 100) {
			pixel = photo.get(x, y);
			pixel[3] = 140
			boxes.push(new Box(x, y, photo.width / 60, photo.height / 60, random(0, 360), 0, 0, pixel))

		}
	}
  
    sound.loop();
}

function draw() {
    background(0);
    let level = amplitude.getLevel();
    for (let b of boxes) {
        let newSize = map(level, 0, 1, 10, 50);
        b.w = newSize;
        b.h = newSize;
        b.make();
        if (moving) b.move();
        else b.goback();
    }
}

function mousePressed() {
    moving = !moving;
    if (moving) {
        for (let b of boxes) {
            b.dx = random(-10, 10);
            b.dy = random(-10, 10);
        }
    } else {
        moving = false;
        for (let b of boxes) {
            b.dx = 0;
            b.dy = 0;
        }
    }
}

class Box {
    constructor(x, y, w, h, a, dx, dy, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a;
        this.dx = dx;
        this.dy = dy;
        this.c = c;
        this.ox = x;
        this.oy = y;
    }

    make() {
        fill(this.c);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
        if ((this.x + this.w) > windowWidth || (this.x) < 0) {
            this.x -= this.dx;
            this.dx = -this.dx;
        } else if ((this.y + this.h) > windowHeight || (this.y) < 0) {
            this.y -= this.dy;
            this.dy = -this.dy;
        }
    }

    goback() {
        this.x = lerp(this.x, this.ox, 0.1);
        this.y = lerp(this.y, this.oy, 0.1);
    }
}

function keyPressed() {
    if (key === 'w') {
        sound.setVolume(sound.getVolume() + 0.1); // Increase volume by 0.1 (0 to 1 range)
    } else if (key === 's') {
        sound.setVolume(sound.getVolume() - 0.1); // Decrease volume by 0.1 (0 to 1 range)
    }
}
