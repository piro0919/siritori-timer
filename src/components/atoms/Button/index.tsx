import { ComponentPropsWithoutRef, FC } from "react";
import styles from "./style.module.scss";

export type ButtonProps = Pick<
  ComponentPropsWithoutRef<"button">,
  "disabled"
> & {
  handleClick: ComponentPropsWithoutRef<"button">["onClick"];
};

const Button: FC<ButtonProps> = ({ children, disabled, handleClick }) => (
  <button className={styles.button} disabled={disabled} onClick={handleClick}>
    {children}
  </button>
);

export default Button;
