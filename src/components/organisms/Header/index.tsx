import React, { FC } from "react";
import styles from "./style.module.scss";

const Header: FC = () => (
  <header className={styles.header}>
    <h1>
      限界しりとり
      <span className={styles.red}>タイマー</span>
    </h1>
  </header>
);

export default Header;
