let lastMouseTime;
let inactiveTimeThreshold = 3000; // 3 seconds
let capture_pg;
let ft;

function preload(){
  ft = loadFont("../../assets/font/DSEG14ClassicMini-BoldItalic.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  lastMouseTime = millis();

  capture = createCapture(VIDEO);
  capture.hide();

  capture_pg = createGraphics(width, height);
}

function draw() {
    capture_pg.image(capture, 0, 0, width, height);
    
    // 現在の時刻を取得
    let now = new Date();

    // 時、分、秒を取得
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // ゼロパディング（1桁の場合、前に0を追加）
    hours = padNumber(hours);
    minutes = padNumber(minutes);
    seconds = padNumber(seconds);

    // 時刻を表示
    // capture_pg.textFont(ft);
    // capture_pg.textSize(300);
    // capture_pg.fill(255);
    // capture_pg.textAlign(CENTER);
    // capture_pg.text(`${hours}:${minutes}:${seconds}`, width/2 - 70, height - 100);

    background(255);

    const grid = 15;
    for (let x = 0; x < width; x += grid) {
      for (let y = 0; y < height; y += grid) {
        const c = capture_pg.get(x + grid / 2, y + grid / 2);
        const gray = (red(c) + green(c) + blue(c)) / 3;
        const maxN = 10;
        const n = floor(pow(map(gray, 0, 255, 0, 1), 3) * (maxN - 1) + 1);
        if (checkInactive()) {
        for(let i = 0; i < n; i ++){
          const _x = x + grid * i/n;
          push();
          translate(_x, y+grid/2);
          rotate(frameCount/100 + x/1000 + y/1000);
          line(0, -grid/2, 0, grid/2);
          pop();
        }
      } else {
        const d = dist(x, y, mouseX, mouseY);
        text(n, x, y);
      }
      }
    }

    // image(capture_pg, 0, 0)
}

function checkInactive() {
  let inactiveTime = millis() - lastMouseTime;
  return inactiveTime > inactiveTimeThreshold;
}

function millisSinceLastMove() {
  return millis() - lastMouseTime;
}

function mouseMoved() {
  lastMouseTime = millis();
}

function padNumber(number) {
  return (number < 10) ? '0' + number : number;
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
];