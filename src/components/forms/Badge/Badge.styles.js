import COLOR from "src/utils/colors";

export const styles = {
  base: [
    "font-Inter",
    "font-medium",
    "inline-flex",
    "items-center",
    "text-xs px-1.5 pr-2 py-0.5 gap-1",
    "border ",
  ],

  disabled: ["cursor-not-allowed", "opacity-50"],
  rounded: ["rounded-full"],

  variant: {
    active: {
      [COLOR.PRIMARY]: ["bg-primary-50 text-primary-700 border-primary-200"],
      [COLOR.PRIMARY_ALT]: [
        "bg-primary-50 text-primary-900 border-primary-400",
      ],
      [COLOR.GRAY]: ["bg-gray-50 text-gray-700 border-gray-200"],

      [COLOR.SUCCESS]: ["bg-success-50 text-success-700 border-success-200"],
      [COLOR.ERROR]: ["bg-error-50 text-error-700 border-error-200"],
      [COLOR.WARNING]: ["bg-warning-50 text-warning-700 border-warning-200"],
      [COLOR.BLUE]: ["bg-blue-50 text-blue-700 border-blue-200"],
    },
  },
};
