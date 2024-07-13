import React from 'react';

import { IconNameProps, IconsMap } from './Icons';

type IconProps = {
  name: IconNameProps;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
  fill?: string;
};

const Icon = ({ name, ...props }: IconProps) => {
  const Icons = IconsMap[name];
  return <Icons {...props} />;
};

export default Icon;
