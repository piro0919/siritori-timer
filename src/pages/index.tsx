import CountdownPortal from "components/CountdownPortal";
import OuterSlides, { OuterSlidesProps } from "components/OuterSlides";
import Seo from "components/Seo";
import useParseUrl from "hooks/useParseUrl";
import { useRouter } from "next/router";
import queryString from "query-string";
import random from "random";
import { type JSX, useCallback, useEffect, useMemo } from "react";
import { useBoolean, useLocalStorage } from "usehooks-ts";

const MIN_PLAYER = 2;
const MAX_PLAYER = 6;
const DEFAULT_TIME = 60;
/** 秒で受け取る値の上限。1 日あれば足りる。 */
const MAX_SECONDS = 60 * 60 * 24;

// URL は手で書き換えられる。数でなければ fallback、範囲の外なら端に寄せる。
function toInt(
  value: unknown,
  fallback: number,
  min: number,
  max: number
): number {
  const parsed = typeof value === "string" ? parseInt(value, 10) : NaN;

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, min), max);
}

function Pages(): JSX.Element {
  const {
    query: { first: queryFirst, handicaps, player: queryPlayer, time },
    url,
  } = useParseUrl();
  const initialPlayer = useMemo(() => 2, []);
  const [expertDefaultValues, setExpertDefaultValues] = useLocalStorage(
    "expertDefaultValues",
    {
      first: "",
      handicaps: Array(initialPlayer)
        .fill(undefined)
        .map(() => ({ time: "0" })),
      player: initialPlayer,
      time: 60 * 5,
    }
  );
  const [partyDefaultValues, setPartyDefaultValues] = useLocalStorage(
    "partyDefaultValues",
    {
      first: "",
      handicaps: Array(initialPlayer)
        .fill(undefined)
        .map(() => ({ time: "0" })),
      player: initialPlayer,
      time: 60,
    }
  );
  const { defaultValues, disabledPlayer } = useMemo(() => {
    switch (url) {
      case "/expert": {
        return {
          defaultValues: expertDefaultValues,
          disabledPlayer: true,
        };
      }
      case "/party": {
        return {
          defaultValues: partyDefaultValues,
          disabledPlayer: false,
        };
      }
      default: {
        return {};
      }
    }
  }, [expertDefaultValues, partyDefaultValues, url]);
  const router = useRouter();
  const handleSubmit = useCallback<OuterSlidesProps["onSubmit"]>(
    ({ handicaps, ...values }) => {
      switch (url) {
        case "/expert": {
          setExpertDefaultValues({ handicaps, ...values });

          break;
        }
        case "/party": {
          setPartyDefaultValues({ handicaps, ...values });

          break;
        }
      }

      router.push(
        queryString.stringifyUrl(
          {
            query: {
              ...values,
              handicaps: handicaps.map(({ time }) => time),
            },
            url: "/game",
          },
          {
            skipEmptyString: true,
          }
        )
      );
    },
    [router, setExpertDefaultValues, setPartyDefaultValues, url]
  );
  const playerCount = useMemo(
    () => toInt(queryPlayer, MIN_PLAYER, MIN_PLAYER, MAX_PLAYER),
    [queryPlayer]
  );
  const first = useMemo<OuterSlidesProps["first"]>(() => {
    if (typeof queryPlayer !== "string") {
      return undefined;
    }

    const parsed = typeof queryFirst === "string" ? Number(queryFirst) : NaN;

    // 人数の範囲に収まらない指定は、指定がなかったものとして決め直す。
    return Number.isInteger(parsed) && parsed >= 0 && parsed < playerCount
      ? parsed
      : random.int(0, playerCount - 1);
  }, [playerCount, queryFirst, queryPlayer]);
  const {
    setFalse: offIsStart,
    setTrue: onIsStart,
    value: isStart,
  } = useBoolean(false);
  const players = useMemo<OuterSlidesProps["players"]>(() => {
    if (
      url !== "/game" ||
      !Array.isArray(handicaps) ||
      typeof queryPlayer !== "string" ||
      typeof time !== "string"
    ) {
      return undefined;
    }

    const baseTime = toInt(time, DEFAULT_TIME, 1, MAX_SECONDS);

    return Array(playerCount)
      .fill(undefined)
      .map((_, index) => ({
        time: (baseTime + toInt(handicaps[index], 0, 0, MAX_SECONDS)) * 1000,
      }));
  }, [handicaps, playerCount, queryPlayer, time, url]);

  useEffect(() => {
    if (url === "/game") {
      return;
    }

    offIsStart();
  }, [offIsStart, url]);

  return (
    <>
      <Seo />
      <OuterSlides
        defaultValues={defaultValues}
        disabledPlayer={disabledPlayer}
        first={first}
        isStart={isStart}
        onSubmit={handleSubmit}
        players={players}
      />
      {url === "/game" ? <CountdownPortal onHide={onIsStart} /> : null}
    </>
  );
}

export default Pages;
