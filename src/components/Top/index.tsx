import useHowl from "hooks/useHowl";
import { Howler } from "howler";
import router from "next/router";
import { type JSX, useEffect } from "react";
import usePwa from "use-pwa";
import { useLocalStorage } from "usehooks-ts";
import styles from "./style.module.scss";

function Top(): JSX.Element {
  const clickHowl = useHowl({ src: "/sounds/click.mp3" });
  // 初めての人は音ありで始める。保存した値はサーバーに無いので、描いた後に読む。
  const [isMute, setIsMute] = useLocalStorage("isMute", false, {
    initializeWithValue: false,
  });
  const {
    appinstalled,
    canInstallprompt,
    enabledPwa,
    isPwa,
    showInstallPrompt,
  } = usePwa();

  // 保存した設定を、開いたときの音量にも効かせる。押したときだけ変えていたので、
  // 開き直すと「オフ」の表示のまま鳴っていた。
  useEffect(() => {
    Howler.volume(isMute ? 0 : 1);
  }, [isMute]);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={(): void => {
          router.push("/party");
        }}
      >
        パーティルール
      </button>
      <button
        className={styles.button}
        onClick={(): void => {
          router.push("/expert");
        }}
      >
        エキスパートルール
      </button>
      <div className={styles.buttonsWrapper}>
        <button
          className={styles.button}
          onClick={(): void => {
            clickHowl.play();

            Howler.volume(isMute ? 1 : 0);

            setIsMute((prevIsMute) => !prevIsMute);
          }}
        >{`サウンド：${isMute ? "オフ" : "オン"}`}</button>
        {!appinstalled && canInstallprompt && enabledPwa && !isPwa ? (
          <button className={styles.button} onClick={showInstallPrompt}>
            インストール
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Top;
