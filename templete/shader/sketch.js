let theShader;
let tex;

function preload(){
  theShader = loadShader("main.vert", "main.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  tex = createGraphics(width, height);
}

function draw() {
  background(220);

  drawTex();

  shader(theShader);

  theShader.setUniform("u_time", frameCount / 100);
  theShader.setUniform("u_tex", tex);

  rect(0, 0, width, height);
}

function drawTex() {
  tex.background(255, 0, 0);
  tex.circle(tex.width/2, tex.height/2, 100);
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