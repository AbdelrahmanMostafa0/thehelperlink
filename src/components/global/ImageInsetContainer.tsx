import React, { ReactNode } from 'react';
import Image from 'next/image';

interface IProps {
  children?: ReactNode;
  image: string;
  fill?: boolean;
  className?: string;
  imageClassName?: string;
  position?: string;
  defaultBorder?: boolean;
  size?: number;
}

const ImageInsetContainer: React.FC<IProps> = ({
  image,
  fill = true,
  children,
  className = '',
  position = 'relative',
  defaultBorder = true,
  size = 62,
}) => {
  return (
    <div
      className={`w-[135px] h-[135px] rounded-full p-3 border ${
        defaultBorder ? 'border-lightGreen-500' : ''
      } ${position} ${className}`}>
      <div
        className={`w-full h-full flex items-center justify-center shadow-custom-inset-shadow rounded-full bg-lightGreen-200 overflow-hidden relative ${
          fill
            ? 'after:absolute after:top-0 after:w-full after:h-full after:shadow-custom-inset-shadow after:rounded-full'
            : ''
        }`}>
        <Image
          src={image}
          alt="image"
          className="object-cover object-center relative"
          width={fill ? undefined : size}
          height={fill ? undefined : size}
          fill={fill}
        />
      </div>
      {children}
    </div>
  );
};

export default ImageInsetContainer;
