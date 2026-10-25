import useHowl from "hooks/useHowl";
import { type JSX, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  useBoolean,
  useCountdown,
  useIsClient,
  useWindowSize,
} from "usehooks-ts";
import styles from "./style.module.scss";

const COUNT_START = 3;

export type CountdownPortalProps = {
  onHide?: () => void;
};

function CountdownPortal({ onHide }: CountdownPortalProps): JSX.Element | null {
  // document.body はサーバーに無い。描いた後に出す。
  const isClient = useIsClient();
  const [isShow, setIsShow] = useState(true);
  const { setTrue: onIsStartCountdown, value: isStartCountdown } =
    useBoolean(false);
  const [count, { startCountdown, stopCountdown }] = useCountdown({
    countStart: COUNT_START,
    countStop: 0,
    intervalMs: 1000,
    isIncrement: false,
  });
  const countHowl = useHowl({
    src: "/sounds/count.mp3",
  });
  const startHowl = useHowl({
    src: "/sounds/start.mp3",
  });
  const { height, width } = useWindowSize();
  const hide = useCallback((): void => {
    // Esc で数えている途中に閉じても、裏で数え続けて音を鳴らさないよう止める。
    stopCountdown();

    setIsShow(false);

    onHide?.();
  }, [onHide, stopCountdown]);

  useEffect(() => {
    if (!isShow || !isStartCountdown) {
      return;
    }

    if (count === 0) {
      startHowl.play();

      hide();

      return;
    }

    countHowl.play();
  }, [count, countHowl, hide, isShow, isStartCountdown, startHowl]);

  // 以前使っていた react-cool-portal は Esc でも閉じた。その動きを残す。
  useEffect(() => {
    if (!isShow) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        hide();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return (): void => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hide, isShow]);

  if (!isClient || !isShow) {
    return null;
  }

  return createPortal(
    <div
      className={styles.wrapper}
      onClick={(): void => {
        if (isStartCountdown) {
          return;
        }

        onIsStartCountdown();
        startCountdown();
      }}
      style={{ height, width }}
    >
      <div className={styles.text}>
        {isStartCountdown ? count : "Touch Start !"}
      </div>
    </div>,
    document.body
  );
}

export default CountdownPortal;
