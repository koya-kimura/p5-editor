

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(5);
}

function draw() {
  background(0);

  blendMode(ADD);

  for(let i = 0; i < 20; i ++){
    noiseCurveLine();
  }

  blendMode(BLEND);
}

function noiseCurveLine(){
  const n = random(100, 300);
  const r = random(2, 10);
  const c = random(TAU);
  const seed = random(1000);
  let sx = random(width);
  let sy = random(height);

  push();
  colorMode(HSB, TAU, 1.0, 1.0, 1.0);
  for(let i = 0; i < n; i ++){
    let nx = sx + (noise(i/300, seed)-0.5) * r;
    let ny = sy + (noise(i/300, seed+1)-0.5) * r;

    for(let j = 0; j < 10; j ++){
      strokeWeight(j/2)
      stroke(c, 1.0, 1.0, 1/50);
      line(sx, sy, nx, ny);
    }

    sx = nx;
    sy = ny;
  }
  pop();
}