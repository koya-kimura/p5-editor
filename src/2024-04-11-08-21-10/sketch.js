const n = 15;
let pg = [];
let p = [];
let angle = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  for(let i = 0; i < n; i++) {
    p[i] = createVector(random(-200, 200), random(-200, 200), random(-200, 200));
    angle[i] = createVector(floor(random(4))*PI/2, floor(random(4))*PI/2, floor(random(4))*PI/2);
    pg[i] = createGraphics(1000, 1000);

    const step = floor(random(5, 10)) * 4;
    for(let x = 0; x < pg[i].width; x += step) {
      pg[i].stroke(random(10, 50), random(100, 250), random(150, 250), 100);
      pg[i].line(x, 0, x, pg[i].width);
    }
    for (let y = 0; y < pg[i].height; y += step) {
      pg[i].stroke(random(10, 50), random(150, 200), random(150, 200), 100);
      pg[i].line(0, y, pg[i].height, y);
    }

    pg[i].remove();
  }
}

function draw() {
  background(0);

  camera(400 * sin(frameCount * 0.013), 200, 600 * sin(frameCount * 0.017 + 0.01), 0, 0, 0, 0, 1, 0);

  blendMode(ADD);

  for(let i in pg){
    push();
    translate(p[i].x, p[i].y, p[i].z);
    rotateX(angle[i].x);
    rotateY(angle[i].y);
    rotateZ(angle[i].z);
    texture(pg[i]);
    noStroke();
    plane(pg[i].width, pg[i].height);
    pop();
  }
  blendMode(BLEND)
}