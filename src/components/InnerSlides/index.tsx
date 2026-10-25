import Footer from "components/Footer";
import Header from "components/Header";
import RuleForm, { RuleFormProps } from "components/RuleForm";
import Top from "components/Top";
import { m } from "framer-motion";
import useElementSize from "hooks/useElementSize";
import useParseUrl from "hooks/useParseUrl";
import type { JSX } from "react";
import styles from "./style.module.scss";

export type InnerSlidesProps = Partial<
  Pick<RuleFormProps, "defaultValues" | "disabledPlayer">
> &
  Pick<RuleFormProps, "onSubmit">;

function InnerSlides({
  defaultValues,
  disabledPlayer,
  onSubmit,
}: InnerSlidesProps): JSX.Element {
  const { url } = useParseUrl();
  const [ref, { width = 0 }] = useElementSize();
  // トップだけが左。/expert と /party はルールの入力を見せる。
  const index = url === "/" ? 0 : 1;
  const [headerRef, { height: headerHeight = 0 }] = useElementSize();
  const [footerRef, { height: footerHeight = 0 }] = useElementSize();

  return (
    <div className={styles.wrapper} ref={ref}>
      <div ref={headerRef}>
        <Header />
      </div>
      <main
        className={styles.main}
        style={{ paddingBottom: (headerHeight - footerHeight) / 2 }}
      >
        {width ? (
          <m.div
            animate={{ x: width * index * -1 }}
            className={styles.inner}
            initial={false}
            style={{ gridTemplateColumns: `repeat(2, ${width}px)` }}
          >
            <div className={styles.item}>
              <Top />
            </div>
            <div className={styles.formItem}>
              {defaultValues && typeof disabledPlayer === "boolean" ? (
                <RuleForm
                  defaultValues={defaultValues}
                  disabledPlayer={disabledPlayer}
                  onSubmit={onSubmit}
                />
              ) : null}
            </div>
          </m.div>
        ) : null}
      </main>
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

export default InnerSlides;
