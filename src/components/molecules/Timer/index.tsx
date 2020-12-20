import React, { FC, useEffect, useRef, useState } from "react";
import useInterval from "@rooks/use-interval";
import prettyMilliseconds from "pretty-ms";
import styles from "./style.module.scss";
import sound from "./sounds/decision32.mp3";

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
  const ref = useRef<HTMLAudioElement>(null);

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
    if (!resume) {
      return;
    }

    if (timer === 0) {
      addLoser(index);
      stop();
      startNextPlayer();

      return;
    }

    const { current } = ref;

    if (!current || timer % 1000) {
      return;
    }

    current.currentTime = 0.021;
    current.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addLoser, index, resume, startNextPlayer, timer]);

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
      <audio preload="auto" ref={ref}>
        <source src={sound} type="audio/mp3" />
      </audio>
      {prettyMilliseconds(timer, {
        colonNotation: true,
        keepDecimalsOnWholeSeconds: true,
      })}
    </button>
  );
};

export default Timer;
