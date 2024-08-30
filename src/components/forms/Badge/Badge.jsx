/* eslint-disable react/prop-types */
import classNames from "classnames";
import { styles } from "./Badge.styles";

export const Badge = ({
  className = "",
  color = "primary",
  disabled = false,
  leftIcon,
  rightIcon,
  closeIcon,
  onClick = () => {},
  rounded,
  text,
}) => {
  return (
    <>
      <span
        className={classNames(
          styles.base,
          styles.variant.active[color],
          disabled && styles.disabled,
          rounded ? styles.rounded : "rounded-md",
          className
        )}
      >
        {leftIcon && leftIcon}
        {text}

        {rightIcon && rightIcon}
        {closeIcon && (
          <span onClick={onClick} className="cursor-pointer">
            {closeIcon}
          </span>
        )}
      </span>
    </>
  );
};
