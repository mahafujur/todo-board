import clsx from 'clsx';
import React from 'react';

const baseClass = `block text-base leading-[160%]  font-medium text-left mb-[10px] text-accent-500`;

interface IFormLabelProps {
  disabled?: boolean;
  text?: React.ReactNode;
  htmlFor?: string;
  required: boolean;
  hide?: boolean;
}

export interface LabelProps
  extends React.HTMLAttributes<HTMLLabelElement>,
    IFormLabelProps {}

// eslint-disable-next-line react/display-name
const FormTitle = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    { children, text, className, required, htmlFor, hide, disabled, ...rest },
    ref,
  ) => {
    // Add ref parameter here
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const disabledClass = disabled ? 'opacity-60' : '';

    const classes = clsx(baseClass, disabledClass);
    return (
      <div role="group" className={clsx(hide ? `hidden` : 'block', className)}>
        <label ref={ref} className={classes} htmlFor={htmlFor} {...rest}>
          {text}
          <span className={required ? 'ml-1 text-error500' : 'invisible'}>
            *
          </span>
        </label>
        {children}
      </div>
    );
  },
);

export default FormTitle;
