let toonShader;

function preload() {
  toonShader = loadShader("toon.vert", "toon.frag"); // シェーダーファイルの読み込み
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // WEBGLモードにする
  shader(toonShader); // シェーダーの設定
}

function draw() {
  // 背景・光の設定
  background(250, 200, 200);
  directionalLight(255, 255, 255, 0.5, 0.5, -1);

  // 回転するトーラスの描画
  rotateX(millis() / 1000);
  rotateY(millis() / 3000);
  noStroke();
  fill(240, 220, 120);
  torus(120, 60, 40, 40);
}
