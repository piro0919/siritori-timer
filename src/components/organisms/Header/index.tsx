import React, { FC, memo } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

const Header: FC = () => (
  <header className={styles.header}>
    <h1>
      <Link to="/">
        限界しりとり
        <span className={styles.red}>タイマー</span>
      </Link>
    </h1>
  </header>
);

export default memo(Header);
