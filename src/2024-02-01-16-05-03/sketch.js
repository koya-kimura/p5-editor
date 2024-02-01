function setup() {
  createCanvas(windowWidth, windowHeight);

  background(255);

  let cp = random(colorPalletes).colors;
  const c1 = random(cp);

  const index = cp.indexOf(c1);
  cp.splice(index, 1)
  const c2 = random(cp);

  const n = floor(random(20, 40));
  const h = height / n;
  for (let y = 0; y < height; y += h) {
    strokeWeight(2);

    const x = random(width);
    const s = random(0.1, 0.5) * min(width, height);

    fill(c1);
    stroke(c2)
    ovalCircle(x, y, s);

    fill(c2);
    stroke(c1)
    rect(0, y, width, height);
  }

  for(let i = 0; i < 10000; i ++){
    stroke(c2);
    point(random(width), random(height), 1);
  }
}

function ovalCircle(x, y, r) {
  const seed = random(1000);
  beginShape();
  for (let th = 0; th < TAU; th += 0.05) {
    const noiser = r * noise(th/2, seed);
    const px = x + noiser * cos(th);
    const py = y + noiser * sin(th);
    curveVertex(px, py)
  }
  endShape(CLOSE);
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