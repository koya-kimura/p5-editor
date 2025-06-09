const BPM = 126;
const gvm = new GVM(BPM);
const grad = new GradStyle();

const n = 7;
let chars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for(let i = 0; i < n; i ++){
    chars.push(new CharSnake());
  }
}

function draw() {
  background(0);

  for(let char of chars){
    char.display();
  }
}

class CharSnake {
  constructor() {
    this.seed = random(10000);
    this.size = map(pow(random(), 3), 0, 1, 0.05, 0.15) * min(width, height);
    this.color = color(255);
    this.texts = Array.from({ length: 7 }, () => String.fromCharCode(floor(random(65, 91))));
  }

  display() {
    textSize(this.size);
    textAlign(CENTER, CENTER);

    for(let i = 0; i < this.texts.length; i++) {
      const x1 = map(noise(frameCount*0.003 + i*0.07, this.seed, 0), 0, 1, -0.5, 1.5) * width;
      const y1 = map(noise(frameCount * 0.003 + i*0.07, this.seed, 1), 0, 1, -0.5, 1.5) * height;

      const x2 = map(noise(frameCount * 0.003 + (i+1) * 0.07, this.seed, 0), 0, 1, -0.5, 1.5) * width;
      const y2 = map(noise(frameCount * 0.003 + (i+1) * 0.07, this.seed, 1), 0, 1, -0.5, 1.5) * height;

      const angle = (atan2(y2 - y1, x2 - x1) + PI / 2) % TAU;

      push();
      translate(x1, y1);
      rotate(angle);
      noStroke();
      fill(this.color);
      textFont("Helvetica");
      text(this.texts[i], 0, 0);
      pop();

      push();
      stroke(this.color);
      line(x1, y1, x2, y2);
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