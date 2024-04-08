const n = 80;
let moveCircles = [];

function setup() {
  const w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  background(0);

  const cp = random(colorPalletes).colors;
  for(let i = 0; i < n; i ++){
    moveCircles.push(new MoveCircle(random(cp)));
  }
}

function draw() {
  background(0, 20);

  blendMode(ADD);

  for(let c of moveCircles){
    c.move();
    c.display();
  }

  blendMode(BLEND);
}

class MoveCircle {
  constructor(c){
    this.p = createVector(random(width), random(height));
    this.s = min(width, height) * random(0.05, 0.2);
    this.seed = random(1000);
    this.c = c;
  }

  move(){
    this.p.x += noise(frameCount / 100, this.seed) - 0.5;
    this.p.y += noise(frameCount / 100, this.seed+1) - 0.5;
  }

  display(){
    const c = color(red(this.c), green(this.c), blue(this.c), 10)
    stroke(c);
    line(this.p.x, 0, this.p.x, height);
    line(0, this.p.y, width, this.p.y);

    stroke(c);
    fill(c);
    rectMode(CENTER);
    rect(this.p.x, this.p.y, this.s, this.s);
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