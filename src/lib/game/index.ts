export type Player = {
  // millisecond
  time: number;
};

export const MIN_PLAYER = 2;

export const MAX_PLAYER = 6;

const DEFAULT_TIME = 60;
/** 秒で受け取る値の上限。1 日あれば足りる。 */
const MAX_SECONDS = 60 * 60 * 24;

// URL は手で書き換えられる。数でなければ fallback、範囲の外なら端に寄せる。
export function toInt(
  value: unknown,
  fallback: number,
  min: number,
  max: number
): number {
  const parsed = typeof value === "string" ? parseInt(value, 10) : NaN;

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, min), max);
}

export function toPlayerCount(value: unknown): number {
  return toInt(value, MIN_PLAYER, MIN_PLAYER, MAX_PLAYER);
}

// 人数の範囲に収まらない指定は、指定がなかったものとして決め直す。
export function pickFirst(
  value: unknown,
  playerCount: number,
  random: () => number = Math.random
): number {
  const parsed = typeof value === "string" ? Number(value) : NaN;

  return Number.isInteger(parsed) && parsed >= 0 && parsed < playerCount
    ? parsed
    : Math.floor(random() * playerCount);
}

export function createPlayers({
  handicaps,
  playerCount,
  time,
}: {
  handicaps: unknown[];
  playerCount: number;
  time: unknown;
}): Player[] {
  const baseTime = toInt(time, DEFAULT_TIME, 1, MAX_SECONDS);

  return Array.from({ length: playerCount }, (_, index) => ({
    time: (baseTime + toInt(handicaps[index], 0, 0, MAX_SECONDS)) * 1000,
  }));
}

// 持ち時間が残っている次の人。後ろにいなければ先頭から探す。
export function nextTurn(players: Player[], turn: number): number {
  const playerIndex = players.findIndex(
    ({ time }, index) => time > 0 && index > turn
  );

  return playerIndex !== -1
    ? playerIndex
    : players.findIndex(({ time }) => time > 0);
}

/** 30 → 30秒、90 → 1分30秒 */
export function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;

  return `${minutes ? `${minutes}分` : ""}${rest ? `${rest}秒` : ""}`;
}
