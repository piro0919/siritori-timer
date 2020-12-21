import RuleSelect from "components/molecules/RuleSelect";
import { FC, useCallback, useMemo } from "react";
import { useReactPWAInstall } from "react-pwa-install";
import styles from "./style.module.scss";
import useLocalstorage from "@rooks/use-localstorage";
import { Howl } from "howler";
import sound from "./sounds/decision29.mp3";

const TopSelect: FC = () => {
  const { isInstalled, pwaInstall, supported } = useReactPWAInstall();
  const [volume, setVolume] = useLocalstorage("volume", 1);
  const handleClick = useCallback(() => {
    pwaInstall({
      title: "限界しりとりタイマー インストール",
      logo: "/logo192.png",
      description: "限界しりとりパーティーの非公式タイマーアプリです",
    })
      .then(() => {})
      .catch(() => {});
  }, [pwaInstall]);
  const howl = useMemo(
    () =>
      new Howl({
        src: [sound],
      }),
    []
  );
  const handleClick2 = useCallback(() => {
    const nextVolume = volume ? 0 : 1;

    setVolume(nextVolume);

    if (!nextVolume) {
      return;
    }

    howl.play();
  }, [howl, setVolume, volume]);

  return (
    <div className={styles.wrapper}>
      <RuleSelect volume={volume} />
      <div className={styles.buttonsWrapper}>
        <button className={styles.button} onClick={handleClick2}>{`サウンド：${
          volume ? "オン" : "オフ"
        }`}</button>
        <button
          className={styles.button}
          disabled={isInstalled() || !supported()}
          onClick={handleClick}
        >
          ホームへ追加
        </button>
      </div>
    </div>
  );
};

export default TopSelect;
