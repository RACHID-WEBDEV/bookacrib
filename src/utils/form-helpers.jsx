import { FEEDBACK } from "../lib/constants";

export const showError = (hasErrors, feedBack) =>
  hasErrors && (feedBack === FEEDBACK.ALL || feedBack === FEEDBACK.ERROR);

export const showSuccess = (isValid, feedBack) =>
  isValid && (feedBack === FEEDBACK.ALL || feedBack === FEEDBACK.SUCCESS);

export const showNone = (hasErrors, isValid, feedBack) =>
  (isValid || hasErrors) && feedBack === FEEDBACK.NONE;
