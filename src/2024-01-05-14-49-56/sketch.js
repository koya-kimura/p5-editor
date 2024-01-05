let j;
let n;
let s;
let gscl;

function setup() {
  createCanvas(600, 600);

  colorMode(HSB);

  stroke(random(360), 0.47, 0.35);

  j = floor(random(3, 7));
  n = floor(random(2, 10));
  s = width / n;
  gscl = random()*2;
}

function draw(){
  background("#F1F0EA");

  for (let x = 0; x < width; x += s) {
    for (let y = 0; y < height; y += s) {
      for (let i = 1; i < j; i++) {
        const scl = i / j;
        const k = s * scl;
        const _x = x + s * (1 - scl) / 2;
        const _y = y + s * (1 - scl) / 2;

        line(_x + (s * gscl * (noise(frameCount/100, x/100, y/100+i)-0.5)), _y + (s * gscl * (noise(frameCount/100, x/100+0.1, y/100+i)-0.5)), _x + k + (s * gscl * (noise(frameCount/100, x/100+0.2, y/100+i)-0.5)), _y + (s * gscl * (noise(frameCount/100, x/100+0.3, y/100+i)-0.5)));
        line(_x + (s * gscl * (noise(frameCount/100, x/100+0.4, y/100+i)-0.5)), _y + (s * gscl * (noise(frameCount/100, x/100+0.5, y/100+i)-0.5)), _x + (s * gscl * (noise(frameCount/100, x/100+0.6, y/100+i)-0.5)), _y + k + (s * gscl * (noise(frameCount/100, x/100+0.7, y/100+i)-0.5)));
        line(_x + k + (s * gscl * (noise(frameCount/100, x/100+0.8, y/100+i)-0.5)), _y + (s * gscl * (noise(frameCount/100, x/100+0.9, y/100+i)-0.5)), _x + k + (s * gscl * (noise(frameCount/100, x/100+1.0, y/100+i)-0.5)), _y + k + (s * gscl * (noise(frameCount/100, x/100+1.1, y/100+i)-0.5)));
        line(_x + (s * gscl * (noise(frameCount/100, x/100+1.2, y/100+i)-0.5)), _y + k + (s * gscl * (noise(frameCount/100, x/100+1.3, y/100+i)-0.5)), _x + k + (s * gscl * (noise(frameCount/100, x/100+1.4, y/100+i)-0.5)), _y + k + (s * gscl * (noise(frameCount/100, x/100+1.5, y/100+i)-0.5)));
      }
    }
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