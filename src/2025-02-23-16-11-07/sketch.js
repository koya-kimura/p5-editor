const BPM = 100;
const gvm = new GVM(BPM);
const grad = new GradStyle();

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  const palette = colorPalletes[1].colors;
  const n = floor(gvm.count() / 8);
  const c1 = palette[n % palette.length];
  const c2 = palette[(n + 1) % palette.length];

  grad.setStyle(c1, "grad")
  grad.adjustedRect(width/2, height/2, width, height);

  for(let i = 0; i < 10; i ++){
    for (let angle = 0; angle < TAU; angle += TAU / 8) {
      const r = map(gvm.leapNoise(8, 4, [i, 0]), 0, 1, 0.1, 0.85) * min(width, height) / 2;
      const x = width / 2 + cos(angle + frameCount * 0.003 + TAU * i / 10) * r;
      const y = height / 2 + sin(angle + frameCount * 0.003 + TAU * i / 10) * r;
      const s = map(Easing.easeInOutSine(abs((gvm.count() / 2) % 2 - 1)), 0, 1, 0.8, 1.2) * map(pow(gvm.leapNoise(8, 4, [i, 0]), 2), 0, 1, 0.01, 0.2) * min(width, height);

      grad.setStyle(c2, "grad");
      grad.adjustedEllipse(x, y, s, s);
    }
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