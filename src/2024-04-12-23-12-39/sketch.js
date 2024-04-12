let img = [];
let p = [];
let v = [];
let scl = [];
let period = [];
let speed = [];

function preload(){
  img[0] = loadImage("../../assets/image/color/black.jpg");
  img[1] = loadImage("../../assets/image/color/blue.jpg");
  img[2] = loadImage("../../assets/image/color/brown.jpg");
  img[3] = loadImage("../../assets/image/color/green.jpg");
  img[4] = loadImage("../../assets/image/color/indigo.jpg");
  img[5] = loadImage("../../assets/image/color/light-green.jpg");
  img[6] = loadImage("../../assets/image/color/orange.jpg");
  img[7] = loadImage("../../assets/image/color/pink.jpg");
  img[8] = loadImage("../../assets/image/color/purple.jpg");
  img[9] = loadImage("../../assets/image/color/red.jpg");
}

function setup() {
  const w = min(windowWidth, windowHeight)
  createCanvas(w, w);
  background(220);

  imageMode(CENTER);

  for(let i in img){
    period[i] = floor(random(60, 120));
    speed[i] = floor(random(5, 10));
    p[i] = createVector(random(width), random(height));
    v[i] = createVector(random(10, 20) * random([-1, 1]), random(10, 20) * random([-1, 1]));
    scl[i] = random(0.1, 0.3);
  }
}

function draw() {
  for(let i in img){
    if (frameCount % period[i] < period[i] * 0.2 && frameCount % speed[i] == 0) {
      p[i].add(v[i]);
      if(p[i].x < 0 || p[i].x > width) v[i].x *= -1;
      if(p[i].y < 0 || p[i].y > height) v[i].y *= -1;
    }
    image(img[i], p[i].x, p[i].y, img[i].width * scl[i], img[i].height * scl[i]);
  }

  webFrame(0, 0, width, color(50))
}

function webFrame(x, y, s, c, mode = "CORNER") {
  push();

  if (mode == "CENTER") {
    translate(-s / 2, -s / 2)
  }

  strokeCap(PROJECT);

  strokeWeight(max(s * 0.015, ));
  stroke(0);
  noFill();
  rect(x, y, s, s);
  fill(c);
  rect(x, y, s, s * 0.15);

  stroke(255);

  line(x + s * 0.6, y + s * 0.12, x + s * 0.7, y + s * 0.12);

  noFill();
  rect(x + s * 0.74, y + s * 0.025, s * 0.1, s * 0.1);

  line(x + s * 0.88, y + s * 0.025, x + s * 0.97, y + s * 0.125);
  line(x + s * 0.88, y + s * 0.125, x + s * 0.97, y + s * 0.025);

  pop();
}