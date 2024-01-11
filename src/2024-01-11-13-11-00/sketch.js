let pg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);

  stroke(220);
  for(let x = 0; x < width; x += 30){
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 30) {
    line(0, y, width, y);
  }

  const w = min(width, height) * 0.8;
  pg = createGraphics(w, w);

  pg.background("#FAF3E1");

  let arr = [];
  let index = 0;

  const cp = random(colorPalletes).colors;
  const n = 20;
  const grid = w / n;
  for (let y = grid; y < w; y += grid * 2) {
    if(random(1000) < 600){
      index ++;
    }
    arr.push({
      x: 0,
      y: y,
      w: w,
      h: grid,
      c: cp[index%cp.length]
    })
  }

  for (let x = grid; x < w; x += grid * 2) {
    if (random(1000) < 600) {
      index++;
    }
    arr.push({
      x: x,
      y: 0,
      w: grid,
      h: w,
      c: cp[index % cp.length]
    })
  }

  arr = shuffle(arr);

  for (let i in arr) {
    pg.noStroke();
    pg.fill(arr[i].c);
    pg.rect(arr[i].x, arr[i].y, arr[i].w, arr[i].h);
  }

  rectMode(CENTER);
  fill(30);
  noStroke();
  rect(width / 2 + 10, height / 2 + 10, w, w);

  imageMode(CENTER);
  image(pg, width / 2, height / 2);
}

const colorPalletes = [{
    name: "DeepEmeraldGold",
    colors: ["#005e55", "#fff9bf", "#edb50c", "#b8003d", "#5e001f"],
  },
  {
    name: "WarmRainbow",
    colors: ["#01204E", "#028391", "#F6DCAC", "#FAA968", "#F85525"],
  },
  {
    name: "ChocolateAndCream",
    colors: ["#D54751", "#EF9A48", "#FFFCC7", "#4DA394", "#59322B"],
  },
  {
    name: "PopArt",
    colors: ["#241965", "#653993", "#9F4094", "#B73D6E", "#F19406"],
  },
  {
    name: "DeepEmeraldGold",
    colors: ["#F87523", "#FFC31B", "#E7DCC9", "#1DB7B9", "#126D68"],
  },
  {
    name: "GreenPink",
    colors: ["#01B999", "#FAB3B3", "#DC958F", "#A1D8CE", "#F1FAF7"],
  }
];