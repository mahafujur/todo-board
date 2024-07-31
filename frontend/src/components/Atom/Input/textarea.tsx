import clsx from 'clsx';
import React from 'react';

import {__DEV__} from '@/utils/env';
import {StyledInput} from "./input.style";

export interface ITextAreaProps {
    size?: 'sm' | 'md' | 'lg';
    status?: 'error' | 'warning' | 'default';
    hideResize?: boolean;
}

type NativeAttrs = Omit<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    keyof ITextAreaProps
>;

export type TextAreaProps = ITextAreaProps & NativeAttrs;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            id,
            size = 'md',
            status = 'default',
            hideResize = false,
            onChange,
            className,
            ...props
        },
        ref,
    ) => {

        // @ts-ignore
        const sizeClass = StyledInput.internal[size];

        const statusClass = StyledInput.status[status];


        const baseClass = StyledInput['base'];

        return (
            <textarea
                {...props}
                id={id}
                ref={ref}
                onChange={onChange}
                className={clsx(
                    sizeClass,
                    statusClass,
                    baseClass,
                    hideResize && `resize-none`,
                    className,
                )}
            />
        );
    },
);

if (__DEV__) {
    TextArea.displayName = 'TextArea';
}

export default TextArea;
