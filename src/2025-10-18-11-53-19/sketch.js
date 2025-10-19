const cp = ["#F15946", "#5681CB", "#FAAA2D", "#296647"];
let fonts = [];

function preload(){
  fonts[0] = loadFont("../../assets/font/any/tamanegi.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  noCursor();

  const interval = 90;
  const progress = (frameCount % interval) / interval;
  const progress2 = ((frameCount + interval/2) % interval) / interval;
  const count = floor(frameCount / interval);

  push();
  translate(width / 2, height / 2);
  scale(random(1.5, 16, 32, 64));
  randomSeed(count);

  const font = random(fonts);
  const c1 = random() < 0.3 ? cp[count % cp.length] : "#fff";
  const c2 = c1 == "#fff" ? cp[count % cp.length] : "#fff";
  background(c1);

  const words = ["麻婆豆腐", "たこやき", "めがね", "CA", "VJ", "メディアアート", "ライブ", "ラッキーキリマンジャロ", "ライフイズテック"];
  const word = random(words);

  const cols = 32;
  const rows = 18;

  const gx = width / cols;
  const gy = height / rows;

  const a = floor(pow(random(), 3) * 4);
  const b = floor(pow(random(), 3) * 4);

  const angle = random() < 0.3 ? progress * TAU : 0;
  const scl = random() < 0.3 ? map(progress, 0, 1, 1, 1.5) : 1;

  for(let row = 0; row < rows; row ++){
    for(let col = 0; col < cols; col ++){
      const x = map(col, 0, cols - 1, -width/2, width/2);
      const y = map(row, 0, rows - 1, -height/2, height/2);

      const vy = progress * gy * a;
      const vx = progress * gx * b;

      const ny = (y + vy + height / 2) % height - height / 2;
      const nx = (x + vx + width / 2) % width - width / 2;

      const s = min(width / cols, height / rows) * 0.8;
      const str = [...word][(col + row*cols) % word.length];

      push();
      textFont(font);
      translate(nx, ny);
      rotate(angle);
      textSize(s *scl);
      textAlign(CENTER, CENTER);
      fill(c2);
      text(str, 0, 0);
      pop();
    }
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  // Space key
  if (keyCode === 32) {
    fullscreen(true);
  }
}