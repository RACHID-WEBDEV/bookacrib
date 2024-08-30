import classNames from "classnames";
import { styles } from "./Label.styles";
import PropTypes from "prop-types";

export const Label = ({ className, htmlFor, inActive, text }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        styles.base,
        inActive ? styles.inActiveClass : "",
        className
      )}
    >
      {text}
    </label>
  );
};

Label.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  inActive: PropTypes.bool,
  text: PropTypes.string,
};
