import React from 'react';


export type TypographyVariant =
  | 'Title-64-Regular'
  | 'Title-64-Medium'
  | 'Title-64-Semibold'
  | 'Title-64-Bold'
  | 'Title-56-Regular'
  | 'Title-56-Medium'
  | 'Title-56-Semibold'
  | 'Title-56-Bold'
  | 'Title-48-Regular'
  | 'Title-48-Medium'
  | 'Title-48-Semibold'
  | 'Title-48-Bold'
  | 'Title-40-Regular'
  | 'Title-40-Medium'
  | 'Title-40-Semibold'
  | 'Title-40-Bold'
  | 'Title-36-Regular'
  | 'Title-36-Medium'
  | 'Title-36-Semibold'
  | 'Title-36-Bold'
  | 'Title-32-Regular'
  | 'Title-32-Medium'
  | 'Title-32-Semibold'
  | 'Title-32-Bold'
  | 'Title-28-Regular'
  | 'Title-28-Medium'
  | 'Title-28-Semibold'
  | 'Title-28-Bold'
  | 'Title-24-Regular'
  | 'Title-24-Medium'
  | 'Title-24-Semibold'
  | 'Title-24-Bold'
  | 'Title-20-Regular'
  | 'Title-20-Medium'
  | 'Title-20-Semibold'
  | 'Title-20-Bold'
  | 'Title-18-Regular'
  | 'Title-18-Medium'
  | 'Title-18-Semibold'
  | 'Title-18-Bold'
  | 'Title-16-Regular'
  | 'Title-16-Medium'
  | 'Title-16-Semibold'
  | 'Title-16-Bold'
  | 'Title-14-Regular'
  | 'Title-14-Medium'
  | 'Title-14-Semibold'
  | 'Title-14-Bold'
  | 'Body-24-Regular'
  | 'Body-24-Medium'
  | 'Body-24-Semibold'
  | 'Body-24-Bold'
  | 'Body-20-Regular'
  | 'Body-20-Medium'
  | 'Body-20-Semibold'
  | 'Body-20-Bold'
  | 'Body-18-Regular'
  | 'Body-18-Medium'
  | 'Body-18-Semibold'
  | 'Body-18-Bold'
  | 'Body-16-Regular'
  | 'Body-16-Medium'
  | 'Body-16-Semibold'
  | 'Body-16-Bold'
  | 'Body-14-Regular'
  | 'Body-14-Medium'
  | 'Body-14-Semibold'
  | 'Body-14-Bold'
  | 'Body-12-Regular'
  | 'Body-12-Medium'
  | 'Body-12-Semibold'
  | 'Body-12-Bold'
  | 'Body-10-Regular'
  | 'Body-10-Medium'
  | 'Body-10-Semibold'
  | 'Body-10-Bold'
  | 'Body-8-Regular'
  | 'Body-8-Medium'
  | 'Body-8-Semibold'
  | 'Body-8-Bold';

export type VariantMappingType =
  | 'div'
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'a'
  | 'label';

export interface TypographyOwnProps extends React.HTMLAttributes<HTMLElement> {
  tag: VariantMappingType;
  variant: {
    web: TypographyVariant;
    mobile: TypographyVariant;
  };
  // color?: ShikhoThemeColor;
  underline?: boolean;
  ellipse?: boolean;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
  fontFamily?: 'bangla' | 'english';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
