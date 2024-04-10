function setup() {
  const w = min(windowWidth, windowHeight);
  createCanvas(w, w);
  background(0);

  const cp = random(colorPalletes).colors;
  for(let i = 0; i < 1000; i ++){
    const x = random(width);
    const y = random(height);
    const c = random(cp);
    const size = w * random(0.1, 0.4);
    const angle = random(TAU);

    const min = 65; // 'A'のアスキーコード
    const max = 90; // 'Z'のアスキーコード
    const code = floor(random() * (max - min + 1)) + min;
    const txt = String.fromCharCode(code);

    textAlign(CENTER);
    textSize(size);

    push();
    stroke(random(255));
    strokeWeight(20);
    fill(c);
    translate(x, y);
    rotate(angle);
    text(txt, 0, 0);
    pop();
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