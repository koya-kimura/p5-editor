let tex;

function setup() {
  if (windowHeight > windowWidth * 9 / 16){
    createCanvas(windowWidth, windowWidth * 9 / 16);
  } else {
    createCanvas(windowHeight * 16 / 9, windowHeight);
  }

  tex = createGraphics(width, height);
  tex.background(0);
  tex.fill(255);
  tex.textAlign(CENTER, CENTER);
  tex.textSize(min(width, height) * 0.5);
  tex.textFont("Helvetica");
  tex.text("Flow", width/2, height/2);
}

function draw() {
  const bgc = random() < 0.2 ? 0 : 255;
  const ojc = 255 - bgc;

  background(bgc);

  const t = frameCount * 0.01;
  const count = floor(t);
  const progress = fract(t);

  randomSeed(noise(count) * 487901);

  const scene = floor(random(2));

  fill(ojc);
  noStroke();
  textFont("Helvetica");

  if(scene == 0){
    push();
    const n = random(2, 5) * 10;
    const step = height / n;
    for(let x = 0; x < width; x += step){
      for (let y = 0; y < height; y += step) {
        const chr = random(["F", "L", "O", "W"]);
        const c = tex.get(x+step*0.5, y+step*0.5);
        const g = (red(c)+green(c)+blue(c))/3/255;
        const dir = random([{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }])
        const nx = (x + width + dir.x * width * easeInOutQuint(progress)) % width;
        const ny = (y + height + dir.y * height * easeInOutQuint(progress)) % height;

        if(g > 0.5){
          textSize(step);
          text(chr, nx, ny);
        }
      }
    }
    pop();
  }
  else {
    push();
    const n = floor(random(4, 20));
    for(let i = 0; i < n; i ++){
      const chr = ["F", "L", "O", "W"][i % 4];
      const angle = TAU * i / n + frameCount * 0.01;
      const x = width / 2 + min(width, height) * 0.3 * cos(angle);
      const y = height / 2 + min(width, height) * 0.3 * sin(angle);
      const asp = map(abs(progress - 0.5), 0, 0.5, 2, 1);

      push();
      translate(x, y);
      rotate(angle + PI/2);
      scale(1, asp);
      textAlign(CENTER, CENTER);
      textSize(min(width, height) * 0.05);
      text(chr, 0, 0);
      pop();
    }
    pop();
  }
}

function easeInOutQuint(x) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
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