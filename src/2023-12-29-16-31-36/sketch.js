let theShader;
let pg;
let balls = [];

let n = 500;

function preload(){
  theShader = loadShader("main.vert", "main.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

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

  pg.background(0);

  pg.blendMode(ADD);
  for(let i in balls){
    balls[i].move();
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

  move(){
    if(this.p.x < this.s/2 || width - this.s / 2 < this.p.x){
      this.v.x *= -1;
    }
    if (this.p.y < this.s / 2 || height - this.s / 2 < this.p.y) {
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