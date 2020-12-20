import Slider, { SliderProps } from "components/molecules/Slider";
import React, { ComponentPropsWithoutRef, FC, useMemo, useState } from "react";
import { Controller, UseControllerOptions } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styles from "./style.module.scss";

export type RuleProps = Pick<UseControllerOptions, "control"> & {
  handleSubmit: ComponentPropsWithoutRef<"form">["onSubmit"];
};

const Rule: FC<RuleProps> = ({ control, handleSubmit }) => {
  const [player, setPlayer] = useState(0);
  const [time, setTime] = useState(0);
  const { pathname } = useLocation();
  const disabledPlayer = useMemo<SliderProps["disabled"]>(
    () => pathname === "/expert",
    [pathname]
  );
  const [minutes, seconds] = time ? time.toString().split(".") : [];

  return (
    <section className={styles.wrapper}>
      <h2>
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
          <footer className={styles.footer}>
            <button className={styles.button} type="submit">
              レッツパーティ！
            </button>
          </footer>
        </div>
      </form>
    </section>
  );
};

export default Rule;
