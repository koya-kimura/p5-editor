const n = 64;

let pg;
let w;
let cp;

let img;

function setup() {
  createCanvas(windowWidth, windowHeight);

  w = min(width, height) * 0.8;
  w = floor(w / n) * n;
  pg = createGraphics(w, w);
  cp = random(colorPalletes).colors;
  cp = shuffle(cp);

  frameRate(10);
}

function draw() {
  background(245);

  pg.background(255, 100);
  pg.rectMode(CENTER);

  pg.fill(60);
  pg.noStroke();
  pg.rect(w / 2, w * 0.8, w, w * 0.4);

  pg.fill(200);
  pg.noStroke();
  pg.rect(w * 0.5, w * 0.6, w * 0.5, w * 0.05, w * 0.1, w * 0.1);
  pg.rect(w * 0.5, w * 0.7, w * 0.5, w * 0.05, w * 0.1, w * 0.1);
  pg.rect(w * 0.5, w * 0.8, w * 0.5, w * 0.05, w * 0.1, w * 0.1);
  pg.rect(w * 0.5, w * 0.9, w * 0.5, w * 0.05, w * 0.1, w * 0.1);
  pg.rect(w * 0.5, w, w * 0.5, w * 0.05, w * 0.1, w * 0.1);

  pg.fill(cp[0]);
  pg.noStroke();
  pg.rect(w / 2, w * 0.3, w, w * 0.6);

  pg.fill(230);
  pg.noStroke();
  pg.circle(w * 0.15, w * 0.15, w * 0.2)

  pg.fill(50);
  pg.noStroke();
  pg.rect(w / 2, w * 0.3, w * 0.7, w * 0.25, w / 20, w / 20);

  pg.fill(200);
  pg.noStroke();
  pg.rect(w / 2, w * 0.3, w * 0.65, w * 0.2, w / 20, w / 20);

  pg.fill(cp[1]);
  pg.stroke(100);
  pg.strokeWeight(10);
  pg.circle(w * 0.3, w * 0.3, w * 0.15);

  pg.fill(cp[2]);
  pg.stroke(100);
  pg.strokeWeight(10);
  pg.circle(w * 0.5, w * 0.3, w * 0.15);

  pg.fill(cp[3]);
  pg.stroke(100);
  pg.strokeWeight(10);
  pg.circle(w * 0.7, w * 0.3, w * 0.15);

  for (let i = 0; i < 10000; i++) {
    stroke(random(255));
    strokeWeight(random(2));
    point(random(width), random(height));
  }

  const grid = w / n;
  const sx = (width - w) / 2;
  const sy = (height - w) / 2;
  for (let x = 0; x < w; x += grid) {
    for (let y = 0; y < w; y += grid) {
      const c = pg.get(x + grid / 2, y + grid / 2);
      const g = (red(c), green(c), blue(c)) / 3 / 255;
      fill(c);
      noStroke();
      rect(sx + x, sy + y, grid, grid);
    }
  }

  pg.remove();

  noLoop();
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

const colorPalletes = [{
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