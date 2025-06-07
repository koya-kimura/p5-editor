function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  blendMode(BLEND);
  background(0);

  blendMode(ADD);

  const n = 20;

  const radiusX = min(width, height) * map(sin(frameCount * 0.0142 + 0.1789), -1, 1, 0.2, 0.4);
  const radiusY = min(width, height) * map(sin(frameCount * 0.0071 + 1.1874), -1, 1, 0.05, 0.2);
  for (let i = 0; i < n; i++) {
    const angle = frameCount * 0.005 + TAU * i / n;
    const x = width / 2 + radiusX * cos(angle);
    const y = height / 2 + radiusY * sin(angle);
    const s = min(width, height) * 0.15;
    const m = floor(map(pow(noise(frameCount * 0.005, i), 2), 0, 1, 2, 20));

    push();
    stroke(0);
    strokeWeight(min(width, height) * 0.004);
    fill(map(abs((angle + frameCount * 0.002)%TAU - PI), 0, PI, 0, 255), map(cos(frameCount*0.02), -1, 1, 170, 250), 200, 150);
    boxCircle(x - s * 0.5, y - s * 0.5, s, m);
    pop();
  }
}

function boxCircle(x, y, r, n) {
  push();
  translate(x, y);
  const g = r / n;
  for (let rx = 0; rx < r; rx += g) {
    for (let ry = 0; ry < r; ry += g) {
      const d = dist(rx + g / 2, ry + g / 2, r / 2, r / 2);
      if (d <= r / 2) {
        rect(rx, ry, g, g);
      }
    }
  }
  pop();
}