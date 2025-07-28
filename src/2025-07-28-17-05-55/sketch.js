const interval = 300;
const msgArr = ["HELLO", "SORRY", "THANK", "WORLD", "PEACE", "SUMMER", "FRYDAY", "LUCKY", "NATURE"];

let msgNum = 0; // 現在選択されているメッセージのインデックス
let charArray = []; // すべての文字オブジェクトを含む配列

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Helvetica");

  charArray = msgArr.flatMap((msg, msgIndex) => {
    const msgLength = msg.length;

    return msg.split('').map((char, charIndex) => ({
      char: char,
      isSelected: false,      // 初期状態ではすべてfalse
      indexInMsg: charIndex,
      msgLength: msgLength,
      originalMsgIndex: msgIndex // ★追加: 元のmsgArrのインデックスを記憶
    }));
  });

  charArray = shuffle(charArray); // 初期シャッフル
  charArray.forEach(item => {
    // オブジェクトに記憶させた originalMsgIndex と現在の msgNum を比較
    item.isSelected = (item.originalMsgIndex === msgNum);
  });
}

function draw() {
  background(220, 220, 10);

  const progress = (frameCount % interval) / interval;
  const zigzag = easeInOutSine(map(max(abs(progress - 0.5), 0.1), 0.1, 0.5, 1, 0));

  if (frameCount % interval == 0) {
    const availableIndices = [];
    for (let i = 0; i < msgArr.length; i++) {
      if (i !== msgNum) { // 現在の msgNum 以外を追加
        availableIndices.push(i);
      }
    }
    msgNum = availableIndices[floor(random(availableIndices.length))];
    charArray.forEach(item => {
      // オブジェクトに記憶させた originalMsgIndex と現在の msgNum を比較
      item.isSelected = (item.originalMsgIndex === msgNum);
    });
  }

  push();
  translate(width/2, height/2);

  const maxRadius = min(width, height) * 0.4;

  noFill();
  strokeWeight(min(width, height) * 0.05);
  stroke(10);
  circle(0, 0, maxRadius * 1.5);

  for (let charArrayIndex = 0; charArrayIndex < charArray.length; charArrayIndex++) {
    let char = charArray[charArrayIndex].char;
    let angle = (map(charArrayIndex, 0, charArray.length, 0, TAU) + frameCount * 0.002) % TAU;
    let radius = maxRadius;
    let sa = angle + PI / 2;
    let ta = 0;
    let sx = radius * cos(angle);
    let sy = radius * sin(angle);
    let tx = map(charArray[charArrayIndex].indexInMsg, 0, charArray[charArrayIndex].msgLength - 1, -maxRadius * 0.4, maxRadius * 0.4);
    let ty = 0;
    let x = map(zigzag * charArray[charArrayIndex].isSelected, 0, 1, sx, tx);
    let y = map(zigzag * charArray[charArrayIndex].isSelected, 0, 1, sy, ty);
    let a = map(zigzag * charArray[charArrayIndex].isSelected, 0, 1, sa, ta);
    let s = min(width, height) * map(zigzag * charArray[charArrayIndex].isSelected, 0, 1, 0.05, 0.08);

    push();
    fill(10);
    noStroke();
    textSize(s);
    textAlign(CENTER, CENTER);
    translate(x, y);
    rotate(a);
    text(char, 0, 0);
    pop();
  }
  pop();
}

function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  // Space key
  if (keyCode === 32) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}