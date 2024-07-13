import clsx from 'clsx';
import React from 'react';

import { useFormControl } from '@/components/Molecules/Form/form-control-context';

interface IFormLabelProps {
  disabled?: boolean;
  children?: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}

export interface FormLabelProps
  extends React.HTMLAttributes<HTMLLabelElement>,
    IFormLabelProps {}

const baseClass = `block text-base leading-[160%] font-bangla font-medium text-left mb-[10px] text-accent500`;

// eslint-disable-next-line react/display-name
const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, className, htmlFor, id, ...rest }, ref) => {
    const formControl = useFormControl(rest);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const disabledClass = formControl?.disabled ? 'opacity-60' : '';

    const classes = clsx(baseClass, disabledClass, className);
    return (
      <label
        ref={ref}
        className={classes}
        htmlFor={htmlFor || formControl.id}
        id={id || formControl.labelId}
        {...rest}
      >
        {children}
        <span
          className={formControl?.required ? 'ml-1 text-error500' : 'invisible'}
        >
          *
        </span>
      </label>
    );
  },
);

export default FormLabel;
