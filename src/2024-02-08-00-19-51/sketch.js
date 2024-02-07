let mode = "ready"
let photo;
let capture;
let captureTexture;

let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  capture = createCapture(VIDEO);
  capture.hide();

  captureTexture = createGraphics(46 * 5, 62 * 5);

  photo = new Photo(270, 430);
}

function draw() {
  background(0);

  captureTexture.background(255, 0, 0);
  captureTexture.imageMode(CENTER);
  captureTexture.image(capture, 0, 0);

  if(mode=="ready"){
    photo.display(captureTexture);
    instantCamera(width / 2, height / 2, 500);
  } else if (mode == "developing"){
    photo.display(captureTexture);
    fill(255, 300-t);
    rect(0, 0, width, height);
    t += 1;
  }

  image(capture, 500, 300);
}

function mouseClicked(){
  if (mode == "ready") {
    mode = "developing";
  }
}

class Photo {
  constructor(w, h){
    this.p = createVector(width/2, height/2);
    this.v = createVector(0, -1);
    this.scl = 0.5;
    this.w = w;
    this.h = h;
    this.scl = 1;
    this.t = 0;
    this.pg = createGraphics(w, h);
  }

  display(captureTexture){
    this.pg.background(255);

    // this.pg.rectMode(CENTER);
    // this.pg.fill(100, 40, 70);
    // this.pg.rect(this.pg.width/2, this.pg.height/2, 46*5, 62*5);
    this.pg.imageMode(CENTER);
    this.pg.image(captureTexture, this.pg.width / 2, this.pg.height / 2)

    imageMode(CENTER);
    image(this.pg, this.p.x, this.p.y, this.w * this.scl, this.h * this.scl);
  }
}

function instantCamera(x, y, s){
  push();
  rectMode(CENTER);
  noStroke();
  fill("#A2A19D")
  rect(x, y, s*0.8, s, s*0.05, s*0.05);
  fill("#28272A")
  rect(x+s*0.05, y, s * 0.6, s);

  fill("#F2F2F2")
  rect(x-s*0.25, y-s*0.35, s*0.1, s*0.2, s*0.01, s*0.01);

  strokeWeight(s*0.03);
  stroke("#28272A");
  fill("#A2A19D");
  circle(x + s * 0.05, y + s *0.05, s * 0.7);

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

class Easing {
  static easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
  }

  static easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
  }

  static easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }

  static easeInQuad(x) {
    return x * x;
  }

  static easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }

  static easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  static easeInCubic(x) {
    return x * x * x;
  }

  static easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  static easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  static easeInQuart(x) {
    return x * x * x * x;
  }

  static easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }

  static easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
  }

  static easeInQuint(x) {
    return x * x * x * x * x;
  }

  static easeOutQuint(x) {
    return 1 - Math.pow(1 - x, 5);
  }

  static easeInOutQuint(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  }

  static easeInExpo(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
  }

  static easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  static easeInOutExpo(x) {
    return x === 0 ?
      0 :
      x === 1 ?
      1 :
      x < 0.5 ?
      Math.pow(2, 20 * x - 10) / 2 :
      (2 - Math.pow(2, -20 * x + 10)) / 2;
  }

  static easeInCirc(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  }

  static easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }

  static easeInOutCirc(x) {
    return x < 0.5 ?
      (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 :
      (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }

  static easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  static easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ?
      (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 :
      (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  }
}

const colorPalletes = [
  {
    name: "DeepEmeraldGold",
    colors: ["#005e55", "#fff9bf", "#edb50c", "#b8003d", "#5e001f"],
  },
  {
    name: "WarmRainbow",
    colors: ["#01204E", "#028391", "#F6DCAC", "#FAA968", "#F85525"],
  },
  {
    name: "ChocolateAndCream",
    colors: ["#D54751", "#EF9A48", "#FFFCC7", "#4DA394", "#59322B"],
  },
  {
    name: "PopArt",
    colors: ["#241965", "#653993", "#9F4094", "#B73D6E", "#F19406"],
  },
  {
    name: "DeepEmeraldGold",
    colors: ["#F87523", "#FFC31B", "#E7DCC9", "#1DB7B9", "#126D68"],
  },
  {
    name: "GreenPink",
    colors: ["#01B999", "#FAB3B3", "#DC958F", "#A1D8CE", "#F1FAF7"],
  },
  {
    name: "NatureTranquility",
    colors: ["#106A6B", "#07374B", "#CAB381", "#E9E0CE"],
  },
  {
    name: "VibrantHarmony",
    colors: ["#F15946", "#5681CB", "#FAAA2D", "#296647", "#453945"],
  },
  {
    name: "Serenity Bliss",
    colors: ["#FFB4B8", "#EF4B28", "#0A563A", "#FFBC54", "#ECE9E0"],
  }
];