import React, { ComponentPropsWithoutRef, FC, useMemo } from "react";
import styles from "./style.module.scss";
import useWindowSize from "@rooks/use-window-size";

const Layout: FC = ({ children }) => {
  const { innerHeight } = useWindowSize();
  const style = useMemo<ComponentPropsWithoutRef<"div">["style"]>(
    () => ({
      minHeight: innerHeight || window.innerHeight,
    }),
    [innerHeight]
  );

  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.background} />
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export default Layout;
