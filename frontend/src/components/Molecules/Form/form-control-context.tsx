import { createCtx } from '@/utils/create-ctx';

export interface UseFormControlProps {
  /** If `true`, this prop is passed to its children. */
  required?: boolean;
  /** If `true`, this prop is passed to its children. */
  disabled?: boolean;
  /** If `true`, this prop is passed to its children. */
  invalid?: boolean;
  /** If `true`, this prop is passed to its children. */
  readOnly?: boolean;
  /** The `id` to use for the Form control. */
  id?: string;
  /** The label to use for the Form control. */
  label?: string;
  /** The error messages to use for the Form control. */
  errors?: string[];
}

interface UseFormControlData extends UseFormControlProps {
  labelId?: string;
  errorId?: string;
  helpTextId?: string;
}

type FormControlContextType = UseFormControlProps;

const [FormControlProvider, useFormControlContext] = createCtx<
  FormControlContextType | undefined
>({
  name: 'FormControlContext',
  strict: false,
});

export { FormControlProvider, useFormControlContext };

export const useFormControl = (
  props: UseFormControlProps,
): UseFormControlData => {
  const context = useFormControlContext();
  if (!context) {
    return props;
  }
  const keys = Object.keys(context);
  return keys.reduce((acc, prop) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    acc[prop] = props[prop];
    if (context) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (props[prop] == null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc[prop] = context[prop];
      }
    }

    return acc;
  }, {});
};
