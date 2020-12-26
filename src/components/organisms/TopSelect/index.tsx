import React, { FC, useCallback, useContext, useMemo, useState } from "react";
import styles from "./style.module.scss";
import sound from "./sounds/decision29.mp3";
import usePwa from "use-pwa";
import Button, { ButtonProps } from "components/atoms/Button";
import { useHistory } from "react-router-dom";
import VolumeContext from "contexts/VolumeContext";
import ReactHowler from "react-howler";

const TopSelect: FC = () => {
  const {
    appinstalled,
    enabledPwa,
    handleClickOnInstallPrompt,
    isPwa,
  } = usePwa();
  const { setVolume, volume } = useContext(VolumeContext);
  const [playing, setPlaying] = useState(false);
  const handleClickOnToggleSound = useCallback(() => {
    const nextVolume = volume ? 0 : 1;

    setVolume(nextVolume);

    if (!nextVolume) {
      return;
    }

    setPlaying(true);
  }, [setVolume, volume]);
  const volumeText = useMemo(() => `サウンド：${volume ? "オン" : "オフ"}`, [
    volume,
  ]);
  const { push } = useHistory();
  const handleClickOnParty = useCallback<
    NonNullable<ButtonProps["onClick"]>
  >(() => {
    push("/party");
  }, [push]);
  const handleClickOnExpert = useCallback<
    NonNullable<ButtonProps["onClick"]>
  >(() => {
    push("/expert");
  }, [push]);
  const handleEnd = useCallback(() => {
    setPlaying(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Button onClick={handleClickOnParty}>パーティルール</Button>
      <Button onClick={handleClickOnExpert}>エキスパートルール</Button>
      <div className={styles.buttonsWrapper}>
        <Button onClick={handleClickOnToggleSound}>{volumeText}</Button>
        {!appinstalled && enabledPwa && !isPwa ? (
          <Button disabled={!enabledPwa} onClick={handleClickOnInstallPrompt}>
            ホームへ追加
          </Button>
        ) : null}
      </div>
      <ReactHowler
        onEnd={handleEnd}
        playing={playing}
        src={sound}
        volume={volume}
      />
    </div>
  );
};

export default TopSelect;
