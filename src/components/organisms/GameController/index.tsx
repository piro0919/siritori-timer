import { ComponentPropsWithoutRef, FC, useMemo } from "react";
import { GrPlayFill, GrRevert, GrStopFill } from "react-icons/gr";
import { IoReload, IoReturnDownBackOutline } from "react-icons/io5";
import styles from "./style.module.scss";

export type GameControllerProps = Record<
  | "disabledPlay"
  | "disabledReload"
  | "disabledReturn"
  | "disabledRevert"
  | "disabledStop",
  ComponentPropsWithoutRef<"button">["disabled"]
> &
  Record<
    | "handleClickOnReload"
    | "handleClickOnRevert"
    | "handleClickOnReturn"
    | "handleClickOnStart"
    | "handleClickOnStop",
    ComponentPropsWithoutRef<"button">["onClick"]
  > & {
    displayButton: "play" | "stop";
  };

const GameController: FC<GameControllerProps> = ({
  disabledPlay,
  disabledReload,
  disabledReturn,
  disabledRevert,
  disabledStop,
  displayButton,
  handleClickOnReload,
  handleClickOnReturn,
  handleClickOnRevert,
  handleClickOnStart,
  handleClickOnStop,
}) => {
  const button = useMemo(
    () =>
      displayButton === "play" ? (
        <button
          className={styles.button}
          disabled={disabledPlay}
          onClick={handleClickOnStart}
        >
          <GrPlayFill color="#fff" size={20} />
        </button>
      ) : (
        <button
          className={styles.button}
          disabled={disabledStop}
          onClick={handleClickOnStop}
        >
          <GrStopFill color="#fff" size={20} />
        </button>
      ),
    [
      disabledPlay,
      disabledStop,
      displayButton,
      handleClickOnStart,
      handleClickOnStop,
    ]
  );

  return (
    <aside className={styles.aside}>
      {button}
      <button
        className={styles.button}
        disabled={disabledRevert}
        onClick={handleClickOnRevert}
      >
        <GrRevert color="#fff" size={24} />
      </button>
      <button
        className={styles.button}
        disabled={disabledReturn}
        onClick={handleClickOnReturn}
      >
        <IoReturnDownBackOutline color="#fff" size={24} />
      </button>
      <button
        className={styles.button}
        disabled={disabledReload}
        onClick={handleClickOnReload}
      >
        <IoReload color="#fff" size={24} />
      </button>
    </aside>
  );
};

export default GameController;
