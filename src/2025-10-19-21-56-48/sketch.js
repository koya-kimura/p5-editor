function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  const interval = 60;
  const progress = (frameCount % interval) / interval;
  const count = floor(frameCount / interval);

  randomSeed(count * 7490170);

  const d = width * 0.5 - min(width, height) * 0.01;
  const x = count % 2 == 0 ? width * 0.25 : width * 0.75;
  const y = count % 2 == 0 ? map(progress, 0, 1, -d, height + d) : map(progress, 0, 1, height + d, -d);

  if(random() < 0.5){
    noStroke();
  } else {
    strokeWeight(min(width, height) * 0.02);
    stroke(random() < 0.5 ? 255 : 0);
  }

  random() < 0.95 ? fill(random() < 0.5 ? 0 : 255) : fill(230, 0, 0);
  circle(x, y, d);
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