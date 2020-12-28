import { FC, useMemo } from "react";
import styles from "./style.module.scss";
import Select, { SelectProps } from "components/atoms/Select";
import uniqid from "uniqid";

export type HandicapsProps = {
  handicapsRef: SelectProps["ref"];
  player: number;
};

const Handicaps: FC<HandicapsProps> = ({ handicapsRef, player }) => {
  const items = useMemo(
    () =>
      [...Array(player)].map((_, index) => (
        <label key={uniqid()}>
          {`${index + 1}P：`}
          <Select
            name={`handicaps[${index}]`}
            options={[
              {
                children: "なし",
                value: "0",
              },
              {
                children: "30秒",
                value: "0.5",
              },
              {
                children: "1分",
                value: "1",
              },
              {
                children: "1分30秒",
                value: "1.5",
              },
              {
                children: "2分",
                value: "2",
              },
              {
                children: "2分30秒",
                value: "2.5",
              },
              {
                children: "3分",
                value: "3",
              },
            ]}
            ref={handicapsRef}
          />
        </label>
      )),
    [handicapsRef, player]
  );

  return <div className={styles.wrapper}>{items}</div>;
};

export default Handicaps;
