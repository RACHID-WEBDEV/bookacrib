export const styles = {
  base: [
    "bg-neutral-white",
    "border",
    "font-Inter",
    "font-normal",
    "outline-none",
    "placeholder:text-gray-500",
    "rounded",
    "text-base",
    "text-gray-500",
    "w-full",
  ],
  leadingIcon: {
    default: [
      "absolute",
      "flex",
      "inset-y-0",
      "items-center",
      "left-0",
      "pl-3",
      "pointer-events-none",
    ],
    noIcon: ["p-3"],
    withIcon: ["lg:py-5", "pl-10", "py-3.5"],
  },
  container: ["mb-4", "relative"],
  border: {
    default: ["border-gray-300", "focus:border-gray-400"],
    errors: [
      "border-error-400",
      "focus:border-error-500",
      "focus:ring-error-200",
    ],
    success: [
      "border-success-300 shadow-input",
      "focus:border-success-400",
      "focus:ring-success-200",
    ],
  },
};
