import { ComponentPropsWithoutRef, FC } from "react";
import styles from "./style.module.scss";

export type ButtonProps = Pick<
  ComponentPropsWithoutRef<"button">,
  "disabled" | "onClick" | "type"
>;

const Button: FC<ButtonProps> = ({ children, disabled, onClick, type }) => (
  <button
    className={styles.button}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

export default Button;
