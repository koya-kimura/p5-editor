let mode = "ready"
let photo;
let capture;
let captureTexture;
let memoryTexture;
let backgroundTexture;

let t = 0;

let filterShader;
let backgroundFilterShader;

function preload(){
  filterShader = loadShader("main.vert", "main.frag");
  backgroundFilterShader = loadShader("main.vert", "bg.frag");
}

function setup() {
  createCanvas(1200, 675);

  capture = createCapture(VIDEO);
  capture.hide();

  captureTexture = createGraphics(46 * 5, 62 * 5, WEBGL);
  memoryTexture = createGraphics(width, height);
  backgroundTexture = createGraphics(width, height, WEBGL);

  photo = new Photo(270, 430);
}

function draw() {
  background(0);

  if (t < 1) {
    captureTexture.shader(filterShader);

    filterShader.setUniform("u_tex", memoryTexture);
    filterShader.setUniform("u_time", t);

    captureTexture.rect(0, 0, width, height);
  }

  if (mode == "ready") {
    backgroundTexture.shader(backgroundFilterShader);
    backgroundFilterShader.setUniform("u_tex", capture);
    backgroundTexture.rect(width, height);

    image(backgroundTexture, width / 2, height / 2, width, height);
    photo.display(captureTexture);
    instantCamera(width / 2, height / 2, 500);
    memoryTexture.image(capture, 0, 0, width, height);
  } else if (mode == "developing") {
    photo.display(captureTexture);
    t += 0.001;
  }
}


function mouseClicked() {
  if (mode == "ready") {
    mode = "developing";
  }
}


class Photo {
  constructor(w, h) {
    this.p = createVector(width / 2, height / 2);
    this.v = createVector(0, -1);
    this.scl = 0.5;
    this.w = w;
    this.h = h;
    this.scl = 1;
    this.t = 0;
    this.pg = createGraphics(w, h);
  }

  display(captureTexture) {
    this.pg.background(255);

    this.pg.imageMode(CENTER);
    this.pg.image(captureTexture, this.pg.width / 2, this.pg.height / 2 -20)

    imageMode(CENTER);
    image(this.pg, this.p.x, this.p.y, this.w * this.scl, this.h * this.scl);
  }
}

function instantCamera(x, y, s) {
  push();
  rectMode(CENTER);
  noStroke();
  fill("#A2A19D")
  rect(x, y, s * 0.8, s, s * 0.05, s * 0.05);
  fill("#28272A")
  rect(x + s * 0.05, y, s * 0.6, s);

  fill("#F2F2F2")
  rect(x - s * 0.25, y - s * 0.35, s * 0.1, s * 0.2, s * 0.01, s * 0.01);

  strokeWeight(s * 0.03);
  stroke("#28272A");
  fill("#A2A19D");
  circle(x + s * 0.05, y + s * 0.05, s * 0.7);

  noStroke();
  fill("#28272A");
  circle(x + s * 0.05, y + s * 0.05, s * 0.5);
  fill("#131313");
  circle(x + s * 0.05, y + s * 0.05, s * 0.2);

  fill("#B2B2B2");
  circle(x + s * 0.07, y + s * 0.01, s * 0.05);
  circle(x + s * 0.03, y + s * 0.07, s * 0.04);
  pop();
}