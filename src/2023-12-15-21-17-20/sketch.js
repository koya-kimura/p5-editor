let theShader;
let peShader;
let pg;
let pg_3d;
let pg_main;

let font = [];
let bgm;

let fft;

var panel;
var blend0 = 0.5;
var blend1 = 0.5;
var blendWhite = 0;
var blendBlack = 0;
var distortion = 0.0;

let blendSeed = 100;

function preload() {
  theShader = loadShader("main.vert", "main.frag");
  peShader = loadShader("main.vert", "post.frag");
  font[0] = loadFont("../../assets/font/DSEG14ClassicMini-BoldItalic.ttf");
  font[1] = loadFont("../../assets/font/Harenosora.otf");
  font[2] = loadFont("../../assets/font/Neoneon.otf");
  bgm = loadSound("../../assets/sound/RELOAD_Free_BGM_ver2.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  fft = fft = new p5.FFT(0.8, 32);

  // panel = createGui('parameter');
  // sliderRange(0, 1, 0.01);
  // panel.addGlobals('blend0');

  // sliderRange(0, 1, 0.01);
  // panel.addGlobals('blend1');

  // sliderRange(0, 1, 0.01);
  // panel.addGlobals('blendWhite');

  // sliderRange(0, 1, 0.01);
  // panel.addGlobals('blendBlack');

  // sliderRange(0, 5, 0.01);
  // panel.addGlobals('distortion');

  pg = createGraphics(width, height);
  pg_3d = createGraphics(width, height, WEBGL);
  pg_main = createGraphics(width, height, WEBGL);

  blendSeed = floor(random(1000));
}

function draw() {
  let spm = fft.analyze();
  let spmAvg = 0;
  for(let i in spm){
    spm[i] = map(spm[i], 0, 255, 0, 1);
    spmAvg += spm[i];
  }
  spmAvg /= spm.length;

  blend0 = constrain(noise(frameCount / 300, blendSeed) * 1.3, 0.7, 1.2);
  blend1 = constrain(noise(frameCount / 300, blendSeed+1) * 1.3, 0.7, 1.2);

  distortion = pow(spmAvg+0.3, 5.0) + 0.2;

  pg.background(0);
  if(noise(frameCount/100, 57) < 0.7){
    pg.textFont(font[0]);
  } else {
    pg.textFont(font[floor(random(font.length))]);
  }
  pg.fill(255);
  pg.textSize(height / 5);
  pg.textAlign(CENTER);
  pg.text("hello world", width / 2, height / 2 + height/10);

  pg_3d.background(0);

  pg_3d.fill(255, 100+pow(spmAvg, 2)*150);
  pg_3d.stroke(255);
  const boxNum = 10;
  for (let i = 0; i < boxNum; i++) {
    pg_3d.push();
    pg_3d.rotateX(frameCount / 50 - i/10);
    pg_3d.rotateY(frameCount / 50 - i/10);
    pg_3d.rotateZ(frameCount / 50 - i/10);
    pg_3d.translate(height * 0.35 * sin(frameCount / 50 - i / 10), height * 0.35 * cos(frameCount / 50 - i / 10), height * 0.35 * cos(frameCount / 50 - i / 10));
    if (spmAvg > 0.5 && noise(frameCount/100) > 0.5){
      pg_3d.translate(height * 3 * (noise(frameCount / 200, i, 0) - 0.5), height* 3 * (noise(frameCount / 200, i, 1) - 0.5), height * 3 * (noise(frameCount / 200, i, 2) - 0.5))
    }
    pg_3d.box(height * 0.2 * spm[floor(i * spm.length / boxNum)]);
    pg_3d.pop();
  }


  pg_main.shader(theShader);

  theShader.setUniform("u_tex", pg);
  theShader.setUniform("u_tex3d", pg_3d);
  theShader.setUniform("u_time", frameCount / 100);
  theShader.setUniform("u_blend0", blend0);
  theShader.setUniform("u_blend1", blend1);
  theShader.setUniform("u_vol", spmAvg);
  theShader.setUniform("u_noise", noise(frameCount/100));

  pg_main.rect(0, 0, width, height);

  shader(peShader);

  peShader.setUniform("u_tex", pg_main);
  peShader.setUniform("u_time", frameCount / 100);
  peShader.setUniform("u_white", pow(blendWhite, 2.0));
  peShader.setUniform("u_black", blendBlack);
  peShader.setUniform("u_distortion", distortion);

  rect(0, 0, width, height);

  pg.remove();
  pg_3d.remove();
  pg_main.remove();
}

function keyPressed() {
  if (bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.setVolume(0.1)
    bgm.loop();
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