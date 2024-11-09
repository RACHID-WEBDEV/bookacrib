/* eslint-disable react/prop-types */
import classNames from "classnames";
import { styles } from "./Input.styles";
import { Label } from "../Label";
import { showError, showNone, showSuccess } from "src/utils/form-helpers.jsx";
import { useFormContext } from "react-hook-form";
import { FEEDBACK } from "../../../lib/constants";
import { ErrorMessage } from "../ErrorMessage";
import { ErrorIcon, EyeIcon, EyeSlashIcon } from "../../../assets/SvgIcons";
import { useState } from "react";

export const Input = ({
  className,
  feedBack = FEEDBACK.ALL,
  label,
  leadingIcon,
  name,
  placeholder,
  type = "text",
  Icon,
  disabled,
  autoComplete,
}) => {
  const {
    register,
    formState: { dirtyFields, errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const PasswordIcon = showPassword ? (
    <EyeSlashIcon onClick={handleShowPassword} />
  ) : (
    <EyeIcon onClick={handleShowPassword} />
  );
  const isPasswordField = type === "password";
  const inputIcon = isPasswordField ? PasswordIcon : Icon;

  const hasErrors = !!errors?.[name];
  const isValid = !!dirtyFields?.[name] && !hasErrors;

  return (
    <>
      {label && <Label htmlFor={name} text={label} className="mb-1" />}

      <div className={classNames(styles.container)}>
        {leadingIcon && (
          <div className={classNames(styles.leadingIcon.default)}>
            {leadingIcon}
          </div>
        )}
        <input
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
          placeholder={placeholder}
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          disabled={disabled}
          autoComplete={autoComplete}
        />
        {hasErrors && (
          <div
            className={classNames(
              "absolute right-0 pointer-events-none top-5 pr-3"
            )}
          >
            <ErrorIcon />
          </div>
        )}
        {inputIcon && (
          <div
            className={classNames(
              "absolute top-5 right-0 flex items-center cursor-pointer",
              { "pr-3": !isValid && !hasErrors },
              { "pr-3": isValid },
              {
                "pr-9": hasErrors,
              }
            )}
          >
            {inputIcon}
          </div>
        )}
        {showNone(hasErrors, isValid, feedBack) ? (
          ""
        ) : (
          <ErrorMessage name={name} className="pt-1" />
        )}
      </div>
    </>
  );
};
