const BPM = 100;
const gvm = new GVM(BPM);
const grad = new GradStyle();

let img;

function preload(){
  img = loadImage("../../assets/image/rose.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  img.resize(width, 0);

  background(0);

  const n = 30;
  const m = floor(n * 9 / 16) + 1;
  for (let i = -n; i <= n; i++) {
    for (let j = -m; j <= m; j++) {
      const s = width / (2 * n);
      const x = i * s;
      const y = j * s;
      const z = noise(i, j) * s * 3;

      const tex = createGraphics(s, s);
      tex.image(img, 0, 0, s * map(noise(i, j, 7), 0, 1, 0.5, 1.5), s * map(noise(i, j, 8), 0, 1, 0.5, 1.5), x + width / 2, y + height / 2, s, s);

      push();
      translate(x, y, z);
      texture(tex);
      noStroke();
      
      rotateX(map(floor(noise(i, j, 1) * 10) / 10, 0, 1, -PI/4, PI/4));
      rotateY(map(floor(noise(i, j, 2) * 10) / 10, 0, 1, -PI/4, PI/4));
      rotateZ(map(floor(noise(i, j, 3) * 10) / 10, 0, 1, -PI/4, PI/4));

      box(s);
      pop();
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