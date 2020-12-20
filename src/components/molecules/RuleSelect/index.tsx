import React, { FC } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

const RuleSelect: FC = () => (
  <div className={styles.wrapper}>
    <Link className={styles.item} to="/party">
      パーティルール
    </Link>
    <Link className={styles.item} to="/expert">
      エキスパートルール
    </Link>
  </div>
);

export default RuleSelect;
