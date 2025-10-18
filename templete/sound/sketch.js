let bgm;
let fft;

function preload() {
  bgm = loadSound("../../assets/sound/Kikai-Jikake-no-Kokoro_Long_FreeVer.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  fft = new p5.FFT(0.8, 32);
}

function draw() {
  background(220);

  let spm = fft.analyze();
  for (let i in spm) {
    spm[i] = map(spm[i], 0, 255, 0, 1);
  }


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

function mousePressed() {
  if (bgm.isPlaying()) {
    bgm.pause();
  } else {
    bgm.setVolume(0.3)
    bgm.loop();
  }
}