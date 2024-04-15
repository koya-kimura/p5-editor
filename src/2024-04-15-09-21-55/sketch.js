let cp;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  cp = random(colorPalletes).colors;
}

function draw() {
  background(0, 50);

  blendMode(ADD);

  push();
  translate(0, height/2);
  for(let x = -47; x < width+53; x += 5) {
    const h = pow(sin(t / 100 + x / 100 + noise(x / 100, t / 100)), 3) * height / 5 + pow((noise(x / 100, t / 100) - 0.5) * 2, 3) * height / 4;
    for(let i = 0; i < 20; i ++) {
      const index = floor(noise(x/1000, i/100, t/100) * cp.length);
      // const c = cp[index];
      const c = color(floor(noise(x / 1000, i / 100, t / 100) * 255 / 20) * 20);
      fill(red(c), green(c), blue(c), 200);
      noStroke();
      circle(x, h*i/10, (20-i));
    }
  }
  pop();

  t += floor(pow(noise(frameCount/100), 2) * 10) + 1;

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