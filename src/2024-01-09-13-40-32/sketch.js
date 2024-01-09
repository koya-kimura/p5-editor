const S = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let cp;

function setup() {
  const w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  background(220);

  frameRate(1);
}

function draw(){
  drawSeparateSquare(0, 0, width, cp);
}

function drawSeparateSquare(_x, _y, _s, _cp) {
  for (let x = 0; x < _s; x += _s / 2) {
    for (let y = 0; y < _s; y += _s / 2) {
      if (_s / 2 > 100 && random(1000) < 700) {
        drawSeparateSquare(_x + x, _y + y, _s / 2, _cp);
      } else {
        let pg = createGraphics(width, height);
        const s = random([...S]);
        const i = String(s).charCodeAt(0);
        pg.background(i);
        pg.textAlign(CENTER);
        pg.textSize(pg.width*0.2);
        pg.fill(255, 50);
        pg.noStroke();
        pg.text(i, width / 2, height / 2 + height * 0.1);
        pg.textSize(pg.width);
        pg.fill(255);
        pg.strokeWeight(15);
        pg.text(s, width / 2, height / 2 + height * 0.38);
        image(pg, _x + x, _y + y, _s / 2, _s / 2);
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