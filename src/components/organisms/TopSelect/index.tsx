import RuleSelect from "components/molecules/RuleSelect";
import React, { FC, useCallback } from "react";
import { useReactPWAInstall } from "react-pwa-install";
import styles from "./style.module.scss";

const TopSelect: FC = () => {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
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
      {supported && !isInstalled ? (
        <button className={styles.button} onClick={handleClick}>
          ホームへ追加
        </button>
      ) : null}
    </div>
  );
};

export default TopSelect;
