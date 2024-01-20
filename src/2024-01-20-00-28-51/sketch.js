let pg;
let ft;

const API_KEY = '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';
const URL = "https://api.openai.com/v1/chat/completions";
let chr = "こんにちは";
let msg;
let msgArr;

function preload() {
  ft = loadFont("../../assets/font/Harenosora.otf");

  reply(chr).then(response => {
    msg = String(response);
    console.log(msg);
  }).catch(error => {
    console.error(error);
  });
}


function setup() {
  const w = min(windowWidth, windowHeight);
  createCanvas(w, w);

  const cp = random(colorPalletes).colors;
  imageMode(CENTER);

  pg = createGraphics(w, w);

  const ts = pg.width * 0.8;

  msgArr = [..."HELLO"];

  pg.background(0);
  let grid = 30;
  let index = 0;
  for (let y = -100; y < pg.height + 100; y += grid) {
    for (let x = -100; x < pg.width + 100; x += grid) {
      pg.fill(random(cp));
      pg.textFont(ft);
      pg.textSize(grid);
      pg.text(msgArr[index % msgArr.length], x, y);

      index++;
    }
  }
  pg.erase();
  pg.textFont(ft);
  pg.textAlign(CENTER);
  pg.textSize(ts);
  pg.text(chr, pg.width / 2, pg.height / 2 + ts / 3);
  pg.noErase();

  background(255);
  grid = 20;
  index = 0;
  for (let y = -100; y < height + 100; y += grid) {
    for (let x = -100; x < width + 100; x += grid) {
      fill(200);
      textFont(ft);
      textSize(grid);
      text(msgArr[index % msgArr.length], x, y);

      index++;
    }
  }

  image(pg, width / 2, height / 2);

  pg.remove();
}

async function reply(t) {
  let text = t;
  try {
    const response = await axios.post(
      URL, {
        "model": "gpt-3.5-turbo",
        "messages": [{
          "role": "user",
          "content": text,
        }, ],
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    let chatgpt_response = response.data.choices[0].message.content;
    return chatgpt_response;
  } catch (error) {
    console.log(error);
    throw error; // エラーが発生した場合は呼び出し元にエラーを伝える
  }
}

class Easing {
  static easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
  }

  static easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
  }

  static easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }

  static easeInQuad(x) {
    return x * x;
  }

  static easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }

  static easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  static easeInCubic(x) {
    return x * x * x;
  }

  static easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  static easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  static easeInQuart(x) {
    return x * x * x * x;
  }

  static easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }

  static easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
  }

  static easeInQuint(x) {
    return x * x * x * x * x;
  }

  static easeOutQuint(x) {
    return 1 - Math.pow(1 - x, 5);
  }

  static easeInOutQuint(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  }

  static easeInExpo(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
  }

  static easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  static easeInOutExpo(x) {
    return x === 0 ?
      0 :
      x === 1 ?
      1 :
      x < 0.5 ?
      Math.pow(2, 20 * x - 10) / 2 :
      (2 - Math.pow(2, -20 * x + 10)) / 2;
  }

  static easeInCirc(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  }

  static easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }

  static easeInOutCirc(x) {
    return x < 0.5 ?
      (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 :
      (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }

  static easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  static easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5 ?
      (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 :
      (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
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