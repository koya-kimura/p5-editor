const n = 3000;
let r = [];
let th = [];
let c = [];
let thSpeed = [];

let p1, p2, p3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  const cp = random(colorPalletes).colors;
  for(let i = 0; i < n; i ++){
    c[i] = random(cp);
    r[i] = min(width, height) * random(0.35, 0.45);
    th[i] = random(TAU);
    thSpeed[i] = random(0.001, 0.01) * TAU;
  }

  p1 = createVector(random(width), random(height));
  p2 = createVector(random(width), random(height));
  p3 = createVector(random(width), random(height));
}

function draw() {
  background(0, 100);

  blendMode(ADD);

  for (let i = 0; i < n; i++) {
    const x = width/2 + r[i] * cos(th[i]);
    const y = height/2 + r[i] * sin(th[i]);

    noFill();
    stroke(red(c[i]), green(c[i]), blue(c[i]), random(50, 100));
    bezier(x, y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

    th[i] += thSpeed[i];
  }

  blendMode(BLEND);
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