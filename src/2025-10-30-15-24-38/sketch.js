function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

function draw() {
  background(0, 0, 180);

  const interval = 60;
  const zigzag = abs(((frameCount + interval) % (interval * 2)) - interval) / interval;
  const n = 8;
  const m = 9;

  push();
  translate(width/2, height/2);
  scale(1.5);
  for(let i = 0; i < n; i ++){
    for (let j = 0; j < m; j++) {
      const x = width * i / n - width/2;
      const y = height * j / m - height/2;
      const w = width / n;
      const h = height / m;
      const isshow = (j + i) % 2 == 0;

      const rw = w * 0.25;
      const rh = h;

      const rxs1 = x;
      const rxe1 = x + w*0.5 - rw;
      const rx1 = map(Easing.easeInOutQuad(zigzag), 0, 1, rxs1, rxe1);

      const rxs2 = x + w - rw;
      const rxe2 = x + w * 0.5;
      const rx2 = map(Easing.easeInOutQuad(zigzag), 0, 1, rxs2, rxe2);

      if (isshow){
        noStroke();
        fill(255, 0, 0);
        rect(rx1 + rw, y, map(Easing.easeInOutQuad(zigzag), 0, 1, w-rw*2, 0), h);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(rh * 0.5);
        text("L", x+w*0.5, y+h*0.5);

        fill(255);
        rect(rx1, y, rw, rh);
        rect(rx2, y, rw, rh);
      }
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