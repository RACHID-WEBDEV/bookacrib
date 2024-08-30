/* eslint-disable react/prop-types */
import classNames from "classnames";
import { styles } from "./Button.styles";

export const Button = ({
  children,
  className = "",
  color = "primary",
  disabled = false,
  leftIcon,
  onClick = () => {},
  outline,
  rightIcon,
  rounded = false,
  size = "md",
  type = "button",
}) => {
  const outlineClass = outline ? "outline_btn" : "solid_btn";
  return (
    <button
      onClick={onClick}
      className={classNames(
        styles.base,
        styles.variant[outlineClass].active[color],
        styles.size[size],
        disabled ? styles.disabled : styles.variant[outlineClass].hover[color],
        rounded ? "rounded-full" : "rounded-lg",
        className
      )}
      disabled={disabled}
      type={type}
    >
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </button>
  );
};
