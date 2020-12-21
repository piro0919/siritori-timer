import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Timer from "components/molecules/Timer";
import { useHistory, useLocation } from "react-router-dom";
import { parse } from "query-string";
import uniqid from "uniqid";
import styles from "./style.module.scss";
import useInterval from "@rooks/use-interval";
import { GrPlayFill, GrRevert, GrStopFill } from "react-icons/gr";
import usePreviousDifferent from "@rooks/use-previous-different";
import { IoReload } from "react-icons/io5";
import swal from "sweetalert";
import { Howl } from "howler";
import sound from "./sounds/c.mp3";
import sound2 from "./sounds/c2.mp3";
import useLocalstorage from "@rooks/use-localstorage";

const Game: FC = () => {
  const [volume] = useLocalstorage("volume", 1);
  const { search } = useLocation();
  const [currentPlayer, setCurrentPlayer] = useState<number | undefined>(
    undefined
  );
  const { player, time } = parse(search);
  const players = useMemo(
    () =>
      [...Array(parseInt(player as string, 10))].map(() => ({
        key: uniqid(),
      })),
    [player]
  );
  const startNextPlayer = useCallback(() => {
    setCurrentPlayer((prevNextPlayer) => {
      if (typeof prevNextPlayer === "undefined") {
        return 0;
      }

      return prevNextPlayer + 1 >= players.length ? 0 : prevNextPlayer + 1;
    });
  }, [players.length]);
  const [revertTime, setRevertTime] = useState<number | undefined>();
  const [revertPlayer, setRevertPlayer] = useState<number | undefined>();
  const previousPlayer = usePreviousDifferent(currentPlayer);
  const [losers, setLosers] = useState<number[]>([]);
  const addLoser = useCallback((index: number) => {
    setLosers((prevLosers) => [...prevLosers, index]);
  }, []);
  const timers = useMemo(
    () =>
      players.map(({ key }, index) => (
        <div
          className={
            typeof currentPlayer === "undefined" && previousPlayer === index
              ? styles.previous
              : ""
          }
          key={key}
        >
          <Timer
            addLoser={addLoser}
            index={index}
            minute={parseFloat(time as string)}
            resume={currentPlayer === index}
            revertTime={revertPlayer === index ? revertTime : undefined}
            setRevertTime={setRevertTime}
            startNextPlayer={startNextPlayer}
          />
        </div>
      )),
    [
      addLoser,
      currentPlayer,
      players,
      previousPlayer,
      revertPlayer,
      revertTime,
      startNextPlayer,
      time,
    ]
  );
  const [countdown, setCountdown] = useState(3);
  const [start, stop] = useInterval(() => {
    setCountdown((prevCountdown) => prevCountdown - 1);
  }, 1000);
  const handleClickOnStart = useCallback(() => {
    if (previousPlayer === null) {
      return;
    }

    setCurrentPlayer(previousPlayer);
  }, [previousPlayer]);
  const handleClickOnStop = useCallback(() => {
    setCurrentPlayer(undefined);
  }, []);
  const handleClickOnRevert = useCallback(() => {
    if (previousPlayer === null) {
      return;
    }

    setRevertPlayer(previousPlayer);
  }, [previousPlayer]);
  const { go, push } = useHistory();
  const handleClickOnReload = useCallback(() => {
    go(0);
  }, [go]);
  const howl = useMemo(
    () =>
      new Howl({
        volume,
        src: [sound],
      }),
    [volume]
  );
  const howl2 = useMemo(
    () =>
      new Howl({
        volume,
        src: [sound2],
      }),
    [volume]
  );

  useEffect(() => {
    if (!countdown) {
      stop();
      setCurrentPlayer(0);

      return;
    }

    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  useEffect(() => {
    if (typeof revertPlayer === "undefined") {
      return;
    }

    setRevertPlayer(undefined);
    setRevertTime(undefined);
  }, [revertPlayer]);

  useEffect(() => {
    if (losers.length < players.length - 1) {
      return;
    }

    setCurrentPlayer(undefined);

    const winner = players.findIndex((_, index) => !losers.includes(index));

    swal({
      buttons: {
        reload: { text: "もう1度遊ぶ", value: "reload" },
        toHome: { text: "トップへ戻る", value: "toHome" },
      },
      closeOnClickOutside: true,
      icon: "success",
      title: `${winner + 1}P Win!`,
    }).then((value) => {
      switch (value) {
        case "reload": {
          go(0);

          break;
        }
        case "toHome": {
          push("/");

          break;
        }
        default: {
          break;
        }
      }
    });
  }, [go, losers, players, push]);

  useEffect(() => {
    if (countdown) {
      howl.play();

      return;
    }

    howl2.play();
  }, [countdown, howl, howl2]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper2}>
        <div className={styles.timersWrapper}>{timers}</div>
        <aside className={styles.aside}>
          {typeof currentPlayer === "undefined" ? (
            <button
              className={styles.button}
              disabled={
                typeof currentPlayer !== "undefined" ||
                countdown > 0 ||
                losers.length >= players.length - 1
              }
              onClick={handleClickOnStart}
            >
              <GrPlayFill size={20} />
            </button>
          ) : (
            <button
              className={styles.button}
              disabled={
                typeof currentPlayer === "undefined" ||
                countdown > 0 ||
                losers.length >= players.length - 1
              }
              onClick={handleClickOnStop}
            >
              <GrStopFill size={20} />
            </button>
          )}
          <button
            className={styles.button}
            disabled={
              typeof currentPlayer !== "undefined" ||
              typeof revertTime === "undefined" ||
              countdown > 0 ||
              losers.length >= players.length - 1
            }
            onClick={handleClickOnRevert}
          >
            <GrRevert size={24} />
          </button>
          <button
            className={styles.button}
            disabled={typeof currentPlayer !== "undefined" || countdown > 0}
            onClick={handleClickOnReload}
          >
            <IoReload size={24} />
          </button>
        </aside>
      </div>
      <div
        className={`${styles.countdownWrapper} ${
          countdown === 0 ? styles.start : ""
        }`}
      >
        {countdown}
      </div>
    </div>
  );
};

export default Game;
