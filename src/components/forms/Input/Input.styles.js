export const styles = {
  base: [
    "bg-neutral-white",
    "border-[1.2px]",
    "font-Inter",
    "font-normal",
    "outline-none",
    "placeholder:text-gray-500",
    "rounded-lg",
    "text-base",
    "text-gray-500",
    "w-full",
  ],
  leadingIcon: {
    default: [
      "absolute",
      "flex",
      "top-5",
      "items-center",
      "left-0",
      "pl-3",
      "pointer-events-none",
    ],
    noIcon: ["p-3"],
    withIcon: ["pl-10", "py-3"],
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
