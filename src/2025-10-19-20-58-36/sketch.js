let font;

function preload() {
  font = loadFont("../../assets/font/any/tamanegi.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  const interval = 30;
  const progress = (frameCount % interval) / interval;
  const count = floor(frameCount / interval);
  const maxSize = min(width, height) * 0.7;

  background(100, 10, 220);

  if (count % 4 == 3) {
    push();
    randomSeed(count * 849129);
    rectMode(CENTER);
    fill(255);
    noStroke();
    translate(width / 2, height / 2);
    rotate((count % 2 == 0 ? 1 : -1) * Easing.easeOutSine(progress) * TAU);
    const n = 5;
    for(let i = 0; i < n; i ++){
      const h = min(width, height) * (0.5 * Easing.easeOutQuart(progress) + 0.1) / n;
      const y = h * (i - floor(n / 2)) * Easing.easeOutSine(progress);
      push();
      translate(0, y, min(width, height) * (0.5 * Easing.easeOutQuad(progress) + 0.1));
      rotate(random(TAU) * Easing.easeOutSine(progress));
      rect(0, 0, min(width, height) * (0.5 * Easing.easeOutQuad(progress) + 0.1) ,h * Easing.easeOutSine(progress) * 0.5);
      pop();
    }
    pop();
  }
  else {
    push();
    rectMode(CENTER);
    fill(255);
    noStroke();
    translate(width/2, height/2);
    rotate((count % 2 == 0 ? 1 : -1) * Easing.easeOutSine(progress) * TAU / 4);
    rect(0, 0, min(width, height) * (0.5 * Easing.easeOutQuad(progress) + 0.1), min(width, height) * (0.5 * Easing.easeOutQuart(progress) + 0.1))
    pop();
  }

  push();
  fill(0);
  noStroke();
  rect(0, 0, (width - height) * 0.5, height);
  rect(width - (width - height) * 0.5, 0, (width - height) * 0.5, height);
  pop();

  push();
  fill(255);
  textFont(font);
  textSize(min(width, height) * 0.06);
  textAlign(CENTER, CENTER);
  text("リズム", (width - height) * 0.25, height * 0.5);
  text("ズケイ", width - (width - height) * 0.25, height * 0.5);
  pop();
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