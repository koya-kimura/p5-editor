let w;

function setup() {
  w = min(windowWidth, windowHeight);
  createCanvas(w, w);

  colorMode(HSB, TAU, 1, 1, 1);
}

function draw() {
  background(0, 10);

  blendMode(ADD);

  const stepY = w / 10;
  const stepX = w / 200;

  for (let y = stepY / 2; y < w; y += stepY) {
    for (let x = stepX / 2; x < w; x += stepX) {
      const h = (frameCount / 100 + x / 500 + y / 100) % TAU;
      // fill(h, 0.2, 0.2, 0.001);
      noFill();
      stroke(h, 1, 1, pow(noise(x / 1000 + frameCount / 100, y + frameCount / 100), 2));
      circle(x, y, stepY * 100 * pow(noise(x / 1000 + frameCount / 500, y + frameCount / 1000), 2));
    }
  }

  blendMode(BLEND);
}