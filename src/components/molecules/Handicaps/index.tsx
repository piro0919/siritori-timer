import { ComponentPropsWithRef, FC, forwardRef, useMemo } from "react";
import uniqid from "uniqid";
import styles from "./style.module.scss";

export type HandicapsProps = Pick<ComponentPropsWithRef<"select">, "ref"> & {
  player: number;
};

const Handicaps: FC<HandicapsProps> = forwardRef<
  HTMLSelectElement,
  Omit<HandicapsProps, "ref">
>(({ player }, ref) => {
  const items = useMemo(
    () =>
      [...Array(player)].map((_, index) => (
        <label key={uniqid()}>
          {`${index + 1}P：`}
          <select
            className={styles.select}
            name={`handicaps[${index}]`}
            ref={ref}
          >
            <option value="0">なし</option>
            <option value="0.5">30秒</option>
            <option value="1">1分</option>
            <option value="1.5">1分30秒</option>
            <option value="2">2分</option>
            <option value="2.5">2分30秒</option>
            <option value="3">3分</option>
          </select>
        </label>
      )),
    [player, ref]
  );

  return <div className={styles.wrapper}>{items}</div>;
});

export default Handicaps;
