import React from 'react';

import { default as InternalInput, InputProps } from './input';
import TextArea, { TextAreaProps } from './textarea';

export type { InputProps, TextAreaProps };

export {TextArea };

interface Input
  extends React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLInputElement>
  > {
  TextArea: typeof TextArea;
}

const Input = InternalInput as Input;

Input.TextArea = TextArea;

export default Input;
