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
// <a

//   href=""
//   className="group overflow-hidden flex justify-center items-center relative text-sm border border-purple/10 rounded-md py-1.5 before:inline-block before:absolute before:z-0 before:w-full before:h-full before:bg-primary-800 before:scale-x-0 group hover:before:scale-x-100 before:origin-right hover:before:origin-left before:transition-transform before:ease-out before:duration-300"
// >
//   <span className="px-[18px] relative z-20 transition-colors ease-in-out duration-300 capitalize group-hover:text-white">
//     Button
//   </span>
// </a>
