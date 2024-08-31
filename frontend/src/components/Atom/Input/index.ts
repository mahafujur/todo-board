import React from 'react';

import {default as InternalInput, InputProps} from './input';
import TextArea, {TextAreaProps} from './textarea';
import EditableInput from "@/components/Atom/Input/editableInput.tsx";

export type {InputProps, TextAreaProps};

export {TextArea};
export {EditableInput}
interface Input
    extends React.ForwardRefExoticComponent<
        InputProps & React.RefAttributes<HTMLInputElement>
    > {
    TextArea: typeof TextArea;
}

const Input = InternalInput as Input;

Input.TextArea = TextArea;

export default Input;
