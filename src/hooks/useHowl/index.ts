import { Howl, HowlOptions } from "howler";
import { useCallback, useMemo } from "react";

export type HowParams = {
  howlOptions: Pick<HowlOptions, "src" | "volume">;
};

export type HowlData = {
  howlPlay: () => void;
  howlSetVolume: (volume: Parameters<Howl["volume"]>[0]) => void;
};

const useHowl = ({ howlOptions }: HowParams): HowlData => {
  const howl = useMemo(() => new Howl(howlOptions), [howlOptions]);
  const howlPlay = useCallback<HowlData["howlPlay"]>(() => {
    howl.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const howlSetVolume = useCallback<HowlData["howlSetVolume"]>(
    (volume) => {
      howl.volume(volume);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { howlPlay, howlSetVolume };
};

export default useHowl;
