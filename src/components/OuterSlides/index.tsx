import Game, { GameProps } from "components/Game";
import InnerSlides, { InnerSlidesProps } from "components/InnerSlides";
import { m } from "framer-motion";
import useParseUrl from "hooks/useParseUrl";
import type { JSX } from "react";
import { useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

export type OuterSlidesProps = Pick<
  InnerSlidesProps,
  "defaultValues" | "disabledPlayer" | "onSubmit"
> &
  Partial<Pick<GameProps, "first" | "players">> &
  Pick<GameProps, "isStart">;

function OuterSlides({
  defaultValues,
  disabledPlayer,
  first,
  isStart,
  onSubmit,
  players,
}: OuterSlidesProps): JSX.Element | null {
  const { url } = useParseUrl();
  // サーバーには窓が無く、幅 0 として空で描く。初回からブラウザの幅を
  // 読むと最初の描画がサーバーとずれて hydration が失敗するので、
  // 測るのは描いた後にする。
  const { height, width } = useWindowSize({ initializeWithValue: false });
  const index = url === "/game" ? 1 : 0;

  if (!width) {
    return null;
  }

  return (
    <m.div
      animate={{ x: width * index * -1 }}
      className={styles.wrapper}
      initial={false}
      style={{ gridTemplateColumns: `repeat(2, ${width}px)` }}
    >
      <div className={styles.item}>
        <div className={styles.inner} style={{ minHeight: height }}>
          <InnerSlides
            defaultValues={defaultValues}
            disabledPlayer={disabledPlayer}
            onSubmit={onSubmit}
          />
        </div>
      </div>
      {typeof first === "number" && players ? (
        <Game first={first} isStart={isStart} players={players} />
      ) : null}
    </m.div>
  );
}

export default OuterSlides;
