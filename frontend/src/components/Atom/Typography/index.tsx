import clsx from 'clsx';
import React from 'react';

import { TypographyOwnProps, VariantMappingType } from './types';

const variantObjectWeb: Record<number, string> = {
  64: ' md:text-[64px] ', // space after ' is intentional
  56: ' md:text-[56px]  ',
  48: ' md:text-[48px]  ',
  40: ' md:text-[40px] ',
  32: ' md:text-[32px] ',
  24: ' md:text-[24px] ',
  20: ' md:text-[20px] ',
  18: ' md:text-[18px] ',
  16: ' md:text-[16px] ',
  14: ' md:text-[14px] ',
  12: ' md:text-[12px] ',
};
const variantObjectMobile: Record<number, string> = {
  40: ' text-[40px] ',
  36: ' text-[36px] ',
  32: ' text-[32px] ',
  28: ' text-[28px] ',
  24: ' text-[24px] ',
  20: ' text-[20px] ',
  18: ' text-[18px] ',
  16: ' text-[16px] ',
  14: ' text-[14px] ',
  12: ' text-[12px] ',
  10: ' text-[10px] ',
  8: ' text-[8px] ',
};

const getFontWeightWeb: Record<string, string> = {
  Bold: ' md:font-bold', // space after ' is intentional
  Semibold: ' md:font-semibold',
  Medium: ' md:font-medium',
  Regular: ' md:font-normal',
};

const getFontWeightMobile: Record<string, string> = {
  Bold: ' font-bold', // space after ' is intentional
  Semibold: ' font-semibold',
  Medium: ' font-medium',
  Regular: ' font-normal',
};

const Typography: React.FC<TypographyOwnProps> = ({
  tag,
  variant,
  color = 'gray900',
  underline = false,
  className,
  ellipse = false,
  children,
  fontFamily,
  textAlign,
  style,
}) => {
  const htmlElementType: VariantMappingType = tag;

  const getClassNames = () => {
    const { web, mobile } = variant;
    let webClasses = '';
    let mobileClasses = '';

    if (web) {
      // Extract fontSize and fontWeight from web variant
      const [, fontSize, fontWeight] = web.split('-');
      const variantValueWeb = variantObjectWeb[Number(fontSize)];
      webClasses = clsx(` ${getFontWeightWeb[fontWeight]} ${variantValueWeb} `);
    }

    if (mobile) {
      // Extract fontSizeMobile and fontWeightMobile from mobile variant
      const [, fontSizeMobile, fontWeightMobile] = mobile.split('-');
      const variantValueMobile = variantObjectMobile[Number(fontSizeMobile)];
      mobileClasses = clsx(
        ` ${getFontWeightMobile[fontWeightMobile]} ${variantValueMobile}`,
      );
    }

    if (mobileClasses && webClasses) {
      return {
        className: clsx(` ${mobileClasses} ${webClasses}`),
      };
    }

    if (mobileClasses && !webClasses) {
      return {
        className: ` ${mobileClasses}`,
      };
    }

    if (!mobileClasses && webClasses) {
      return {
        className: ` ${webClasses}`,
      };
    }
  };

  const getClassName = () => {
    const groupClasses = getClassNames();
    return groupClasses?.className || '';
  };

  const typographyClassName = clsx(
    className,
    color,
    underline && 'underline',
    ellipse && 'text-ellipsis whitespace-nowrap overflow-hidden',
    'leading-[150%]',
    textAlign ? `text-${textAlign}` : '',
    getClassName(),
  );

  return React.createElement(
    htmlElementType || 'span',
    {
      className: typographyClassName,
      style,
    },
    children,
  );
};

export default Typography;
