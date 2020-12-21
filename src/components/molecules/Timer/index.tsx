import { FC, useEffect, useMemo, useState } from "react";
import useInterval from "@rooks/use-interval";
import prettyMilliseconds from "pretty-ms";
import styles from "./style.module.scss";
import sound from "./sounds/decision32.mp3";
import { Howl } from "howler";
import useLocalstorage from "@rooks/use-localstorage";

export type TimerProps = {
  addLoser: (index: number) => void;
  index: number;
  minute: number;
  resume: boolean;
  revertTime?: number;
  setRevertTime: (revertTime: number) => void;
  startNextPlayer: () => void;
};

const Timer: FC<TimerProps> = ({
  addLoser,
  index,
  minute,
  resume,
  revertTime,
  setRevertTime,
  startNextPlayer,
}) => {
  const [timer, setTimer] = useState(minute * 60 * 1000);
  const [start, stop] = useInterval(() => {
    setTimer((prevTimer) => (prevTimer - 100 >= 0 ? prevTimer - 100 : 0));
  }, 100);
  const [volume] = useLocalstorage("volume", 1);
  const howl = useMemo(
    () =>
      new Howl({
        volume,
        src: [sound],
      }),
    [volume]
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
    if (timer !== 0) {
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

    howl.play();
  }, [howl, minute, resume, timer]);

  useEffect(() => {
    if (typeof revertTime === "undefined") {
      return;
    }

    setTimer(revertTime);
  }, [revertTime]);

  return (
    <button
      className={styles.button}
      disabled={!resume}
      onClick={startNextPlayer}
    >
      {prettyMilliseconds(timer, {
        colonNotation: true,
        keepDecimalsOnWholeSeconds: true,
      })}
    </button>
  );
};

export default Timer;
