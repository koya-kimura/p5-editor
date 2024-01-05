
function setup() {
  createCanvas(600, 600);

  colorMode(HSB);

  background("#F1F0EA");
  stroke(random(360), 0.47, 0.35);

  const j = floor(random(3, 7));
  const n = floor(random(2, 10));
  const s = width / n;
  const gscl = random();

  for (let x = 0; x < width; x += s) {
    for (let y = 0; y < height; y += s) {
      for(let i = 1; i < j; i ++){
        const scl = i/j;
        const k = s * scl;
        const _x = x + s * (1 - scl) / 2;
        const _y = y + s * (1 - scl) / 2;

        line(_x + (s * gscl * random(-1, 1)), _y + (s * gscl * random(-1, 1)), _x + k + (s * gscl * random(-1, 1)), _y + (s * gscl * random(-1, 1)));
        line(_x + (s * gscl * random(-1, 1)), _y + (s * gscl * random(-1, 1)), _x + (s * gscl * random(-1, 1)), _y + k + (s * gscl * random(-1, 1)));
        line(_x + k + (s * gscl * random(-1, 1)), _y + (s * gscl * random(-1, 1)), _x + k + (s * gscl * random(-1, 1)), _y + k + (s * gscl * random(-1, 1)));
        line(_x + (s * gscl * random(-1, 1)), _y + k + (s * gscl * random(-1, 1)), _x + k + (s * gscl * random(-1, 1)), _y + k + (s * gscl * random(-1, 1)));
      }
    }
  }
}