import cn from "classnames";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import PropTypes from "prop-types";

export default function Scrollbar({
  options,
  style,
  className,
  autoHide = "scroll",
  children,
  ...props
}) {
  return (
    <OverlayScrollbarsComponent
      options={{
        className: cn("os-theme-thin", className),
        scrollbars: {
          autoHide: autoHide,
        },
        ...options,
      }}
      style={style}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}

Scrollbar.propTypes = {
  options: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  autoHide: PropTypes.oneOf(["never", "scroll", "leave", "move"]),
  children: PropTypes.node,
};
