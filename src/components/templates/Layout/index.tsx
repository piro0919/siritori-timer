import React, { ComponentPropsWithoutRef, FC, useMemo } from "react";
import styles from "./style.module.scss";
import { useWindowHeight } from "@react-hook/window-size";
import NoSSR from "react-no-ssr";

const Layout: FC = ({ children }) => {
  const onlyHeight = useWindowHeight();
  const style = useMemo<ComponentPropsWithoutRef<"div">["style"]>(
    () => ({
      minHeight: onlyHeight,
    }),
    [onlyHeight]
  );

  return (
    <NoSSR>
      <div className={styles.wrapper} style={style}>
        <div className={styles.background} />
        <div className={styles.inner}>{children}</div>
      </div>
    </NoSSR>
  );
};

export default Layout;
