function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  // Space key
  if (keyCode === 32) {
    fullscreen(true);
  }
}