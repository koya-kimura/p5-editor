let theShader;

function preload(){
  theShader = loadShader("main.vert", "main.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(220);

  shader(theShader);

  theShader.setUniform("u_time", frameCount / 100);

  rect(0, 0, width, height);
}