import RuleSelect from "components/molecules/RuleSelect";
import React, { FC, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import Rule, { RuleProps } from "../Rule";
import Game from "../Game";

export type TopProps = Pick<RuleProps, "control" | "handleSubmit">;

const Top: FC<TopProps> = ({ control, handleSubmit }) => {
  const { pathname } = useLocation();
  const animate = useMemo(() => ({ x: pathname === "/" ? "0" : "-50%" }), [
    pathname,
  ]);
  const animate2 = useMemo(() => ({ x: pathname === "/game" ? "-50%" : "0" }), [
    pathname,
  ]);

  return (
    <div className={styles.wrapper}>
      <motion.div
        animate={animate2}
        className={styles.wrapper2}
        initial={false}
      >
        <div className={styles.inner}>
          <Header />
          <main className={styles.main}>
            <motion.div
              animate={animate}
              className={styles.mainInner}
              initial={false}
            >
              <div className={styles.item}>
                {pathname === "/" ? <RuleSelect /> : null}
              </div>
              <div className={styles.item}>
                {pathname === "/expert" || pathname === "/party" ? (
                  <Rule control={control} handleSubmit={handleSubmit} />
                ) : null}
              </div>
            </motion.div>
          </main>
          <Footer />
        </div>
        <div className={styles.gameWrapper}>
          {pathname === "/game" ? <Game /> : null}
        </div>
      </motion.div>
    </div>
  );
};

export default Top;
