function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  const cp = random(colorPalletes).colors;

  background(random(cp));

  for(let i = 0; i < 10000; i ++){
    const r = random(width * 0.25); // arcの引数1つめの半分
    const angle = random(PI, TAU);
    const x = width * 0.5 + r * cos(angle);
    const y = height * 0.5 + r * sin(angle);
    const w = min(width, height) * random(0.03, 0.08);
    const h = min(width, height) * random(0.01, 0.04);

    push();
    translate(x, y);
    rotate(random(TAU));
    noStroke();
    fill(random(240, 255));
    ellipse(0, 0, w, h);
    pop();
  }

  noStroke();
  fill(random(cp));
  rect(width * 0.5, height * 0.85, width * 0.3, height * 0.15);
  arc(width * 0.5, height * 0.5, width * 0.5, height * 0.7, 0, PI);
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