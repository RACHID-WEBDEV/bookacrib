import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import PropTypes from "prop-types";

export function ErrorMessage({ className, name }) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {errors?.[name] && (
        <p className={classNames("text-error-500 text-sm", className)}>
          {errors?.[name]?.message}
        </p>
      )}
    </>
  );
}

ErrorMessage.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};
