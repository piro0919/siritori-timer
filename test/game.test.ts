import { describe, expect, it } from "vitest";
import {
  createPlayers,
  formatSeconds,
  nextTurn,
  pickFirst,
  toInt,
  toPlayerCount,
} from "../src/lib/game";

describe("toInt", () => {
  it("数でなければ fallback を返す", () => {
    expect(toInt(undefined, 5, 0, 10)).toBe(5);
    expect(toInt("abc", 5, 0, 10)).toBe(5);
    expect(toInt(["3"], 5, 0, 10)).toBe(5);
  });

  it("範囲の外は端に寄せる", () => {
    expect(toInt("-3", 5, 0, 10)).toBe(0);
    expect(toInt("30", 5, 0, 10)).toBe(10);
    expect(toInt("7", 5, 0, 10)).toBe(7);
  });
});

describe("toPlayerCount", () => {
  it("2 人から 6 人に収める", () => {
    expect(toPlayerCount(undefined)).toBe(2);
    expect(toPlayerCount("1")).toBe(2);
    expect(toPlayerCount("4")).toBe(4);
    expect(toPlayerCount("9")).toBe(6);
  });
});

describe("pickFirst", () => {
  it("人数の範囲に収まる指定はそのまま使う", () => {
    expect(pickFirst("0", 3)).toBe(0);
    expect(pickFirst("2", 3)).toBe(2);
  });

  it("指定が無いか範囲の外なら、くじで決める", () => {
    expect(pickFirst(undefined, 3, () => 0.99)).toBe(2);
    expect(pickFirst("3", 3, () => 0)).toBe(0);
    expect(pickFirst("1.5", 3, () => 0.5)).toBe(1);
  });
});

describe("createPlayers", () => {
  it("持ち時間にハンデを足し、ミリ秒にする", () => {
    expect(
      createPlayers({ handicaps: ["0", "30"], playerCount: 2, time: "60" })
    ).toEqual([{ time: 60_000 }, { time: 90_000 }]);
  });

  it("ハンデが足りない人は 0 とする", () => {
    expect(
      createPlayers({ handicaps: ["30"], playerCount: 3, time: "60" })
    ).toEqual([{ time: 90_000 }, { time: 60_000 }, { time: 60_000 }]);
  });

  it("持ち時間が読めなければ 60 秒にする", () => {
    expect(createPlayers({ handicaps: [], playerCount: 2, time: "x" })).toEqual(
      [{ time: 60_000 }, { time: 60_000 }]
    );
  });
});

describe("nextTurn", () => {
  it("持ち時間が残っている後ろの人に渡す", () => {
    expect(nextTurn([{ time: 1 }, { time: 0 }, { time: 1 }], 0)).toBe(2);
  });

  it("後ろにいなければ先頭から探す", () => {
    expect(nextTurn([{ time: 0 }, { time: 1 }, { time: 1 }], 2)).toBe(1);
  });

  it("最後の人から先頭に戻る", () => {
    expect(nextTurn([{ time: 1 }, { time: 1 }], 1)).toBe(0);
  });
});

describe("formatSeconds", () => {
  it("分と秒で書く", () => {
    expect(formatSeconds(30)).toBe("30秒");
    expect(formatSeconds(60)).toBe("1分");
    expect(formatSeconds(90)).toBe("1分30秒");
    expect(formatSeconds(600)).toBe("10分");
  });
});
