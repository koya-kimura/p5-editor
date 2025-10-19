let font;

function preload(){
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

  background(220, 10, 10);

  if(count % 4 == 3){
    const n = 10;
    push();
    randomSeed(floor(frameCount/(interval/4))*547289);
    for(let i = 0; i < n; i ++){
      noFill();
      stroke(255);
      strokeWeight(maxSize / n);
      if(random() < 0.3){
        circle(width/2, height/2, maxSize * i / n);
      }
    }
    pop();
  }
  else {
    push();
    strokeWeight(min(width, height) * 0.1);
    stroke(10, 100, 10);
    line(0, Easing.easeInOutExpo(progress) * height, width, Easing.easeInOutExpo(progress) * height);
    pop();

    push();
    noStroke();
    fill(255);
    ellipse(width / 2, height / 2, Easing.easeOutQuad(progress) * maxSize, Easing.easeOutCubic(progress) * maxSize);
    pop();
  }

  push();
  fill(0);
  noStroke();
  rect(0, 0, (width - height)*0.5, height);
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