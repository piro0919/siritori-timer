import RuleSelect from "components/molecules/RuleSelect";
import { FC, useCallback, useMemo } from "react";
import styles from "./style.module.scss";
import useLocalstorage from "@rooks/use-localstorage";
import sound from "./sounds/decision29.mp3";
import usePwa from "use-pwa";
import Button from "components/atoms/Button";
import useHowl from "hooks/useHowl";

const TopSelect: FC = () => {
  const { enabledPwa, handleClickOnInstallPrompt, isPwa } = usePwa();
  const [volume, setVolume] = useLocalstorage("volume", 1);
  const { howlPlay, howlSetVolume } = useHowl({
    howlOptions: {
      volume,
      src: sound,
    },
  });
  const handleClickOnToggleSound = useCallback(() => {
    const nextVolume = volume ? 0 : 1;

    setVolume(nextVolume);

    howlSetVolume(nextVolume);

    howlPlay();
  }, [howlPlay, howlSetVolume, setVolume, volume]);
  const volumeText = useMemo(() => `サウンド：${volume ? "オン" : "オフ"}`, [
    volume,
  ]);

  return (
    <div className={styles.wrapper}>
      <RuleSelect />
      <div className={styles.buttonsWrapper}>
        <Button handleClick={handleClickOnToggleSound}>{volumeText}</Button>
        {isPwa ? null : (
          <Button
            disabled={!enabledPwa}
            handleClick={handleClickOnInstallPrompt}
          >
            ホームへ追加
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopSelect;
