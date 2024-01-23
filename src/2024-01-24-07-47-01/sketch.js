const grid = 50;
let wn;
let hn;

function setup() {
  createCanvas(windowWidth, windowHeight);

  wn = floor(width / 2 / grid);
  hn = floor(height / 2 / grid);

  frameRate(1);
}

function draw() {
  background(245);

  strokeWeight(1);
  stroke(200);
  gridLine(grid);

  translate(width / 2, height / 2);

  strokeWeight(2);
  stroke(30);
  noFill();
  for(let i = 0; i < 10; i ++){
    matRect(floor(random(-wn, wn)) * grid, floor(random(-hn, hn)) * grid, floor(random(wn)) * grid, floor(random(hn))*grid, [
      [1, random(-1, 1)],
      [0, 1]
    ]);
  }
}

function gridLine(grid) {
  for(let x = grid/2; x < width; x += grid){
    line(x, 0, x, height);
  }
  for(let y = grid/2; y < height; y += grid){
    line(0, y, width, y);
  }
}

function matMult(mat1, mat2) {
  const a = mat1[0][0] * mat2[0][0] + mat1[0][1] * mat2[1][0];
  const b = mat1[0][0] * mat2[0][1] + mat1[0][1] * mat2[1][1];
  const c = mat1[1][0] * mat2[0][0] + mat1[1][1] * mat2[1][0];
  const d = mat1[1][0] * mat2[0][1] + mat1[1][1] * mat2[1][1];
  return [[a, b], [c, d]]
}

function matRect(x, y, w, h, mat) {
  let p = [];
  p[0] = createVector(x * mat[0][0] + y * mat[0][1], x * mat[1][0] + y * mat[1][1]);
  p[1] = createVector((x + w) * mat[0][0] + y * mat[0][1], (x + w) * mat[1][0] + y * mat[1][1]);
  p[2] = createVector((x + w) * mat[0][0] + (y + h) * mat[0][1], (x + w) * mat[1][0] + (y + h) * mat[1][1]);
  p[3] = createVector(x * mat[0][0] + (y + h) * mat[0][1], x * mat[1][0] + (y + h) * mat[1][1]);

  push();
  translate(-w/2, -h/2);
  beginShape();
  for(let i in p){
    vertex(p[i].x, p[i].y);
  }
  endShape(CLOSE);
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