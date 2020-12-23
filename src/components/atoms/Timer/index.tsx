import { FC, useCallback, useEffect, useMemo, useState } from "react";
import useInterval from "@rooks/use-interval";
import prettyMilliseconds from "pretty-ms";
import styles from "./style.module.scss";
import sound from "./sounds/decision32.mp3";
import useLocalstorage from "@rooks/use-localstorage";
import useHowl from "hooks/useHowl";

export type TimerProps = {
  addLoser: (index: number) => void;
  index: number;
  isStopCurrent: boolean;
  minute: number;
  resume: boolean;
  revertTime?: number;
  setRevertTime: (revertTime: number) => void;
  startNextPlayer: () => void;
};

const Timer: FC<TimerProps> = ({
  addLoser,
  index,
  isStopCurrent,
  minute,
  resume,
  revertTime,
  setRevertTime,
  startNextPlayer,
}) => {
  const [timer, setTimer] = useState(minute * 60 * 1000);
  const intervalDuration = useMemo(() => 100, []);
  const callback = useCallback(() => {
    setTimer((prevTimer) =>
      prevTimer - intervalDuration >= 0 ? prevTimer - intervalDuration : 0
    );
  }, [intervalDuration]);
  const [start, stop] = useInterval(callback, intervalDuration);
  const [volume] = useLocalstorage("volume", 1);
  const { howlPlay } = useHowl({
    howlOptions: {
      volume,
      src: sound,
    },
  });
  const time = useMemo(
    () =>
      prettyMilliseconds(timer, {
        colonNotation: true,
        keepDecimalsOnWholeSeconds: true,
      }),
    [timer]
  );

  useEffect(() => {
    if (resume) {
      setRevertTime(timer);
      start();

      return;
    }

    stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume, setRevertTime]);

  useEffect(() => {
    if (timer) {
      return;
    }

    addLoser(index);
    stop();
    startNextPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addLoser, index, startNextPlayer, timer]);

  useEffect(() => {
    if (
      !resume ||
      timer === minute * 60 * 1000 ||
      timer === 0 ||
      timer % 1000
    ) {
      return;
    }

    howlPlay();
  }, [howlPlay, minute, resume, timer]);

  useEffect(() => {
    if (typeof revertTime === "undefined") {
      return;
    }

    setTimer(revertTime);
  }, [revertTime]);

  return (
    <button
      className={`${styles.button} ${isStopCurrent ? styles.stop : ""}`}
      disabled={!resume}
      onClick={startNextPlayer}
    >
      {time}
    </button>
  );
};

export default Timer;
