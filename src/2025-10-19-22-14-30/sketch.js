function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

function draw() {
  background(0, 50);

  push();
  randomSeed(floor(frameCount / 240) * 7490170);
  translate(width/2, height/2);
  rotate(frameCount * 0.001);

  const n = 8;
  for(let i = 0; i < n; i ++){
    const m = 8;
    for(let j = 0; j < m; j ++){
      const radius = pow(2, i) * max(width, height) * 0.01;
      const angle = TAU * j / m + (i % 2 == 0 ? TAU / m / 2 : 0);
      const x = radius * cos(angle);
      const y = radius * sin(angle);
      const d = radius * 2 * sin(PI / m);

      const l = 10;

      push();
      translate(x, y);
      for(let k = 0; k < l; k ++){
        const nd = d * map(sin(random(TAU) + frameCount * random(0.02, 0.025)), -1, 1, 0, 1);
        const c = random(["#009193", "#d9e5d7", "#0f0f57", "#d0e629"]);

        noStroke();
        fill(c);
        circle(0, 0, nd);
      }
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