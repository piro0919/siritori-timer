import { FC, useCallback, useMemo } from "react";
import styles from "./style.module.scss";
import { Link, LinkProps } from "react-router-dom";
import { Howl, HowlOptions } from "howler";
import sound from "./sounds/decision29.mp3";

export type RuleSelectProps = Pick<HowlOptions, "volume">;

const RuleSelect: FC<RuleSelectProps> = ({ volume }) => {
  const howl = useMemo(
    () =>
      new Howl({
        volume,
        src: [sound],
      }),
    [volume]
  );
  const handleClick = useCallback<NonNullable<LinkProps["onClick"]>>(() => {
    howl.play();
  }, [howl]);

  return (
    <div className={styles.wrapper}>
      <Link className={styles.item} onClick={handleClick} to="/party">
        パーティルール
      </Link>
      <Link className={styles.item} onClick={handleClick} to="/expert">
        エキスパートルール
      </Link>
    </div>
  );
};

export default RuleSelect;
