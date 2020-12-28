import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  FC,
  forwardRef,
  useMemo,
} from "react";
import uniqid from "uniqid";
import styles from "./style.module.scss";

export type SelectProps = Pick<
  ComponentPropsWithRef<"select">,
  "name" | "ref"
> & {
  options: Pick<ComponentPropsWithoutRef<"option">, "children" | "value">[];
};

const Select: FC<SelectProps> = forwardRef<
  HTMLSelectElement,
  Omit<SelectProps, "ref">
>(({ name, options }, ref) => {
  const items = useMemo(
    () =>
      options.map(({ children, value }) => (
        <option key={uniqid()} value={value}>
          {children}
        </option>
      )),
    [options]
  );

  return (
    <select className={styles.select} name={name} ref={ref}>
      {items}
    </select>
  );
});

export default Select;
