// public/ogp.png を書き出す。pages router なので opengraph-image は使えず、
// next/og で組んだ画像を静的な PNG にして置いている。
// 書体は Google Fonts から画像に載る文字だけを切り出した WOFF。文字を変えたら取り直す。
//
// 絵作りは元のボードゲームのパッケージに寄せている。黄色の紙吹雪の地、題字の脇の
// 集中線、赤い顔の爆弾と、それを囲む数字のタイル。ロゴとメーカー名は載せない。
import { readFile, writeFile } from "node:fs/promises";
import { ImageResponse } from "next/og.js";

const font = (name) => readFile(new URL(`./fonts/${name}`, import.meta.url));

const WIDTH = 1200;
const HEIGHT = 630;
const YELLOW = "#F7E34B";
const BLACK = "#1a1a1a";
const RED = "#E8382F";

const h = (type, style, ...children) => ({
  props: {
    children: children.length > 1 ? children : children[0],
    style,
  },
  type,
});

// 毎回同じ画像になるように、紙吹雪は種を固定した乱数で撒く。
let seed = 7;
const random = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

const confetti = Array.from({ length: 380 }, () => {
  const x = random() * WIDTH;
  const y = random() * HEIGHT;
  const deg = random() * 180;
  const color = random() < 0.2 ? "#F2A93B" : "#E3C52E";
  return `<rect x="${x}" y="${y}" width="16" height="4" rx="2" fill="${color}" transform="rotate(${deg} ${x} ${y})" />`;
}).join("");

// 「限界」の左右に3本ずつ、外へ開く線を引く。
const dashes = [
  [150, 120, 30],
  [134, 168, 0],
  [150, 216, -30],
  [510, 120, -30],
  [526, 168, 0],
  [510, 216, 30],
]
  .map(
    ([x, y, deg]) =>
      `<rect x="${x - 22}" y="${
        y - 6
      }" width="44" height="12" rx="6" fill="${BLACK}" transform="rotate(${deg} ${x} ${y})" />`
  )
  .join("");

const BOMB_X = 920;
const BOMB_Y = 385;
const sparks = [0, 45, 90, 135, 225, 270, 315]
  .map(
    (deg) =>
      `<rect x="${BOMB_X + 56}" y="${
        BOMB_Y - 250
      }" width="30" height="14" rx="7" fill="${RED}" transform="rotate(${deg} ${
        BOMB_X + 30
      } ${BOMB_Y - 243})" />`
  )
  .join("");
const bomb = `
  <path d="M${BOMB_X - 10} ${BOMB_Y - 150} C ${BOMB_X - 10} ${
  BOMB_Y - 210
}, ${BOMB_X} ${BOMB_Y - 240}, ${BOMB_X + 24} ${
  BOMB_Y - 243
}" fill="none" stroke="${BLACK}" stroke-width="12" stroke-linecap="round" />
  ${sparks}
  <rect x="${BOMB_X - 50}" y="${
  BOMB_Y - 170
}" width="80" height="60" rx="10" fill="${BLACK}" />
  <circle cx="${BOMB_X}" cy="${BOMB_Y}" r="130" fill="${BLACK}" />
  <ellipse cx="${BOMB_X + 14}" cy="${
  BOMB_Y + 14
}" rx="100" ry="92" fill="${RED}" />
  <ellipse cx="${BOMB_X - 34}" cy="${
  BOMB_Y - 30
}" rx="30" ry="16" fill="#fff" opacity="0.85" transform="rotate(-35 ${
  BOMB_X - 34
} ${BOMB_Y - 30})" />`;

const background = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${YELLOW}" />
  ${confetti}
  ${dashes}
  ${bomb}
</svg>`;

const TILE = 84;
const tiles = [
  ["4", 765, 200],
  ["2", 712, 345],
  ["7", 765, 490],
  ["6", 1075, 200],
  ["8+", 1128, 345],
  ["3", 1075, 490],
].map(([label, x, y]) =>
  h(
    "div",
    {
      alignItems: "center",
      background: YELLOW,
      border: `8px solid ${BLACK}`,
      borderRadius: 18,
      color: BLACK,
      display: "flex",
      fontFamily: "M PLUS Rounded 1c",
      fontSize: label.length > 1 ? 40 : 54,
      fontWeight: 800,
      height: TILE,
      justifyContent: "center",
      left: x - TILE / 2,
      position: "absolute",
      top: y - TILE / 2,
      width: TILE,
    },
    label
  )
);

const title = h(
  "div",
  {
    alignItems: "center",
    color: BLACK,
    display: "flex",
    flexDirection: "column",
    fontFamily: "Reggae One",
    fontSize: 128,
    left: 70,
    lineHeight: 1.15,
    position: "absolute",
    top: 92,
    width: 520,
  },
  h("div", {}, "限界"),
  h("div", {}, "しりとり"),
  h("div", { color: RED }, "タイマー")
);

const image = h(
  "div",
  { display: "flex", height: "100%", position: "relative", width: "100%" },
  {
    props: {
      height: HEIGHT,
      src: `data:image/svg+xml,${encodeURIComponent(background)}`,
      style: { left: 0, position: "absolute", top: 0 },
      width: WIDTH,
    },
    type: "img",
  },
  title,
  ...tiles
);

const response = new ImageResponse(image, {
  fonts: [
    { data: await font("reggae-one-subset.woff"), name: "Reggae One" },
    {
      data: await font("m-plus-rounded-1c-800-digits.woff"),
      name: "M PLUS Rounded 1c",
      weight: 800,
    },
  ],
  height: HEIGHT,
  width: WIDTH,
});

const out = new URL("../public/ogp.png", import.meta.url);
await writeFile(out, Buffer.from(await response.arrayBuffer()));
console.log(`wrote ${out.pathname}`);
