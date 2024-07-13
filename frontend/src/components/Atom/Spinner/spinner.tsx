import clsx from "clsx";
import React from "react";
import { __DEV__ } from "@/utils/env";

const spinnerClass = {
  base: `animate-spin`,
  size: {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  },
};

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ISpinnerProps {
  size?: SpinnerSize;
}

type NativeAttrs = Omit<
  React.HTMLAttributes<SVGSVGElement>,
  keyof ISpinnerProps
>;

export type SpinnerProps = ISpinnerProps & NativeAttrs;

// eslint-disable-next-line react/display-name
const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>((props, ref) => {
  const { size = "sm", className, ...rest } = props;

  const spinnerClasses = clsx(
    spinnerClass.base,
    spinnerClass.size[size],
    className
  );

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={spinnerClasses}
      fill="none"
      viewBox="0 0 66 66"
      {...rest}
    >
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke="currentColor"
        strokeWidth="10"
        className={`opacity-30`}
      />
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke="currentColor"
        strokeDasharray="40, 134"
        strokeDashoffset="325"
        strokeLinecap="round"
        strokeWidth="10"
        className={`opacity-70`}
      />
    </svg>
  );
});
if (__DEV__) {
  Spinner.displayName = "Spinner";
}
export default Spinner;
