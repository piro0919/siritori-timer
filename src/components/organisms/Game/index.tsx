import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { parse } from "query-string";
import uniqid from "uniqid";
import styles from "./style.module.scss";
import useInterval from "@rooks/use-interval";
import usePreviousDifferent from "@rooks/use-previous-different";
import swal from "sweetalert";
import sound from "./sounds/c.mp3";
import sound2 from "./sounds/c2.mp3";
import GameController from "components/organisms/GameController";
import Timers from "../Timers";
import { createPortal } from "react-dom";
import VolumeContext from "contexts/VolumeContext";
import ReactHowler from "react-howler";

const Game: FC = () => {
  const { search } = useLocation();
  const { first, handicaps, minute, player, type } = useMemo(() => {
    const { first, handicaps, player, time, type } = parse(search);
    const nextFirst =
      typeof first === "string" ? parseInt(first as string, 10) : -1;
    const nextPlayer =
      typeof player === "string" ? parseInt(player as string, 10) : 0;

    return {
      type,
      first:
        nextFirst >= 0 ? nextFirst : Math.floor(Math.random() * nextPlayer),
      handicaps: Array.isArray(handicaps)
        ? handicaps.map((handicap) => parseFloat(handicap))
        : [],
      minute: typeof time === "string" ? parseFloat(time) : 0,
      player: nextPlayer,
    };
  }, [search]);
  const [currentPlayer, setCurrentPlayer] = useState<number | undefined>();
  const players = useMemo(
    () =>
      [...Array(player)].map(() => ({
        key: uniqid(),
      })),
    [player]
  );
  const startNextPlayer = useCallback(() => {
    setCurrentPlayer((prevNextPlayer) =>
      typeof prevNextPlayer !== "undefined" &&
      prevNextPlayer + 1 < players.length
        ? prevNextPlayer + 1
        : 0
    );
  }, [players.length]);
  const [revertTime, setRevertTime] = useState<number | undefined>();
  const [revertPlayer, setRevertPlayer] = useState<number | undefined>();
  const previousPlayer = usePreviousDifferent(currentPlayer);
  const [losers, setLosers] = useState<number[]>([]);
  const addLoser = useCallback((index: number) => {
    setLosers((prevLosers) => [...prevLosers, index]);
  }, []);
  const [isTouched, setIsTouched] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const callback = useCallback(() => {
    setCountdown((prevCountdown) => prevCountdown - 1);
  }, []);
  const [start, stop] = useInterval(callback, 1000);
  const handleClickOnStart = useCallback(() => {
    setCurrentPlayer(
      typeof previousPlayer === "number" ? previousPlayer : undefined
    );
  }, [previousPlayer]);
  const handleClickOnStop = useCallback(() => {
    setCurrentPlayer(undefined);
  }, []);
  const { go, push } = useHistory();
  const handleClickOnReturn = useCallback(() => {
    push(`/${type}`);
  }, [push, type]);
  const handleClickOnRevert = useCallback(() => {
    setRevertPlayer(
      typeof previousPlayer === "number" ? previousPlayer : undefined
    );
  }, [previousPlayer]);
  const handleClickOnReload = useCallback(() => {
    go(0);
  }, [go]);
  const { volume } = useContext(VolumeContext);
  const disabledPlay = useMemo(
    () => countdown > 0 || losers.length >= players.length - 1,
    [countdown, losers.length, players.length]
  );
  const disabledReload = useMemo(
    () => typeof currentPlayer !== "undefined" || countdown > 0,
    [countdown, currentPlayer]
  );
  const disabledReturn = useMemo(
    () => typeof currentPlayer !== "undefined" || countdown > 0,
    [countdown, currentPlayer]
  );
  const disabledRevert = useMemo(
    () =>
      typeof currentPlayer !== "undefined" ||
      typeof revertTime === "undefined" ||
      countdown > 0 ||
      losers.length >= players.length - 1,
    [countdown, currentPlayer, losers.length, players.length, revertTime]
  );
  const disabledStop = useMemo(
    () => countdown > 0 || losers.length >= players.length - 1,
    [countdown, losers.length, players.length]
  );
  const displayButton = useMemo(
    () => (typeof currentPlayer === "undefined" ? "play" : "stop"),
    [currentPlayer]
  );
  const handleClick = useCallback(() => {
    setIsTouched(true);
  }, []);
  const portal = useMemo(() => {
    const rootElement = document.getElementById("root");

    return countdown && rootElement
      ? createPortal(
          <div className={styles.countdownWrapper} onClick={handleClick}>
            {isTouched ? (
              countdown
            ) : (
              <div className={styles.touchStart}>Touch start!</div>
            )}
          </div>,
          rootElement
        )
      : null;
  }, [countdown, handleClick, isTouched]);
  const [playingCountdown, setPlayingCountdown] = useState(false);
  const [playingStart, setPlayingStart] = useState(false);
  const handleEndOnCountdown = useCallback(() => {
    setPlayingCountdown(false);
  }, []);
  const handleEndOnStart = useCallback(() => {
    setPlayingStart(false);
  }, []);

  useEffect(() => {
    if (countdown) {
      return;
    }

    stop();
    setCurrentPlayer(first);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, first]);

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

    swal({
      buttons: {
        reload: { text: "もう1度遊ぶ", value: "reload" },
        toHome: { text: "トップへ戻る", value: "toHome" },
      },
      closeOnClickOutside: true,
      icon: "success",
      title: `${
        players.findIndex((_, index) => !losers.includes(index)) + 1
      }P Win!`,
    }).then((value) => {
      switch (value) {
        case "reload": {
          go(0);

          return;
        }
        case "toHome": {
          push("/");

          return;
        }
        default: {
          return;
        }
      }
    });
  }, [go, losers, players, push]);

  useEffect(() => {
    if (!isTouched) {
      return;
    }

    if (countdown) {
      setPlayingCountdown(true);

      return;
    }

    setPlayingStart(true);
  }, [countdown, isTouched]);

  useEffect(() => {
    if (!isTouched) {
      return;
    }

    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouched]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Timers
          addLoser={addLoser}
          currentPlayer={currentPlayer}
          handicaps={handicaps}
          minute={minute}
          players={players}
          previousPlayer={
            typeof previousPlayer === "number" ? previousPlayer : undefined
          }
          revertPlayer={revertPlayer}
          revertTime={revertTime}
          setRevertTime={setRevertTime}
          startNextPlayer={startNextPlayer}
        />
        <GameController
          disabledPlay={disabledPlay}
          disabledReload={disabledReload}
          disabledReturn={disabledReturn}
          disabledRevert={disabledRevert}
          disabledStop={disabledStop}
          displayButton={displayButton}
          handleClickOnReload={handleClickOnReload}
          handleClickOnReturn={handleClickOnReturn}
          handleClickOnRevert={handleClickOnRevert}
          handleClickOnStart={handleClickOnStart}
          handleClickOnStop={handleClickOnStop}
        />
      </div>
      {portal}
      <ReactHowler
        onEnd={handleEndOnCountdown}
        playing={playingCountdown}
        src={sound}
        volume={volume}
      />
      <ReactHowler
        onEnd={handleEndOnStart}
        playing={playingStart}
        src={sound2}
        volume={volume}
      />
    </div>
  );
};

export default Game;
