let textAnimations = [];
let ft = [];
let cp;

const msg = ['ありがとう', 'がんばれ', 'ごめんね', "サンキュー", "好き", "泣きそう", "笑える", "1 + 1", "(^^)", "ムカつく", "いっしょに帰ろ", "どうしたの?",
"春はあけぼの", "聖徳太子", "カルシウム", "体育", "Birthday", "1時間目"];
const grid = 80;


function preload(){
  ft[0] = loadFont("../../assets/font/Harenosora.otf");
  ft[0] = loadFont("../../assets/font/851MkPOP_101.ttf");
  ft[0] = loadFont("../../assets/font/851tegaki_zatsu_normal_0883.ttf");
  ft[0] = loadFont("../../assets/font/g_pencilkaisho_free.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  cp = random(colorPalletes).colors;
}

function draw() {
  background(240);

  stroke(187, 206, 207, 150);
  gridLine(grid/2);

  if(frameCount%5==0){
    const c = random() < 0.05 ? color(200, 20, 20) : color(random(100));
    const animationOptions = {
      text: random(msg),
      x: random(width),
      y: grid * floor(random(height / grid + 1)),
      color: c,
      size: grid * 0.8,
      animationTime: random(100, 200),
      inAnimationTime: random(30, 50),
      outAnimationTime: random(30, 50),
      font: random(ft)
    };
    textAnimations.push(new TextAnimation(animationOptions));
  }

  for(let i in textAnimations){
    textAnimations[i].move();
    textAnimations[i].display();
  }

  for (let i in textAnimations) {
    if (textAnimations[i].end) {
      textAnimations.splice(i, 1);
    }
  }

  console.log(textAnimations.length)
}

class TextAnimation {
  constructor(options){
    this.text = options.text;
    this.p = createVector(options.x, options.y);
    this.s = options.size;
    this.c = [red(options.color), green(options.color), blue(options.color), 255];
    this.inAnimationTime = options.inAnimationTime;
    this.outAnimationTime = options.outAnimationTime;
    this.animationTime = options.animationTime;
    this.font = options.font;
    this.t = 0;
    this.inTime = 0;
    this.outTime = 0;
    this.end = false;
  }

  fadeIn(t){
    this.c[3] = map(this.inTime/t, 0, 1, 0, 255);
    this.inTime++;
  }

  fadeOut(t) {
    this.c[3] = map(this.outTime / t, 0, 1, 255, 0);
    this.outTime++;
  }

  move(){
    if (this.t < this.inAnimationTime){
      this.fadeIn(this.inAnimationTime);
    }
    if(this.t > this.animationTime - this.outAnimationTime){
      this.fadeOut(this.outAnimationTime);
    }
    this.t++;

    this.end = this.t > this.animationTime;
  }

  display(){
    push();
    textFont(this.font);
    textAlign(CENTER);
    textSize(this.s);
    fill(this.c);
    noStroke();
    text(this.text, this.p.x, this.p.y);
    pop();
  }
}

function gridLine(grid) {
  let index = 0;
  for (let x = grid / 2; x < width; x += grid) {
    if(index%2 == 0){
      drawingContext.setLineDash([1, 1]);
    } else {
      drawingContext.setLineDash([5, 5]);
    }
    line(x, 0, x, height);
    index ++;
  }

  index = 0;
  for (let y = grid / 2; y < height; y += grid) {
    if (index % 2 == 0) {
      drawingContext.setLineDash([1, 1]);
    } else {
      drawingContext.setLineDash([5, 5]);
    }
    line(0, y, width, y);
    index ++;
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