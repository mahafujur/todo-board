import clsx from 'clsx';
import * as React from 'react';

import { useFormControl } from './form-control-context';

interface IFormHelperTextProps {
  children?: React.ReactNode;
}

export interface FormHelperTextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    IFormHelperTextProps {}

const styleClass = {
  base: `mt-1 leading-none text-xs text-neutral-500`,
};

// eslint-disable-next-line react/display-name
const FormHelperText = React.forwardRef<
  HTMLParagraphElement,
  FormHelperTextProps
>((props, ref) => {
  const { className, id, ...rest } = props;
  const formControl = useFormControl({});

  return (
    <p
      ref={ref}
      className={clsx(styleClass['base'], className)}
      id={id || formControl.helpTextId}
      {...rest}
    />
  );
});

export default FormHelperText;
