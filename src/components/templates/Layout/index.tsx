import {
  ComponentPropsWithoutRef,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./style.module.scss";
import { useWindowHeight } from "@react-hook/window-size";
import NoSSR from "react-no-ssr";
import { useLocation } from "react-router-dom";
import sound from "./sounds/decision29.mp3";
import useLocalstorage from "@rooks/use-localstorage";
import usePreviousDifferent from "@rooks/use-previous-different";
import VolumeContext from "contexts/VolumeContext";
import ReactHowler from "react-howler";

const Layout: FC = ({ children }) => {
  const onlyHeight = useWindowHeight();
  const style = useMemo<ComponentPropsWithoutRef<"div">["style"]>(
    () => ({
      minHeight: onlyHeight,
    }),
    [onlyHeight]
  );
  const { pathname } = useLocation();
  const previousPathname = usePreviousDifferent(pathname);
  const [initialVolume, set] = useLocalstorage("volume", 1);
  const [volume, setVolume] = useState<number>(initialVolume);
  const [playing, setPlaying] = useState(false);
  const value = useMemo(
    () => ({
      setVolume,
      volume,
    }),
    [setVolume, volume]
  );
  const handleEnd = useCallback(() => {
    setPlaying(false);
  }, []);

  useEffect(() => {
    set(volume);
  }, [set, volume]);

  useEffect(() => {
    if (!previousPathname) {
      return;
    }

    setPlaying(true);
  }, [previousPathname]);

  return (
    <VolumeContext.Provider value={value}>
      <NoSSR>
        <div className={styles.wrapper} style={style}>
          <div className={styles.background} />
          <div className={styles.inner}>{children}</div>
          <ReactHowler
            onEnd={handleEnd}
            playing={playing}
            src={sound}
            volume={volume}
          />
        </div>
      </NoSSR>
    </VolumeContext.Provider>
  );
};

export default Layout;
