import clsx from 'clsx';
import React, {PropsWithoutRef, RefAttributes, useCallback, useState,} from 'react';

import {useFormControl} from '@/components/Molecules/Form/form-control-context';
import {__DEV__} from '@/utils/env';


import {StyledInput} from './input.style';
import {InputSize, InputStatus} from './inputTypes';
import Icon from "../../../Icons";

export interface IInputProps<T = HTMLInputElement> {
    size?: InputSize;
    status?: InputStatus;
    disabled?: React.InputHTMLAttributes<T>['disabled'];
    required?: React.InputHTMLAttributes<T>['required'];
    readOnly?: React.InputHTMLAttributes<T>['readOnly'];
    textOnly?: boolean; // New prop to allow text-only input
    isEmail?: boolean;
    isNameInput?: boolean;
    containerClass?: string;
    error?: boolean;
}

type NativeAttrs = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    keyof IInputProps
>;

export type InputProps = IInputProps & NativeAttrs;

const Input: React.ForwardRefExoticComponent<
    PropsWithoutRef<InputProps> & RefAttributes<HTMLInputElement>
> = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            id,
            size = 'md',
            status = 'default',
            className,
            textOnly,
            isEmail,
            onChange,
            isNameInput,
            type,
            containerClass,
            error,
            ...props
        },
        ref,
    ) => {
        const {readOnly, disabled, invalid, ...formControl} =
            useFormControl(props);

        const sizeClass = StyledInput.internal[size];
        const statusClassName = invalid ? 'error' : status;
        const statusClass = StyledInput.status[statusClassName];
        const baseClass = StyledInput['base'];
        const passwordClass = type === 'password' && StyledInput.password;
        const [showPassword, setShowPassword] = useState(false);

        const generateClassNames = clsx(
            baseClass,
            sizeClass,
            statusClass,
            passwordClass,
            className
        );

        const inputType = type ? type : textOnly ? 'text' : 'input';

        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (textOnly) {
                    const valueWithoutNumbers = isNameInput
                        ? e.target.value.replace(/[^A-Za-z\s.]/g, '')
                        : e.target.value.replace(/[^A-Za-z\s]/g, '');
                    e.target.value = valueWithoutNumbers;
                } else if (isEmail) {
                    const email = e.target.value;
                    // Use a regular expression to validate the email format
                    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

                    if (!isValidEmail) {
                        // Invalid email format, you can handle the error or prevent further action
                        return;
                    }
                }

                if (onChange) {
                    onChange(e); // Pass the event to the original onChange prop
                }
            },
            [textOnly, onChange, isEmail,isNameInput],
        );

        return (
            <div className={clsx('relative', containerClass)}>
                <input
                    {...props}
                    id={id || formControl.id}
                    ref={ref}
                    className={generateClassNames}
                    disabled={disabled}
                    aria-disabled={disabled}
                    readOnly={readOnly}
                    aria-readonly={readOnly}
                    type={showPassword ? 'text' : inputType}
                    onChange={!textOnly ? onChange : handleInputChange}
                    onBlur={props.onBlur} // Forward the onBlur prop
                    onKeyUp={props.onKeyUp} // Forward the onKeyUp prop
                />
                {inputType === 'password' && (
                    <button
                        className="cursor-pointer absolute right-2.5 md:right-4 bottom-2.5 md:bottom-4"
                        onClick={() => setShowPassword((prev) => !prev)}
                        type="button"
                    >
                        <Icon
                            name={showPassword ? 'eyeIcon' : 'eyeSlashIcon'}
                            className="w-5 md:w-6 text-gray-500"
                        />
                    </button>
                )}
            </div>
        );
    },
);
if (__DEV__) {
    Input.displayName = 'Input';
}

export default Input;
