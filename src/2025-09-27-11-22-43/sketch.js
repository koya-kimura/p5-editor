const BPM = 100;
const gvm = new GVM(BPM);
const grad = new GradStyle();

function setup() {
  createCanvas(windowHeight/sqrt(2), windowHeight);
}

function draw() {
  background(255);

  randomSeed(noise(floor(frameCount/30) * 75421)*475213);

  for(let i = 0; i < 50; i ++){
    const str = random() < 0.1 ? "vol.9" : "FLOW"
    const x = random(width);
    const y = random(0.3, 1.1) * height;
    const w = min(width, height) * random(0.4, 0.5);
    const h = w * 0.4;
    const angle = map(pow(random(), 2), 0, 1, 0, 0.4) * random([-1, 1]) * PI;
    const c = str == "FLOW" ? "blue" : "orange";

    push();
    translate(x, y);
    rotate(angle);
    rectMode(CENTER);
    fill(c);
    noStroke();
    rect(0, 0, w, h);

    textAlign(CENTER, CENTER);
    fill(255);
    noStroke();
    textFont('Impact');
    textSize(h*1.05);
    text(str, 0, 0);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  // Space key
  if (keyCode === 32) {
    let fs = fullscreen();
    fullscreen(!fs);
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