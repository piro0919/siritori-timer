import Button from "components/atoms/Button";
import Handicaps, { HandicapsProps } from "components/molecules/Handicaps";
import Slider, { SliderProps } from "components/molecules/Slider";
import React, {
  ComponentPropsWithoutRef,
  FC,
  useCallback,
  useMemo,
} from "react";
import { Controller, UseControllerOptions } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./style.module.scss";
import Select, { SelectProps } from "components/atoms/Select";

export type RuleProps = Pick<HandicapsProps, "handicapsRef"> &
  Pick<UseControllerOptions, "control"> & {
    firstRef: SelectProps["ref"];
    handleSubmit: ComponentPropsWithoutRef<"form">["onSubmit"];
    player: string;
    time: string;
  };

const Rule: FC<RuleProps> = ({
  control,
  firstRef,
  handicapsRef,
  handleSubmit,
  player,
  time,
}) => {
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
  const firstOptions = useMemo(
    () => [
      ...[...Array(player ? parseInt(player, 10) : 0)].map((_, index) => ({
        children: `${index + 1}P`,
        value: `${index}`,
      })),
      {
        children: "ランダム",
        value: "-1",
      },
    ],
    [player]
  );

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading2}>
        {pathname === "/expert" ? "エキスパートルール" : "パーティルール"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inner}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              <div className={styles.legendInner}>
                {`プレイ人数：${player}人`}
              </div>
            </legend>
            <Controller
              control={control}
              defaultValue="2"
              name="player"
              render={({ onChange, value }) => (
                <Slider
                  disabled={disabledPlayer}
                  max={6}
                  min={2}
                  onChange={onChange}
                  tipFormatter={(value) => (
                    <div className={styles.tip}>{`${value}人`}</div>
                  )}
                  value={value}
                />
              )}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              <div className={styles.legendInner}>{`持ち時間：${
                minutes !== "0" ? `${minutes}分` : ""
              }${seconds ? `30秒` : ""}`}</div>
            </legend>
            <Controller
              control={control}
              defaultValue="1"
              name="time"
              render={({ onChange, value }) => (
                <Slider
                  max={10}
                  min={0.5}
                  onChange={onChange}
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
            <legend className={styles.legend}>
              <div className={styles.legendInner}>ハンデ</div>
            </legend>
            <div className={styles.fieldsetInner}>
              <Handicaps
                handicapsRef={handicapsRef}
                player={player ? parseInt(player, 10) : 0}
              />
            </div>
          </fieldset>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              <div className={styles.legendInner}>順番</div>
            </legend>
            <div className={styles.fieldsetInner}>
              <label>
                最初のプレイヤー：
                <Select name="first" options={firstOptions} ref={firstRef} />
              </label>
            </div>
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
