function setup() {
  const canvasSize = min(windowWidth, windowHeight);
  createCanvas(canvasSize, canvasSize);

  let mode = [];
  let cp = random(colorPalletes).colors;
  shuffle(cp);
  const k = floor(random(3, 10));
  const n = 10;
  const grid = width / n;

  background(240);

  for(let i = 0; i < 1000; i ++){
    const c = random(cp);
    stroke(red(c), green(c), blue(c));
    strokeWeight(random(20, 100));
    point(random(width), random(height));
  }

  push();
  noStroke();
  fill(255);
  rectMode(CENTER);
  rect(width/2, height/2, width*0.9);
  pop();

  for (let i = 0; i < n; i++) {
    mode[i] = [];
    for (let j = 0; j < n; j++) {
      mode[i][j] = random() < 0.5 ? "vertical" : "horizontal";
    }
  }

  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      let x = grid * i + grid * 0.1;
      let y = grid * j + grid * 0.1;
      let w = grid * 0.8;
      let h = grid * 0.8;
      let m = "normal";

      // 内側の処理
      if (0 < i && i < n - 1 && 0 < j && j < n - 1) {
        if(mode[i][j]== "vertical"){
          if (mode[i][j-1] == "vertical"){
            if (mode[i][j + 1] == "vertical") {
              y = grid * j;
              h = grid;
              m = "vertical";
            } else {
              y = grid * j;
              h = grid*0.9;
              m = "vertical";
            }
          } else {
            if (mode[i][j + 1] == "vertical") {
              y = grid * j + grid * 0.1;
              h = grid*0.9;
              m = "vertical";
            } else {
              y = grid * j + grid * 0.1;
              h = grid * 0.8;
              m = "normal";
            }
          }
        } else {
          if (mode[i-1][j] == "horizontal") {
            if (mode[i+1][j] == "horizontal") {
              x = grid * i;
              w = grid;
              m = "horizontal";
            } else {
              x = grid * i;
              w = grid * 0.9;
              m = "horizontal";
            }
          } else {
            if (mode[i+1][j] == "horizontal") {
              x = grid * i + grid * 0.1;
              w = grid * 0.9;
              m = "horizontal";
            } else {
              x = grid * i + grid * 0.1;
              w = grid * 0.8;
              m = "normal";
            }
          }
        }

        let c1 = cp[0];
        let c2 = cp[1];
        strokeWeight(5);
        if(m=="vertical"){
          c1 = cp[1];
          c2 = cp[2];
        } else if(m=="horizontal"){
          c1 = cp[2];
          c2 = cp[3];
        }
        lineRect(x, y, w, h, c1, c2, k, m)
      }
    }
  }
}

function lineRect(x, y, w, h, c1, c2, n, mode) {
  push();
  noStroke();
  fill(c1);
  rect(x, y, w, h);

  stroke(c2);
  strokeCap(SQUARE)
  if (mode == "vertical") {
    for(let i = 1; i < n; i ++){
      line(x + w * i / n, y, x + w * i / n, y + h);
    }
  } else if (mode == "horizontal") {
    for (let i = 1; i < n; i++) {
      line(x, y + h * i / n, x+w, y + h * i / n);
    }
  }
  pop();
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
  },
  {
    name: "NatureTranquility",
    colors: ["#106A6B", "#07374B", "#CAB381", "#E9E0CE"],
  },
  {
    name: "VibrantHarmony",
    colors: ["#F15946", "#5681CB", "#FAAA2D", "#296647", "#453945"],
  },
  {
    name: "Serenity Bliss",
    colors: ["#FFB4B8", "#EF4B28", "#0A563A", "#FFBC54", "#ECE9E0"],
  }
];