import CountdownPortal from "components/CountdownPortal";
import OuterSlides, { OuterSlidesProps } from "components/OuterSlides";
import { FieldValues } from "components/RuleForm";
import Seo from "components/Seo";
import useParseUrl from "hooks/useParseUrl";
import { createPlayers, MIN_PLAYER, pickFirst, toPlayerCount } from "lib/game";
import { useRouter } from "next/router";
import queryString from "query-string";
import { type JSX, useCallback, useEffect, useMemo } from "react";
import { useBoolean, useLocalStorage } from "usehooks-ts";

const EXPERT_TIME = 60 * 5;
const PARTY_TIME = 60;

function createDefaultValues(time: number): FieldValues {
  return {
    time,
    first: "",
    handicaps: Array.from({ length: MIN_PLAYER }, () => ({ time: "0" })),
    player: MIN_PLAYER,
  };
}

function Pages(): JSX.Element {
  const {
    query: { first: queryFirst, handicaps, player: queryPlayer, time },
    url,
  } = useParseUrl();
  const [expertDefaultValues, setExpertDefaultValues] = useLocalStorage(
    "expertDefaultValues",
    () => createDefaultValues(EXPERT_TIME)
  );
  const [partyDefaultValues, setPartyDefaultValues] = useLocalStorage(
    "partyDefaultValues",
    () => createDefaultValues(PARTY_TIME)
  );
  const rule = useMemo(() => {
    switch (url) {
      case "/expert": {
        return {
          defaultValues: expertDefaultValues,
          disabledPlayer: true,
          setDefaultValues: setExpertDefaultValues,
        };
      }
      case "/party": {
        return {
          defaultValues: partyDefaultValues,
          disabledPlayer: false,
          setDefaultValues: setPartyDefaultValues,
        };
      }
      default: {
        return undefined;
      }
    }
  }, [
    expertDefaultValues,
    partyDefaultValues,
    setExpertDefaultValues,
    setPartyDefaultValues,
    url,
  ]);
  const router = useRouter();
  const handleSubmit = useCallback<OuterSlidesProps["onSubmit"]>(
    (values) => {
      rule?.setDefaultValues(values);

      router.push(
        queryString.stringifyUrl(
          {
            query: {
              ...values,
              handicaps: values.handicaps.map(({ time }) => time),
            },
            url: "/game",
          },
          {
            skipEmptyString: true,
          }
        )
      );
    },
    [router, rule]
  );
  const playerCount = toPlayerCount(queryPlayer);
  const first = useMemo<OuterSlidesProps["first"]>(
    () =>
      typeof queryPlayer === "string"
        ? pickFirst(queryFirst, playerCount)
        : undefined,
    [playerCount, queryFirst, queryPlayer]
  );
  const {
    setFalse: offIsStart,
    setTrue: onIsStart,
    value: isStart,
  } = useBoolean(false);
  const players = useMemo<OuterSlidesProps["players"]>(
    () =>
      url === "/game" &&
      Array.isArray(handicaps) &&
      typeof queryPlayer === "string" &&
      typeof time === "string"
        ? createPlayers({ handicaps, playerCount, time })
        : undefined,
    [handicaps, playerCount, queryPlayer, time, url]
  );

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
        defaultValues={rule?.defaultValues}
        disabledPlayer={rule?.disabledPlayer}
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
