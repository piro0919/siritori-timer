import { FC, useCallback } from "react";
import styles from "./style.module.scss";
import { Link, LinkProps } from "react-router-dom";
import sound from "./sounds/decision29.mp3";
import useHowl from "hooks/useHowl";
import useLocalstorage from "@rooks/use-localstorage";

const RuleSelect: FC = () => {
  const [volume] = useLocalstorage("volume", 1);
  const { howlPlay } = useHowl({
    howlOptions: {
      volume,
      src: sound,
    },
  });
  const handleClick = useCallback<NonNullable<LinkProps["onClick"]>>(() => {
    howlPlay();
  }, [howlPlay]);

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
