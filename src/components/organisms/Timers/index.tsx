import Timer, { TimerProps } from "components/atoms/Timer";
import React, { FC, useMemo } from "react";
import styles from "./style.module.scss";

type Player = {
  key: string;
};

export type TimersProps = Pick<
  TimerProps,
  "addLoser" | "minute" | "setRevertTime" | "startNextPlayer"
> & {
  currentPlayer?: number;
  handicaps: TimerProps["handicap"][];
  players: Player[];
  previousPlayer?: number;
  revertPlayer?: number;
  revertTime?: number;
};

const Timers: FC<TimersProps> = ({
  addLoser,
  currentPlayer,
  handicaps,
  minute,
  players,
  previousPlayer,
  revertPlayer,
  revertTime,
  setRevertTime,
  startNextPlayer,
}) => {
  const items = useMemo(
    () =>
      players.map(({ key }, index) => (
        <Timer
          addLoser={addLoser}
          handicap={handicaps[index] || 0}
          index={index}
          isStopCurrent={
            typeof currentPlayer === "undefined" && previousPlayer === index
          }
          key={key}
          minute={minute}
          resume={currentPlayer === index}
          revertTime={revertPlayer === index ? revertTime : undefined}
          setRevertTime={setRevertTime}
          startNextPlayer={startNextPlayer}
        />
      )),
    [
      addLoser,
      currentPlayer,
      handicaps,
      minute,
      players,
      previousPlayer,
      revertPlayer,
      revertTime,
      setRevertTime,
      startNextPlayer,
    ]
  );

  return <div className={styles.wrapper}>{items}</div>;
};

export default Timers;
