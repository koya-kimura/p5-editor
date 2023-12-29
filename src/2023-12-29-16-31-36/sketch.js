let theShader;
let pg;
let balls = [];

let n = 500;

let bgm;
let fft;

function preload(){
  theShader = loadShader("main.vert", "main.frag");
  bgm = loadSound("../../assets/sound/Love_This_Beat_free_BGM_ver.mp3");
}

function setup() {
  createCanvas(windowWidth, windowWidth/2.35, WEBGL);

  fft = fft = new p5.FFT(0.8, 32);

  pg = createGraphics(width, height);

  const cp = random(colorPalletes).colors;

  for(let i = 0; i < n; i ++){
    balls.push(new Ball(i, cp));
  }
}

function draw() {
  if(noise(frameCount/100) > 0.9){
    frameRate(10);
  } else {
    frameRate(60);
  }

  let spm = fft.analyze();
  for (let i in spm) {
    spm[i] = map(spm[i], 0, 255, 0, 1);
  }

  pg.background(0);

  pg.blendMode(ADD);
  for(let i in balls){
    balls[i].move(spm[20] > 0.3);
    balls[i].display(pg);
  }
  pg.blendMode(BLEND);

  shader(theShader);

  theShader.setUniform("u_tex", pg);
  theShader.setUniform("u_time", frameCount / 100);

  rect(0, 0, width, height);
}

class Ball {
  constructor(_i, _cp){
    this.is = min(width, height)*random(0.03, 0.05);
    this.s = this.is;
    this.p = createVector(random(this.s / 2, width - this.s / 2), random(this.s / 2, height - this.s / 2));
    this.v = p5.Vector.random2D().mult(random(1, 5));
    this.c = random(_cp);
    this.i = _i;
  }

  move(_fr){
    if(this.p.x < -this.s || width + this.s < this.p.x){
      this.v.x *= -1;
    }
    if (this.p.y < -this.s || height + this.s < this.p.y) {
      this.v.y *= -1;
    }

    this.p.add(this.v);
    this.s = this.is + pow(sin(frameCount / 500), 19) * min(width, height) * 0.1;
  }

  display(pg) {
    pg.push();
    if(cos(frameCount/100) > 0){
      pg.fill(this.c);
      pg.noStroke();
    } else {
      pg.stroke(this.c);
      pg.noFill();
    }

    pg.translate(this.p.x, this.p.y);
    pg.rotate(frameCount / 100 + this.i);
    pg.rect(0, 0, this.s / sqrt(2), this.s / sqrt(2));
    pg.pop();
  }
}

function atan2(y, x) {
  return x == 0 ? sign(y) * PI / 2 : atan(y, x);
}

function keyPressed() {
  if (bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.setVolume(0.1)
    bgm.loop();
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

