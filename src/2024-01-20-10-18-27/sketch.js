let pg;
let ft;
let cp;

const API_KEY = '***';
const URL = "https://api.openai.com/v1/chat/completions";
let chr = "恋";
let msg = "恋とは、人間の最も深い感情の一つであり、心に奥深く刻まれる美しい冒険の旅です。恋愛は時に幻想的で、相手との出会いがまるで星座が交わるような魔法の瞬間となります。その瞬間、心の奥底で何かが揺れ動き、新しい感情の扉が開かれるのです。恋は交響曲のようなもので、 その旋律に身を委ねることで、 空に舞う蝶のように軽やかに舞い上がります。 相手の笑顔は日常を色鮮やかな絵画のように彩り、 心の中には喜びの花が咲き誇ります。 しかし、 恋には時折嵐も訪れます。 心の奥深くには不安や痛みが潜むこともあり、 相手とのすれ違いや誤解が静かな夜に雷鳴のように鳴り響くこともあります。そんな時こそ、 成熟と理解の芽が花開く瞬間。 失恋はまるで秋の風が心を抜けるようにやってきます。 切なさが胸を包み込み、 涙がしずくとなって心の底に滴ります。 しかし、 そこには新たな始まりが潜んでいます。 失ったものよりも、 得るものが多いことに気づく瞬間です。恋愛は個々の人生において大きな役割を果たし、 その深い感情は人を成長させます。 相手との絆が深まり、 お互いを理解し合うことで、 人間関係はより豊かなものとなります。 恋は喜びと切なさ、 成熟と新たな始まりを織り交ぜながら、 人生に彩りを添える不可欠な要素と言えるでしょう。 ";
let msgEn = "hello"
let msgArr = [...msg];
let msgEnArr = [...msgEn];

function preload() {
  ft = loadFont("../../assets/font/Harenosora.otf");

  reply(chr).then(response => {
    msg = String(response);
  }).catch(error => {
    console.error(error);
  });
}

function setup() {
  const w = min(windowWidth, windowHeight);
  createCanvas(w, w);

  cp = random(colorPalletes).colors;
  imageMode(CENTER);

  pg = createGraphics(w, w);
}

function draw() {
  const ts = pg.width * 0.8;

  pg.background(0);
  let grid = 30;
  let index = 0;
  for (let y = -100; y < pg.height + 100; y += grid) {
    for (let x = -100; x < pg.width + 100; x += grid) {
      pg.fill(random(cp));
      pg.textFont(ft);
      pg.textSize(grid);
      pg.text(msgEnArr[index % msgEnArr.length], x, y);

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