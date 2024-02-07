let cupNoodlesArr = [];
let cp = ["#D02323", "#2349D0", "#C3BC04", "#0F5603", "#3F1D88"];

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(220);
}

function draw() {
  background(30);

  if(frameCount%100==0){
    cupNoodlesArr.push(new CupNoodlesSlide(random(cp)));
  }

  for(let i in cupNoodlesArr){
    cupNoodlesArr[i].move();
    cupNoodlesArr[i].display();
  }

  for (let i in cupNoodlesArr) {
    if(cupNoodlesArr[i].p.x > width + 500){
      cupNoodlesArr.splice(i, 1);
    }
  }
}

class CupNoodlesSlide {
  constructor(c){
    this.p = createVector(-500, height*0.6);
    this.v = createVector(5, 0);
    this.s = createVector(360, 420);
    this.c = c;
  }

  move(){
    this.p.add(this.v);
  }

  display(){
    cupNoodles(this.p.x, this.p.y, this.s.x, this.s.y, this.c, "CENTER");
  }
}

// 6:7 が良さそう
function cupNoodles(x, y, w, h, c = color(100, 0, 0), mode = "CORNER") {
  push();

  translate(x, y);
  if(mode=="CENTER"){
    translate(-w/2, -h/2);
  }

  push();

  noStroke();
  fill(245);
  roundedQuad(0, 0, w, 0, w * 0.85, h, w * 0.15, h, min(w,h)*0.01);

  drawingContext.clip();

  stroke(c);
  strokeWeight(h * 0.03);
  line(0, 0 + h * 0.1, 0 + w, 0 + h * 0.1);
  line(0, 0 + h * 0.9, 0 + w, 0 + h * 0.9);

  noStroke();
  fill("#C9B82B");
  const grid = w * 0.05;

  for(let _x = 0; _x < w; _x += grid){
    rect(_x, h*0.15, grid*0.6, h*0.08);
    rect(_x, h * 0.25, grid * 0.6, h * 0.05);
    rect(_x, h * 0.8, grid * 0.6, h * 0.07);
  }

  stroke(c);
  strokeWeight(h * 0.01);
  noFill();
  textAlign(CENTER);
  textSize(w*0.3);
  textFont("Impact");
  text("NOODLE", w*0.5, h*0.65);

  pop();

  noFill();
  stroke(240);
  strokeWeight(h * 0.01);
  roundedQuad(0, 0, w, 0, w * 0.85, h, w * 0.15, h, min(w,h)*0.01);
  pop();
}

function roundedQuad(x1, y1, x2, y2, x3, y3, x4, y4, r = 0) {
  beginShape();
  vertex(x1 + r, y1);
  vertex(x2 - r, y2);
  quadraticVertex(x2, y2, x2, y2 + r);
  vertex(x3, y3 - r);
  quadraticVertex(x3, y3, x3 - r, y3);
  vertex(x4 + r, y4);
  quadraticVertex(x4, y4, x4, y4 - r);
  vertex(x1, y1 + r);
  quadraticVertex(x1, y1, x1 + r, y1);
  endShape(CLOSE);
}

// function ramenMark(x, y, w, mode="CORNER"){
  
// }

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