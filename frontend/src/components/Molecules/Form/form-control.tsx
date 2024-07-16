import clsx from 'clsx';
import React, { useId } from 'react';

import { FormErrorMessage, FormLabel } from '@/components/Molecules/Form';

import {
  FormControlProvider,
  UseFormControlProps,
} from './form-control-context';

interface IFormControlProps extends UseFormControlProps {
  children?: React.ReactNode;
  htmlFor?: string;
}

export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    IFormControlProps {}

const baseClass = `w-full relative `;

// eslint-disable-next-line react/display-name
const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  (
    {
      children,
      className,
      errors,
      required,
      disabled,
      invalid = errors && errors.length > 0,
      readOnly,
      id: idProp,
      label,
      htmlFor,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp || `field-${autoId}`;

    const labelId = `${id}-label`;
    const errorId = `${id}-error`;
    const helpTextId = `${id}-helptext`;

    const context = {
      required,
      disabled,
      invalid,
      readOnly,
      id,
      labelId,
      errorId,
      helpTextId,
      label,
      htmlFor,
    };

    return (
      <FormControlProvider value={context}>
        <div
          role="group"
          ref={ref}
          className={clsx(baseClass, className)}
          {...rest}
        >
          {label && <FormLabel htmlFor={htmlFor}>{label}</FormLabel>}
          {children}
          {errors ?
            errors.map((err, key) => (
              <FormErrorMessage key={key}>{err}</FormErrorMessage>
            )) : <span className={'mt-3'}/>}
        </div>
      </FormControlProvider>
    );
  },
);

export default FormControl;
