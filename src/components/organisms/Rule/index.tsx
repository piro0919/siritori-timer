import Button from "components/atoms/Button";
import Handicaps, { HandicapsProps } from "components/molecules/Handicaps";
import Slider, { SliderProps } from "components/molecules/Slider";
import React, {
  ComponentPropsWithoutRef,
  FC,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Controller, UseControllerOptions } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./style.module.scss";

export type RuleProps = Pick<UseControllerOptions, "control"> & {
  handicapsRef: HandicapsProps["ref"];
  handleSubmit: ComponentPropsWithoutRef<"form">["onSubmit"];
};

const Rule: FC<RuleProps> = ({ control, handicapsRef, handleSubmit }) => {
  const [player, setPlayer] = useState(0);
  const [time, setTime] = useState(0);
  const { pathname } = useLocation();
  const disabledPlayer = useMemo<SliderProps["disabled"]>(
    () => pathname === "/expert",
    [pathname]
  );
  const [minutes, seconds] = useMemo(
    () => (time ? time.toString().split(".") : []),
    [time]
  );
  const { push } = useHistory();
  const handleClick = useCallback(() => {
    push("/");
  }, [push]);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading2}>
        {pathname === "/expert" ? "エキスパートルール" : "パーティルール"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inner}>
          <fieldset className={styles.fieldset}>
            <legend
              className={styles.legend}
            >{`プレイ人数：${player}人`}</legend>
            <Controller
              control={control}
              name="player"
              render={({ onChange, value }) => (
                <Slider
                  disabled={disabledPlayer}
                  max={6}
                  min={2}
                  onChange={onChange}
                  setValue={setPlayer}
                  tipFormatter={(value) => (
                    <div className={styles.tip}>{`${value}人`}</div>
                  )}
                  value={value}
                />
              )}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>{`持ち時間：${
              minutes !== "0" ? `${minutes}分` : ""
            }${seconds ? `30秒` : ""}`}</legend>
            <Controller
              control={control}
              name="time"
              render={({ onChange, value }) => (
                <Slider
                  max={10}
                  min={0.5}
                  onChange={onChange}
                  setValue={setTime}
                  step={0.5}
                  tipFormatter={(value) => {
                    const [minutes, seconds] = value.toString().split(".");

                    return (
                      <div className={styles.tip}>{`${
                        minutes !== "0" ? `${minutes}分` : ""
                      }${seconds ? `30秒` : ""}`}</div>
                    );
                  }}
                  value={value}
                />
              )}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>ハンデ</legend>
            <Handicaps player={player} ref={handicapsRef} />
          </fieldset>
          <footer className={styles.buttonsWrapper}>
            <Button onClick={handleClick}>戻る</Button>
            <Button type="submit">レッツパーティ！</Button>
          </footer>
        </div>
      </form>
    </section>
  );
};

export default Rule;
