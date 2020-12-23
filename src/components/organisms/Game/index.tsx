import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { parse } from "query-string";
import uniqid from "uniqid";
import styles from "./style.module.scss";
import useInterval from "@rooks/use-interval";
import usePreviousDifferent from "@rooks/use-previous-different";
import swal from "sweetalert";
import sound from "./sounds/c.mp3";
import sound2 from "./sounds/c2.mp3";
import useLocalstorage from "@rooks/use-localstorage";
import useHowl from "hooks/useHowl";
import GameController from "components/organisms/GameController";
import Timers from "../Timers";
import { createPortal } from "react-dom";

const Game: FC = () => {
  const { search } = useLocation();
  const parsedQuery = useMemo(() => parse(search), [search]);
  const { minute, player } = useMemo(() => {
    const { player, time } = parsedQuery;

    return {
      minute: typeof time === "string" ? parseFloat(time) : 0,
      player: typeof player === "string" ? parseInt(player as string, 10) : 0,
    };
  }, [parsedQuery]);
  const [volume] = useLocalstorage("volume", 1);
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
  const previousPlayer = usePreviousDifferent(currentPlayer) || undefined;
  const [losers, setLosers] = useState<number[]>([]);
  const addLoser = useCallback((index: number) => {
    setLosers((prevLosers) => [...prevLosers, index]);
  }, []);
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
  const handleClickOnRevert = useCallback(() => {
    setRevertPlayer(
      typeof previousPlayer === "number" ? previousPlayer : undefined
    );
  }, [previousPlayer]);
  const { go, push } = useHistory();
  const handleClickOnReload = useCallback(() => {
    go(0);
  }, [go]);
  const { howlPlay: howlPlayOnCountdown } = useHowl({
    howlOptions: {
      volume,
      src: sound,
    },
  });
  const { howlPlay: howlPlayOnStart } = useHowl({
    howlOptions: {
      volume,
      src: sound2,
    },
  });
  const disabledPlay = useMemo(
    () => countdown > 0 || losers.length >= players.length - 1,
    [countdown, losers.length, players.length]
  );
  const disabledReload = useMemo(
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
  const portal = useMemo(() => {
    const rootElement = document.getElementById("root");

    return countdown && rootElement
      ? createPortal(
          <div className={styles.countdownWrapper}>{countdown}</div>,
          rootElement
        )
      : null;
  }, [countdown]);

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
    if (countdown) {
      howlPlayOnCountdown();

      return;
    }

    howlPlayOnStart();
  }, [countdown, howlPlayOnCountdown, howlPlayOnStart]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Timers
          addLoser={addLoser}
          currentPlayer={currentPlayer}
          minute={minute}
          players={players}
          previousPlayer={previousPlayer}
          revertPlayer={revertPlayer}
          revertTime={revertTime}
          setRevertTime={setRevertTime}
          startNextPlayer={startNextPlayer}
        />
        <GameController
          disabledPlay={disabledPlay}
          disabledReload={disabledReload}
          disabledRevert={disabledRevert}
          disabledStop={disabledStop}
          displayButton={displayButton}
          handleClickOnReload={handleClickOnReload}
          handleClickOnRevert={handleClickOnRevert}
          handleClickOnStart={handleClickOnStart}
          handleClickOnStop={handleClickOnStop}
        />
      </div>
      {portal}
    </div>
  );
};

export default Game;
