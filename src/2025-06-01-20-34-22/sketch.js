const BPM = 100;
const gvm = new GVM(BPM);
const grad = new GradStyle();

let interval = 50;

let x;
let y;
let r;
let cp;
let c;
let s;
let a;
let as;

let xa = [];
let ya = [];
let ra = [];
let ca = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  a = random(TAU);
  as = a;
  x = width * random(0.1, 0.9);
  y = height * random(0.1, 0.9);
  r = min(width, height) * random(0.05, 0.2);
  cp = [];
  for(let i = 0; i < 10; i ++){
    colorMode(HSB, 360, 100, 100, 100);
    cp.push(color(random(360), 100, 100, 100));
  }
  c = random(cp);
  s = min(width, height) * 0.003;

  a += PI * 0.5;

  frameRate(60);
}

function draw() {
  background(0);

  blendMode(ADD);

  for(let i = 0; i < 1000; i ++){
    const px = map(noise(i), 0, 1, -0.2, 1.2) * width;
    const py = map(noise(i + 1000), 0, 1, -0.2, 1.2) * height;
    const pr = map(sin(i+frameCount*0.01), -1, 1, 0, pow(noise(i + 2000), 3)*0.03) * min(width, height);

    fill(0, 0, 100, 5);
    noStroke();
    ellipse(px, py, pr * 3, pr * 3);
  }

  const progress = easeOutSine(map(frameCount%interval, 0, interval-1, 0, 1));

  if (frameCount != 0 && progress == 0){
    xa.push(x);
    ya.push(y);
    ra.push(r);
    ca.push(color(hue(c), saturation(c), brightness(c), map(r, min(width, height) * 0.05, min(width, height) * 0.2, 20, 255)));

    if(a > as + TAU){
      a = random(TAU);

      let avgx = 0;
      let avgy = 0;
      for(let i in x){
        avgx += xa[i];
        avgy += ya[i];
      }

      avgx /= xa.length;
      avgy /= ya.length;

      x = width * random(0.1, 0.9) * 0.7 + avgx * 0.3;
      y = height * random(0.1, 0.9) * 0.7 + avgy * 0.3;

      as = a;
      interval = max(floor(interval - 5), 20);
      c = random(cp);
    } else {
      a += 0.4;

      x = x + r * 0.5 * cos(a);
      y = y + r * 0.5 * sin(a);
    }

    r = min(width, height) * random(0.05, 0.2);
    c = color((360 + hue(c) + random(-20, 20)) % 360, 100, 100, 100);
  }

  for (let i in xa) {
    fill(hue(ca[i]), saturation(ca[i]), brightness(ca[i]), 100);
    noStroke();
    ellipse(xa[i], ya[i], s * 3, s * 3);

    fill(0, 0, 100, 10);
    stroke(ca[i]);
    strokeWeight(s);
    ellipse(xa[i], ya[i], ra[i], ra[i]);
  }

  fill(c);
  noStroke();
  ellipse(x, y, s*3, s*3);

  fill(0, 0, 100, 10);
  stroke(hue(c), saturation(c), brightness(c), map(r, min(width, height) * 0.05, min(width, height) * 0.2, 20, 255));
  strokeWeight(s);
  ellipse(x, y, r * progress, r * progress);

  blendMode(BLEND);
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

function easeInSine(x) {
  return 1 - Math.cos((x * Math.PI) / 2);
}

function easeOutSine(x) {
  return Math.sin((x * Math.PI) / 2);
}

function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
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