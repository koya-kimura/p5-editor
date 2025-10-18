let theShader;
let tex;
let font;
const isCapture = false;

function preload(){
  theShader = loadShader("main.vert", "main.frag");
  font = loadFont("../../assets/font/jost/Jost-ExtraBold.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  tex = createGraphics(width, height);
}

function draw() {
  background(255);

  drawTex();

  shader(theShader);

  theShader.setUniform("u_time", frameCount / 100);
  theShader.setUniform("u_tex", tex);

  rect(0, 0, width, height);

  if (random() < 0.005 && isCapture){
    let timestamp = nf(year(), 4) + nf(month(), 2) + nf(day(), 2) + "_" + nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2);
    save(timestamp + ".png");
  }
}

function drawTex() {
  push();
  tex.background(0);

  const n = 12;
  const waveAmplitude = tex.height * 0.2; // 波の振幅を少し小さく
  const waveFrequency = 1.5; // 波の幅を細かく
  const spacing = tex.width / n; // 文字間隔を維持
  const s = spacing * 0.9

  tex.textFont(font);
  tex.textAlign(CENTER, CENTER);
  tex.fill(255, 255, 0);

  for (let i = 0; i < n; i++) { // 文字数を維持
    const waveSpeed = 0.017 * map(noise(i, frameCount * 0.0001), 0, 1, 0.5, 1.3);
    const x = i * spacing + spacing / 2;
    const y = tex.height * 0.4 + sin(frameCount * waveSpeed + i * waveFrequency) * waveAmplitude;
    const angle = atan(cos(frameCount * waveSpeed + i * waveFrequency)); // 波に沿った角度
    const str = [..."FLOW"][i % 4]; // 文字列を繰り返す

    tex.push();
    tex.textSize(s * map(Easing.easeOutSine(abs(sin(frameCount * waveSpeed + i * waveFrequency))), 0, 1, 0.8, 2.5));
    tex.translate(x, y);
    tex.rotate(angle);
    tex.scale(1, map(Easing.easeOutSine(abs(sin(frameCount * waveSpeed + i * waveFrequency))), 0, 1, 0.8, 1.2));
    tex.text(str, 0, 0);
    tex.pop();
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tex.resizeCanvas(width, height);
}

function keyPressed() {
  // Space key
  if (keyCode === 32) {
    fullscreen(true);
  }
}