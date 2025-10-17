// ヘルパー関数: 角度の線形補間
function lerpAngle(startAngle, endAngle, amount) {
  let delta = endAngle - startAngle;
  if (delta > PI) delta -= TWO_PI;
  if (delta < -PI) delta += TWO_PI;
  return startAngle + delta * amount;
}

class MovingTextOnRectangle {
  constructor(rectWidth, rectHeight, textChar = "あ", initialPosition = 0) {
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
    this.textChar = textChar; // 1文字だけを扱う
    this.speed = 1.5; // テキストが動く速さ
    this.position = initialPosition; // 矩形の辺上の現在位置 (0から総周長まで)
    this.totalPerimeter = 2 * (rectWidth + rectHeight); // 矩形の総周長
    this.cornerZone = 20; // 角での回転を開始する距離

    // テキスト描画の基準点を中央にするため
    textAlign(CENTER, CENTER);
    textSize(28); // テキストサイズを少し大きく
    fill(0); // テキストの色
  }

  update() {
    this.position += this.speed;
    // positionが総周長を超えたら、その超過分を次の周の開始位置にする
    // 例: positionがperimeter * 1.5 なら、perimeter * 0.5 の位置に戻る
    this.position %= this.totalPerimeter;
  }

  display() {
    push(); // 現在の描画設定を保存

    let x, y, currentAngle, targetAngle;

    // 矩形の中心を原点に移動

    // 上の辺 (左から右へ)
    if (this.position >= 0 && this.position < this.rectWidth) {
      x = this.position - this.rectWidth / 2;
      y = -this.rectHeight / 2;
      currentAngle = 0; // 上を向く
      targetAngle = HALF_PI; // 右の辺の目標角度 (右を上にする)

      // 右上の角
      if (this.position > this.rectWidth - this.cornerZone) {
        let amount = (this.position - (this.rectWidth - this.cornerZone)) / this.cornerZone;
        currentAngle = lerpAngle(currentAngle, targetAngle, amount);
      }
    }
    // 右の辺 (上から下へ)
    else if (this.position >= this.rectWidth && this.position < this.rectWidth + this.rectHeight) {
      x = this.rectWidth / 2;
      y = (this.position - this.rectWidth) - this.rectHeight / 2;
      currentAngle = HALF_PI; // 右を上にする
      targetAngle = PI; // 下の辺の目標角度 (下を上にする)

      // 右下の角
      if (this.position > (this.rectWidth + this.rectHeight) - this.cornerZone) {
        let amount = (this.position - ((this.rectWidth + this.rectHeight) - this.cornerZone)) / this.cornerZone;
        currentAngle = lerpAngle(currentAngle, targetAngle, amount);
      }
    }
    // 下の辺 (右から左へ)
    else if (this.position >= this.rectWidth + this.rectHeight && this.position < 2 * this.rectWidth + this.rectHeight) {
      x = this.rectWidth / 2 - (this.position - (this.rectWidth + this.rectHeight));
      y = this.rectHeight / 2;
      currentAngle = PI; // 下を上にする
      targetAngle = HALF_PI * 3; // 左の辺の目標角度 (左を上にする)  <-- ここを修正
      // targetAngle = PI + HALF_PI; // こちらでもOK

      // 左下の角
      if (this.position > (2 * this.rectWidth + this.rectHeight) - this.cornerZone) {
        let amount = (this.position - ((2 * this.rectWidth + this.rectHeight) - this.cornerZone)) / this.cornerZone;
        currentAngle = lerpAngle(currentAngle, targetAngle, amount);
      }
    }
    // 左の辺 (下から上へ)
    else {
      x = -this.rectWidth / 2;
      y = this.rectHeight / 2 - (this.position - (2 * this.rectWidth + this.rectHeight));
      currentAngle = HALF_PI * 3; // 左を上にする  <-- ここを修正
      // currentAngle = PI + HALF_PI; // こちらでもOK
      targetAngle = TWO_PI; // または 0 (上の辺に戻る)

      // 左上の角
      if (this.position > this.totalPerimeter - this.cornerZone) {
        let amount = (this.position - (this.totalPerimeter - this.cornerZone)) / this.cornerZone;
        currentAngle = lerpAngle(currentAngle, targetAngle, amount);
      }
    }

    // 計算した座標に移動
    translate(x, y);

    // テキストの回転
    rotate(currentAngle);

    // テキストの描画
    text(this.textChar, 0, 0); // 1文字だけ描画

    pop(); // 描画設定を元に戻す
  }
}

// 使用例
let movingTexts = [];
let rectW = 800;
let rectH = 400;
let perimeter = 2 * (rectW + rectH);
let textString = "HELLOHELLOHELLOHELLOHELLOHELLOHELLOHELLOHELLOHELLOHELLOHELLOHELLOHELLOHELLOHELLO"; // 表示したい文字列
let textChars = []; // 文字列を1文字ずつ格納する配列
let textSpacing = 40; // 1文字あたりの間隔

function setup() {
  createCanvas(1200, 800);

  // 文字列を1文字ずつに分解
  textChars = Array.from(textString);

  // 各文字に対してインスタンスを作成
  for (let i = 0; i < textChars.length; i++) {
    let initialPos = (i * textSpacing) % perimeter; // 初期位置をずらすことで、回転寿司のように連続させる
    movingTexts.push(new MovingTextOnRectangle(rectW, rectH, textChars[i], initialPos));
  }
}

function draw() {
  background(200, 0, 200); // 背景をクリア

  // デバッグ用に矩形を描画（本番では不要なら削除）
  // push();
  // translate(width / 2, height / 2);
  // noFill();
  // stroke(150);
  // rectMode(CENTER);
  // rect(0, 0, rectW, rectH);
  // pop();

  // 各テキストインスタンスを更新・描画
  translate(width / 2, height / 2);
  for (let i = 0; i < movingTexts.length; i++) {
    movingTexts[i].update();
    for(let j = 0; j < 10; j ++){
      const scl = map(j, 0, 9, 0.3, 2);
      push();
      scale(scl);
      fill(10);
      movingTexts[i].display();
      pop();
    }
  }
}