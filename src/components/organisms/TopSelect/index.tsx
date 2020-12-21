import RuleSelect from "components/molecules/RuleSelect";
import { FC, useCallback } from "react";
import { useReactPWAInstall } from "react-pwa-install";
import styles from "./style.module.scss";

const TopSelect: FC = () => {
  const { isInstalled, pwaInstall, supported } = useReactPWAInstall();
  const handleClick = useCallback(() => {
    pwaInstall({
      title: "限界しりとりタイマー インストール",
      logo: "/logo192.png",
      description: "限界しりとりパーティーの非公式タイマーアプリです",
    })
      .then(() => {})
      .catch(() => {});
  }, [pwaInstall]);

  return (
    <div className={styles.wrapper}>
      <RuleSelect />
      <button
        className={styles.button}
        disabled={isInstalled() || !supported()}
        onClick={handleClick}
      >
        ホームへ追加
      </button>
    </div>
  );
};

export default TopSelect;
