import COLOR from "src/utils/colors.js";
import SIZE from "src/utils/sizes";

export const styles = {
  base: [
    "font-Inter",
    "font-medium",
    "inline-flex",
    "items-center",
    // "rounded-lg",
    "gap-2",
    "shadow",
  ],

  disabled: ["cursor-not-allowed", "opacity-50"],

  size: {
    [SIZE.XS]: ["px-3", "py-2", "text-xs"],
    [SIZE.SM]: ["px-3", "py-2", "text-sm"],
    [SIZE.MD]: ["px-5", "py-2.5", "text-sm"],
    [SIZE.LG]: ["px-5", "py-[14px]", "text-base"],
    [SIZE.XL]: ["px-7", "py-[18px]", "text-base"],
  },

  variant: {
    solid_btn: {
      active: {
        [COLOR.PRIMARY]: [
          "border-transparent",
          "bg-primary-800",
          "text-neutral-white",
        ],
        [COLOR.PRIMARY_ALT]: [
          "border-transparent",
          "bg-primary-50",
          "text-primary-600",
        ],
        [COLOR.GRAY]: [
          "border-transparent",
          "bg-gray-700",
          "text-neutral-white",
        ],

        [COLOR.SUCCESS]: [
          "border-transparent",
          "bg-success-600",
          "text-neutral-white",
        ],
        [COLOR.ERROR]: [
          "border-transparent",
          "bg-error-600",
          "text-neutral-white",
        ],
        [COLOR.WARNING]: [
          "border-transparent",
          "bg-warning-600",
          "text-neutral-white",
        ],
      },
      hover: {
        [COLOR.PRIMARY]: ["hover:bg-primary-900"],
        [COLOR.PRIMARY_ALT]: [
          "hover:bg-primary-600",
          "hover:text-neutral-white",
        ],
        [COLOR.GRAY]: ["hover:bg-gray-900"],
        [COLOR.SUCCESS]: ["hover:bg-success-800"],
        [COLOR.ERROR]: ["hover:bg-error-800"],
        [COLOR.WARNING]: ["hover:bg-warning-800", "text-neutral-white"],
      },
    },
    outline_btn: {
      active: {
        [COLOR.PRIMARY]: [
          "text-primary-600",
          "bg-neutral-white",
          "border-[1.5px]",
          "border-primary-600",
        ],
        [COLOR.PRIMARY_ALT]: [
          "bg-neutral-white",
          "border-[1.5px]",
          "border-gray-300",
          "text-gray-700",
        ],
        [COLOR.GRAY]: [
          "text-gray-600",
          "bg-neutral-white",
          "border-[1.5px]",
          "border-gray-300",
        ],

        [COLOR.SUCCESS]: [
          "text-success-600",
          "bg-neutral-white",
          "border-[1.5px]",
          "border-success-600",
        ],
        [COLOR.ERROR]: [
          "text-error-600",
          "bg-neutral-white",
          "border-[1.5px]",
          "border-error-600",
        ],
        [COLOR.WARNING]: [
          "text-warning-600",
          "bg-neutral-white",
          "border-[1.5px]",
          "border-warning-600",
        ],
      },
      hover: {
        [COLOR.PRIMARY]: ["hover:bg-primary-800", "hover:text-neutral-white"],
        [COLOR.PRIMARY_ALT]: [
          "hover:bg-primary-600",
          "hover:text-neutral-white",
        ],
        [COLOR.GRAY]: ["hover:bg-gray-800", "hover:text-neutral-white"],
        [COLOR.SUCCESS]: ["hover:bg-success-800", "hover:text-neutral-white"],
        [COLOR.ERROR]: ["hover:bg-error-800", "hover:text-neutral-white"],
        [COLOR.WARNING]: ["hover:bg-warning-800", "hover:text-neutral-white"],
      },
    },
  },
};
