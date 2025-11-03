let theShader;
let tex;
let img;

let interval;
let count;
let progress;

function preload(){
  theShader = loadShader("main.vert", "main.frag");
  img = loadImage("../../assets/image/rose.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  tex = createGraphics(width, height);
  noCursor();

  img.resize(width, 0);
}

function draw() {
  background(220);

  interval = 50;
  count = floor(frameCount / interval);
  progress = fract(frameCount / interval);

  drawTex();

  shader(theShader);

  theShader.setUniform("u_time", frameCount / 100);
  theShader.setUniform("u_tex", tex);
  theShader.setUniform("u_progress", progress);

  rect(0, 0, width, height);
}

function drawTex() {
  tex.background(255, 0, 0);

  const camX = map(Easing.easeOutQuad(progress), 0, 1, noise(count, 4680), noise(count+1, 4680)) * width;
  const camY = map(Easing.easeOutQuad(progress), 0, 1, noise(count, 3160), noise(count + 1, 3160)) * height;
  const camScl = map(map(Easing.easeOutQuad(progress), 0, 1, noise(count, 3160), noise(count + 1, 3160)), 0, 1, 1.5, 3.0);
    
  tex.push();
  tex.translate(camX, camY);
  tex.scale(camScl);
  tex.imageMode(CENTER);
  tex.image(img, 0, 0);
  tex.pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tex.resizeCanvas(width, height);
}

function keyPressed() {
  // Space key
  if (keyCode === 32) {
    fullscreen(true);
  }
}