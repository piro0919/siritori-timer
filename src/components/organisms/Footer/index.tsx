import { FC, memo } from "react";
import styles from "./style.module.scss";

const Footer: FC = () => (
  <footer className={styles.footer}>© 2020 限界しりとりタイマー</footer>
);

export default memo(Footer);
