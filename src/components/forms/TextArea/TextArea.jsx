/* eslint-disable react/prop-types */
import classNames from "classnames";

import { styles } from "./TextArea.styles";

import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { showError, showSuccess, showNone } from "utils/form-helpers";
import { FEEDBACK } from "utils/constant";
import { Label } from "../Label";

export const TextArea = ({
  className,
  feedBack = FEEDBACK.ALL,
  label,
  leadingIcon,
  name,
  placholder,
  rows = 4,
}) => {
  const {
    register,
    formState: { dirtyFields, errors },
  } = useFormContext();

  const hasErrors = !!errors?.[name];
  const isValid = !!dirtyFields?.[name] && !hasErrors;

  return (
    <div className={classNames(styles.container)}>
      {label && <Label htmlFor={name} text={label} className="mb-1" />}
      <div className={classNames(styles.container)}>
        {leadingIcon && (
          <div className={classNames(styles.leadingIcon.default)}>
            {leadingIcon}
          </div>
        )}
        <textarea
          className={classNames(
            styles.base,
            leadingIcon
              ? styles.leadingIcon.withIcon
              : styles.leadingIcon.noIcon,
            className,
            !hasErrors && styles.border.default,
            {
              [styles.border.errors.join(" ")]: showError(hasErrors, feedBack),
            },
            {
              [styles.border.success.join(" ")]: showSuccess(isValid, feedBack),
            }
          )}
          id={name}
          {...register(name)}
          placeholder={placholder}
          rows={rows}
        />
        {showNone(hasErrors, isValid, feedBack) ? (
          ""
        ) : (
          <ErrorMessage name={name} />
        )}
      </div>
    </div>
  );
};
