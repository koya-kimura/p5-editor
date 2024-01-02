let pg;

let period;

const n = 1000;
let p = [];
let v = [];
let s = [];
let c = [];
let si = 30;

let fs;

let msg = "COLORPALETTE"
let msgArr = [...msg];

function setup() {
  createCanvas(windowWidth, windowHeight);

  period = floor(random()*10)*20;
  fs = random(10, 400);

  pg = createGraphics(width, height);
  pg.background(0);
  pg.fill(255);
  pg.textSize(fs);

  let index = 0;
  for(let y = -fs; y < height; y += fs){
    for (let x = -fs; x < width + fs; x += fs) {
      pg.text(msgArr[index%msgArr.length], x, y);
      index ++;
    }
  }

  background(255);

  colorMode(HSB, 1.0, 1.0, 1.0, 1.0);

  noStroke();

  let ci = random();
  let cp = [];
  cp[0] = random();
  cp[1] = random();
  cp[2] = random();

  for(let i = 0; i < n; i ++){
    p[i] = createVector(0, i*height/n);
    v[i] = createVector(1.0, noise(p[i].y/100)-0.5);
    s[i] = si;
    c[i] = color(random(cp), 1.0, 1.0);
  }
}

function draw() {
  for(let i in p){
    const pgc = pg.get(p[i].x, p[i].y);
    const gray = (red(pgc)+green(pgc)+blue(pgc))/3;

    if(gray > 0.1){
      fill(c[i]);
    } else {
      fill(0);
    }
    circle(p[i].x, p[i].y, s[i]);

    v[i].add(createVector(0.0, (noise(p[i].x / 100 , p[i].y / 100, frameCount / 10) - 0.5) * 0.1));
    p[i].add(v[i]);

    if (sin(frameCount / 10) < 0.001) {
      p[i].y = i * height / n;
      v[i] = createVector(1.0, noise(p[i].y / 100) - 0.5);
    }
    s[i] = si + sin(frameCount / period) * si + 2;
  }
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
];