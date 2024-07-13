import clsx from 'clsx';
import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx('container mx-auto  max-w-[1200px]', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
