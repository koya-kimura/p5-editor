const r = 150;
const n = 6;
// const t = 30;
const num = 100;
let i = [];
let p = [];
let d = [];
let t = [];
let g = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  for (let j = 0; j < num; j++) {
    t[j] = floor(random(10, 20))*10;
    i[j] = floor(random(6));
    p[j] = createVector(width / 2, height / 2);
    d[j] = createVector(r * cos(TAU * i[j] / n), r * sin(TAU * i[j] / n));
    g[j] = random(TAU);
    d[j].mult(1 / t[j]);
  }
}

function draw() {
  background(255, 5);

  for (let j = 0; j < num; j++) {
    if (frameCount % t[j] == 0) {
      i[j] = floor(random(6));
      d[j] = createVector(r * cos(TAU * i[j] / n), r * sin(TAU * i[j] / n));
      d[j].mult(1 / t[j]);
    }

    if(dist(p[j].x, p[j].y, width/2, height/2) > max(width/2, height/2)){
      p[j] = createVector(width / 2, height / 2);
    }

    p[j].add(d[j]);

    noStroke();
    fill(10);
    circle(p[j].x, p[j].y, floor(pow(sin(frameCount/100+g[j]), 10)+0.3)*5+2);
  }
}