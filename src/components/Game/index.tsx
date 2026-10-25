import useHowl from "hooks/useHowl";
import { nextTurn, type Player } from "lib/game";
import { useRouter } from "next/router";
import prettyMilliseconds from "pretty-ms";
import { type JSX, useCallback, useEffect, useRef, useState } from "react";
import {
  IoIosRefresh,
  IoMdArrowBack,
  IoMdPlay,
  IoMdSquare,
  IoMdUndo,
} from "react-icons/io";
import swal from "sweetalert";
import { useBoolean } from "usehooks-ts";
import styles from "./style.module.scss";

/** 表示を描き直す間隔。残り時間はこの間隔ではなく時計の差から出す。 */
const TICK_MS = 100;

/** 一手戻すときに戻る先。手番が始まった時点の持ち時間を控える。 */
type History = {
  players: Player[];
  turn: number;
};

export type GameProps = {
  first: number;
  isStart: boolean;
  players: Player[];
};

function Game({
  first,
  isStart,
  players: initialPlayers,
}: GameProps): JSX.Element {
  const [turn, setTurn] = useState(() =>
    Math.min(Math.max(first, 0), initialPlayers.length - 1)
  );
  const [players, setPlayers] = useState(initialPlayers);
  const [histories, setHistories] = useState<History[]>(() => [
    { turn, players: initialPlayers },
  ]);
  // 時計を進める側が最新の持ち時間を読むための控え。描画のたびに合わせる。
  const playersRef = useRef(players);
  // いまの手番が 0 になる時刻。performance.now() の値。止まっているあいだは使わない。
  const deadlineRef = useRef<number | undefined>(undefined);

  playersRef.current = players;

  const router = useRouter();
  const { setTrue: onIsEnd, value: isEnd } = useBoolean(false);
  const { toggle: toggleIsStop, value: isStop } = useBoolean(false);
  const secondHowl = useHowl({
    src: "/sounds/second.mp3",
  });
  const nextHowl = useHowl({
    src: "/sounds/next.mp3",
  });
  const endHowl = useHowl({
    src: "/sounds/end.mp3",
  });
  const clickHowl = useHowl({
    src: "/sounds/click.mp3",
  });
  const record = useCallback((history: History): void => {
    setHistories((prevHistories) => [...prevHistories, history]);
  }, []);
  // 手番を渡し、渡した時点の持ち時間を履歴に積む。
  const passTurn = useCallback(
    (nextPlayers: Player[], currentTurn: number): void => {
      const followingTurn = nextTurn(nextPlayers, currentTurn);

      setTurn(followingTurn);

      record({ players: nextPlayers, turn: followingTurn });
    },
    [record]
  );
  // いまの手番の残りを時計から出し直し、状態に書き戻す。
  const settle = useCallback((): Player[] => {
    const deadline = deadlineRef.current;
    const current = playersRef.current;

    if (deadline === undefined) {
      return current;
    }

    const remaining = Math.max(0, deadline - performance.now());
    const next = current.map((player, index) =>
      index === turn ? { ...player, time: remaining } : player
    );

    playersRef.current = next;

    setPlayers(next);

    return next;
  }, [turn]);

  useEffect(() => {
    if (!isStart || isStop || isEnd) {
      return;
    }

    // 間隔ごとに決まった量を引くと、裏のタブで間引かれたぶんだけ遅れる。
    // 締め切りの時刻を持ち、残りはいつも時計との差で出す。
    deadlineRef.current = performance.now() + playersRef.current[turn].time;

    const tick = (): void => {
      const previous = playersRef.current[turn].time;
      const next = settle();
      const remaining = next[turn].time;

      if (
        remaining > 0 &&
        Math.floor(previous / 1000) > Math.floor(remaining / 1000)
      ) {
        secondHowl.play();
      }

      if (remaining > 0) {
        return;
      }

      clearInterval(timer);

      deadlineRef.current = undefined;

      if (next.filter(({ time }) => time).length > 1) {
        nextHowl.play();

        passTurn(next, turn);

        return;
      }

      onIsEnd();

      endHowl.play();

      const playerIndex = next.findIndex(({ time }) => time);

      swal({
        icon: "success",
        title: `${playerIndex + 1}P Win!`,
      });
    };
    const timer = setInterval(tick, TICK_MS);

    return (): void => {
      clearInterval(timer);

      deadlineRef.current = undefined;
    };
  }, [
    endHowl,
    isEnd,
    isStart,
    isStop,
    nextHowl,
    onIsEnd,
    passTurn,
    secondHowl,
    settle,
    turn,
  ]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <ul className={styles.list}>
          {players.map(({ time }, index) => (
            <li className={styles.item} key={index}>
              <button
                className={styles.button}
                disabled={isEnd || !isStart || isStop || turn !== index}
                onClick={(): void => {
                  passTurn(settle(), turn);
                }}
              >
                <span className={styles.player}>{`${index + 1}P`}</span>
                {!isEnd && isStart && turn === index ? (
                  <span className={styles.status}>
                    {isStop ? (
                      <IoMdSquare color="#f00" size={24} />
                    ) : (
                      <IoMdPlay color="#f00" size={24} />
                    )}
                  </span>
                ) : null}
                <span className={styles.time}>
                  {/* 0.1 秒単位で切り上げる。0 になるまでは 0.1 が残って見える。 */}
                  {prettyMilliseconds(Math.ceil(time / TICK_MS) * TICK_MS, {
                    colonNotation: true,
                    keepDecimalsOnWholeSeconds: true,
                  })}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.buttonsWrapper}>
          <button
            className={styles.button2}
            disabled={isEnd || !isStart}
            onClick={(): void => {
              // 止める瞬間の残りを確定させる。次の描き直しを待つと最大 0.1 秒ずれる。
              settle();

              // 再開した時点も戻り先にする。止めているあいだに戻した先から続けられる。
              if (isStop) {
                record({ players, turn });
              }

              toggleIsStop();
            }}
          >
            {isStop ? (
              <IoMdPlay color="#fff" size={24} />
            ) : (
              <IoMdSquare color="#fff" size={24} />
            )}
          </button>
          <button
            className={styles.button2}
            disabled={!isStop || !histories.length}
            onClick={(): void => {
              const prevHistory = histories[histories.length - 1];

              clickHowl.play();

              setTurn(prevHistory.turn);
              setPlayers(prevHistory.players);
              setHistories(histories.slice(0, -1));
            }}
          >
            <IoMdUndo color="#fff" size={24} />
          </button>
          <button
            className={styles.button2}
            disabled={!isEnd && !isStop}
            onClick={router.back}
          >
            <IoMdArrowBack color="#fff" size={24} />
          </button>
          <button
            className={styles.button2}
            disabled={!isEnd && !isStop}
            onClick={router.reload}
          >
            <IoIosRefresh color="#fff" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Game;
