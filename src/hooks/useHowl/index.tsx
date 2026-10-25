import { Howl } from "howler";
import { useMemo } from "react";

export type HowlParams = {
  src: string;
};

export type HowlData = Howl;

// 同じ音を画面ごとに読み込み直さないよう、src ごとに 1 つだけ作って使い回す。
const howls = new Map<string, Howl>();

function getHowl(src: string): Howl {
  const cached = howls.get(src);

  if (cached) {
    return cached;
  }

  const howl = new Howl({ src });

  howls.set(src, howl);

  return howl;
}

function useHowl({ src }: HowlParams): HowlData {
  return useMemo(() => getHowl(src), [src]);
}

export default useHowl;
