import clsx from 'clsx';
import {useRouter} from 'next/router';
import React, {ButtonHTMLAttributes, JSXElementConstructor, ReactElement} from 'react';
import {Spinner} from "@/components/Atom"; // Type guard to check if a ReactNode is a ReactElement

// Type guard to check if a ReactNode is a ReactElement
function isReactElement(node: React.ReactNode): node is React.ReactElement {
    return React.isValidElement(node);
}

type BorderProperty = 'sm' | 'xs' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    variant: 'blue' | 'green' | 'pink' | 'white';
    size: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
    type: 'primary' | 'outline' | 'text';
    leftIcon?: ReactElement<any, string | JSXElementConstructor<any>>
    rightIcon?: ReactElement<any, string | JSXElementConstructor<any>>
    fullWidth?: boolean;
    className?: string;
    loading?: boolean;
    disabled?: boolean;
    borderRadius?: BorderProperty;
    onClick?: () => void;
    loadingIconClassName?: string;
    fontFamily?: string;
    htmlType?: 'submit' | 'reset' | 'button';
    href?: string;
    rightIconExtraClass?: string;
    leftIconExtraClass?: string;
};

const Button: React.FC<ButtonProps> = ({
                                           variant,
                                           size,
                                           type,
                                           leftIcon,
                                           rightIcon,
                                           children,
                                           fullWidth,
                                           className,
                                           loading = false,
                                           disabled = false,
                                           onClick,
                                           loadingIconClassName,
                                           htmlType,
                                           fontFamily,
                                           href,
                                           rightIconExtraClass,
                                           leftIconExtraClass,
                                           ...props
                                       }) => {
    const router = useRouter();
    const colors = {
        blue: {
            primary:
                'cursor-pointer bg-blue-400 text-white blue_hover_1 disabled:bg-primaryBlueDisabled disabled:cursor-not-allowed',
            outline: 'cursor-pointer text-blue-400 hover:bg-white hover:shadow border border-blue-400',
            text: 'cursor-pointer text-blue-400 hover:underline',
        },
        pink: {
            primary:
                'cursor-pointer bg-pink-600 text-white hover:bg-primaryPinkHover disabled:bg-primaryPinkDisabled',
            outline:
                'cursor-pointer text-pink-600 border border-pink-600 bg-white pink_hover_1',
            text: 'cursor-pointer text-pink-600 hover:underline',
        },
        green: {
            primary:
                'cursor-pointer bg-green-500 text-white hover:bg-green-500 disabled:bg-primaryGreenDisabled',
            outline:
                'cursor-pointer  text-pink-500 border border-white hover:bg-white hover:text-pink-600',
            text: 'cursor-pointer  text-white  hover:text-pink-500',
        },
        white: {
            primary:
                'cursor-pointer bg-white text-blueDark hover:bg-white disabled:bg-primaryBlueDisabled',
            outline:
                'cursor-pointer  text-blue-800 border border-white hover:bg-white hover:text-pink-600',
            text: 'cursor-pointer  text-white  hover:text-pink-600',
        },
    };

    const sizes = {
        extraSmall:
            'h-[24px] py-0.5 text-[12px] font-semibold leading-[220%] rounded-[6px]',
        small:
            'h-[32px] py-0.5 text-[14px] font-semibold leading-[220%] rounded-[6px]',
        medium:
            'h-[32px] md:h-[40px] px-6 py-0.5 text-[16px] font-semibold leading-[160%] rounded-[8px]',
        large:
            'h-[48px] px-6 py-0.5 text-[16px] font-semibold leading-[220%] rounded-[12px]',
        extraLarge:
            'h-[56px] px-6 py-0.5 text-[16px] font-semibold leading-[220%] rounded-[8px]',
    };

    const fontFamilyClass = fontFamily ? `font-${fontFamily}` : 'font-sans';

    const hoverClass = `hover-${variant}-${type}`;

    let buttonClasses = `group flex items-center justify-center ${
        colors[variant][type]
    } ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${
        className ?? ''
    } ${fontFamilyClass} ${hoverClass}`;

    if (loading) {
        buttonClasses += ' button-loading';
    }

    const leftIconClasses = leftIconExtraClass || 'pr-2 my-auto';
    const rightIconClasses = rightIconExtraClass || ' pl-2 my-auto';
    const loadingIconClassNames = `${
        loadingIconClassName ?? ''
    } text-white mr-2 my-auto group-hover:text-white`;
    const handleOnClick = () => {
        if (href && !loading && !disabled) {
            // Check if href st??ts with 'https://' or 'http://'
            if (href.startsWith('https://') || href.startsWith('http://')) {
                window.location.replace(href);
            } else {
                router.push(href);
            }
        }

        if (!loading && !disabled && onClick) {
            onClick();
        }
    };

    return (
        <button
            type={htmlType ?? undefined}
            className={`${buttonClasses}`}
            {...props}
            disabled={disabled || loading}
            onClick={handleOnClick}
        >
            {loading && <Spinner className={loadingIconClassNames}/>}
            {!loading && leftIcon && isReactElement(leftIcon) && (
                <span className={leftIconClasses}>
          {React.cloneElement(leftIcon as any, {
              className: clsx('button-icon', leftIcon?.props?.className),
          })}
        </span>
            )}
            {children}
            {!loading && rightIcon && isReactElement(rightIcon) && (
                <span className={rightIconClasses}>
          {React.cloneElement(rightIcon)}
        </span>
            )}
        </button>
    );
};

export default Button;
