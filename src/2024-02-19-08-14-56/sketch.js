
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  blendMode(ADD);

  const w = min(width, height);
  const cp = random(colorPalletes).colors;
  const n = 10;
  const m = 5000;

  translate(width/2, height/2);
  for(let i = 0; i < n; i ++){
    push();
    const c = random(cp);
    translate(cos(i) * random(w / 5), sin(i) * random(w / 3))
    for (let j = 0; j < m; j++) {
      push();

      const x = cos(j) * random(w/10);
      const y = sin(j) * random(w/10);

      stroke(c);
      point(x, y);
      pop();
    }
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