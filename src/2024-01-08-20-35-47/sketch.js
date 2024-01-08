let x;
let y;
let pg;
let pgx;
let pgy;
let cp;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#0E92A4");
  imageMode(CENTER);

  pg = createGraphics(600, 600);
  pg.background("#0E92A4");
  pg.rectMode(CENTER);

  x = width / 2;
  y = height / 2;

  pgx = pg.width / 2;
  pgy = pg.height / 2;

  cp = random(colorPalletes).colors;
}

function draw() {

  for (let t = 0; t < 1; t++) {
    const grid = 20;
    const m = floor(random(4));
    if (m == 0) {
      pgx += grid;
    } else if (m == 1) {
      pgx -= grid;
    } else if (m == 2) {
      pgy += grid;
    } else if (m == 3) {
      pgy -= grid;
    }

    if (pgx < 0) {
      pgx = pg.width;
    }
    if (pgx > pg.width) {
      pgx = 0;
    }
    if (pgy < 0) {
      pgy = pg.height;
    }
    if (pgy > pg.height) {
      pgy = 0;
    }

    pg.noStroke();
    pg.fill(random(cp));
    pg.rect(pgx, pgy, grid, grid);
  }

  for (let t = 0; t < 10; t++) {
    const grid = 10;
    const n = floor(random(4));
    if (n == 0) {
      x += grid;
    } else if (n == 1) {
      x -= grid;
    } else if (n == 2) {
      y += grid;
    } else if (n == 3) {
      y -= grid;
    }

    if (x < 0) {
      x = width;
    }
    if (x > width) {
      x = 0;
    }
    if (y < 0) {
      y = height;
    }
    if (y > height) {
      y = 0;
    }

    image(pg, x, y, grid, grid);
  }
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
];