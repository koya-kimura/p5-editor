let pg;
let font;

function preload(){
  font = loadFont("../../assets/font/any/tamanegi.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  pg = createGraphics(width, height);
}

function draw() {
  background(255);

  randomSeed(floor(frameCount / 60) * 47901);

  pg.background(255);
  pg.textFont(font);

  const msg = "なんとなく、自分の好きなコンテンツには質感というか肌触り、光みたいなものがあるなとは思っている。でも、私自身の人間性にはそんな高尚な感性を持ち合わせていないと思う卑下感情的なものがあり、ややこしい。いわゆる俗っぽさと好きなニュアンスを統合したいなと思っているのである。ゆらゆらと考えながら、まとまらないなあと思って毎回困ってしまっている。"
  const cols = 16 * 2;
  const rows = 9 * 2;
  for(let row = 0; row < rows; row ++){
    for (let col = 0; col < cols; col++) {
      const x = width * col / cols + width / cols / 2;
      const y = height * row / rows + height / rows / 2;
      const str = [...msg][(row * cols + col) % ([...msg].length)]

      pg.push();
      pg.fill(0);
      pg.textAlign(CENTER, CENTER);
      pg.textSize(min(width/cols, height/rows) * 0.8);
      pg.text(str, x, y)
      pg.pop();
    }
  }

  let arr = [];
  const n = 7;
  const m = 5;
  for(let i = 0; i < n; i ++){
    for(let j = 0; j < m; j ++){
      const x = width * i / n ;
      const y = height * j / m;
      const w = width / n;
      const h = height / m;
      const angle = random(-PI / 4, PI / 4) * map(abs(j-floor(m/2)), 0, floor(m/2), 0.2, 1);
      const scl = map(pow(random(), 2), 0, 1, 1.0, 2.0 * map(abs(j - floor(m / 2)), 0, floor(m / 2), 0.6, 1));

      arr.push({x:x, y:y, w:w, h:h, angle:angle, scl:scl});
    }
  }

  arr = shuffle(arr);

  for(let i in arr){
    push();
    translate(arr[i].x + arr[i].w / 2, arr[i].y + arr[i].h / 2);
    rotate(arr[i].angle);
    scale(arr[i].scl);

    push();
    scale(1.02);
    rectMode(CENTER);
    fill(0, 200);
    noStroke();
    rect(0, 0, arr[i].w, arr[i].h);
    pop();

    push();
    if(random() < 0.05){
      tint(200, 0, 100);
    }
    imageMode(CENTER);
    image(pg, 0, 0, arr[i].w, arr[i].h, arr[i].x, arr[i].y, arr[i].w, arr[i].h);
    pop();

    pop();
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