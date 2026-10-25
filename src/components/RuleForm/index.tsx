import { formatSeconds, MAX_PLAYER, MIN_PLAYER } from "lib/game";
import { useRouter } from "next/router";
import Slider from "rc-slider";
import type { JSX } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import styles from "./style.module.scss";

const MIN_TIME = 30;
const MAX_TIME = 60 * 10;
const TIME_STEP = 30;
const MAX_HANDICAP = 60 * 3;
const HANDICAP_STEP = 30;
const handicapOptions = Array.from(
  { length: MAX_HANDICAP / HANDICAP_STEP + 1 },
  (_, index) => index * HANDICAP_STEP
);

type Handicap = {
  time: string;
};

export type FieldValues = {
  first: string;
  handicaps: Handicap[];
  player: number;
  time: number;
};

export type RuleFormProps = {
  defaultValues: FieldValues;
  disabledPlayer?: boolean;
  onSubmit: SubmitHandler<FieldValues>;
};

function RuleForm({
  defaultValues,
  disabledPlayer,
  onSubmit,
}: RuleFormProps): JSX.Element {
  const { control, getValues, handleSubmit, register, setValue, watch } =
    useForm<FieldValues>({
      defaultValues,
    });
  const { append, fields, remove } = useFieldArray({
    control,
    name: "handicaps",
  });
  const router = useRouter();
  const player = watch("player");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inner}>
        <div className={styles.fieldsetsWrapper}>
          <fieldset className={styles.fieldset}>
            <legend
              className={styles.legend}
            >{`プレイ人数：${player}人`}</legend>
            <Controller
              control={control}
              name="player"
              render={({ field }): JSX.Element => (
                <Slider
                  {...field}
                  disabled={disabledPlayer}
                  max={MAX_PLAYER}
                  min={MIN_PLAYER}
                  onChangeComplete={(nextPlayer): void => {
                    if (typeof nextPlayer !== "number") {
                      return;
                    }

                    // ハンデの欄を人数に合わせて足し引きする。
                    const { length } = getValues("handicaps");

                    if (nextPlayer > length) {
                      append(
                        Array.from({ length: nextPlayer - length }, () => ({
                          time: "0",
                        }))
                      );

                      return;
                    }

                    if (nextPlayer < length) {
                      // 減った人が最初のプレイヤーに選ばれていたかもしれない。
                      setValue("first", "");

                      remove(
                        Array.from(
                          { length: length - nextPlayer },
                          (_, index) => nextPlayer + index
                        )
                      );
                    }
                  }}
                />
              )}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <legend className={styles.timeLegend}>
              持ち時間：
              <span className={styles.time}>
                {formatSeconds(watch("time"))}
              </span>
            </legend>
            <Controller
              control={control}
              name="time"
              render={({ field }): JSX.Element => (
                <Slider
                  {...field}
                  max={MAX_TIME}
                  min={MIN_TIME}
                  step={TIME_STEP}
                />
              )}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>ハンデ</legend>
            <div className={styles.selectsWrapper}>
              {fields.map(({ id }, index) => (
                <label key={id}>
                  <span>{`${index + 1}P：`}</span>
                  <select
                    {...register(`handicaps.${index}.time`)}
                    className={styles.select}
                  >
                    {handicapOptions.map((seconds) => (
                      <option key={seconds} value={seconds}>
                        {seconds ? formatSeconds(seconds) : "なし"}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>順番</legend>
            <div className={styles.selectsWrapper}>
              <label>
                <span>最初のプレイヤー：</span>
                <select {...register("first")} className={styles.select}>
                  <option value="">ランダム</option>
                  {Array.from({ length: player }, (_, index) => (
                    <option key={index} value={index}>{`${index + 1}P`}</option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>
        </div>
        <div className={styles.buttonsWrapper}>
          <button
            className={styles.button}
            onClick={(): void => {
              router.push("/");
            }}
            type="button"
          >
            戻る
          </button>
          <button className={styles.submitButton} type="submit">
            レッツパーティ！
          </button>
        </div>
      </div>
    </form>
  );
}

export default RuleForm;
