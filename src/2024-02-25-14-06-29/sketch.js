const n = 1000;
let p = [];
let c = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  const cp = random(colorPalletes).colors;
  for(let i = 0; i < n; i ++){
    const th = TAU * i/n;
    const r = min(width, height) * 0.3;
    p[i] = createVector(width/2+r*cos(th), height/2+r*sin(th));
    c[i] = random(cp);
  }

  frameRate(10);
}

function draw() {
  background(0, 100);

  blendMode(ADD);

  for(let i in p){
    stroke(c[i]);
    line(p[i].x, p[i].y, p[i].x, height);

    p[i].x += (random()-0.5) * 20;
    p[i].y += (random()-0.5) * 20;
  }

  blendMode(BLEND);
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