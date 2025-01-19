import Button from "./Button";
import PropTypes from "prop-types";

const ButtonThird = ({
  className = "text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700",
  ...args
}) => {
  return <Button className={`ttnc-ButtonThird ${className}`} {...args} />;
};

ButtonThird.propTypes = {
  className: PropTypes.string,
};
export default ButtonThird;
