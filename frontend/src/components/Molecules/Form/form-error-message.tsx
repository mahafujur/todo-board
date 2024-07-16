import clsx from 'clsx';
import * as React from 'react';

import { useFormControl } from '@/components/Molecules/Form/form-control-context';

interface IFormErrorMessageProps {
  children?: React.ReactNode;
}

export interface FormErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    IFormErrorMessageProps {}

const baseClass = 'mt-3 leading-none  text-base flex items-center text-error400';

// eslint-disable-next-line react/display-name
const FormErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  FormErrorMessageProps
>((props, ref) => {
  const { className, id, ...rest } = props;
  const formControl = useFormControl({});

  return (
    <div
      ref={ref}
      className={clsx(baseClass, className)}
      id={id || formControl.errorId}
      {...rest}
    />
  );
});

export default FormErrorMessage;
