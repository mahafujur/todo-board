import clsx from 'clsx';
import React from 'react';

import {__DEV__} from '@/utils/env';

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
            className,
            error,
            ...props
        },
        ref,
    ) => {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const sizeClass = StyledInput.internal[size];
        const statusClassName = error ? 'error' : status;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const statusClass = StyledInput.status[statusClassName];

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const baseClass = StyledInput['base'];

        return (
            <textarea
                {...props}
                id={id}
                ref={ref}
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
