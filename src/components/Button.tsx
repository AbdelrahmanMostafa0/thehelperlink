// react
import React, { useMemo } from 'react';

// next js
import { useRouter } from 'next/router';

// utils
import { strokeColor } from '@src/utils/colorUtils';

// tailwind merge in order to merge added classes
import { twMerge } from 'tailwind-merge';

// icons
import { ArrowRight } from '@src/assets/icons';

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'bordered' | 'contained';
  color?: 'green' | 'orange' | 'blue';
  loadMoreButton?: boolean;
  back?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<IProps> = (props) => {
  const router = useRouter();
  const {
    children,
    variant = 'contained',
    color = 'orange',
    loadMoreButton = false,
    back = false,
    isLoading,
    className = '',
    disabled,
    ...rest
  } = props;

  const defaultColor = useMemo(() => {
    switch (color) {
      case 'orange':
        return variant === 'bordered'
          ? 'border-darkOrange-500 bg-darkOrange-100'
          : 'bg-darkOrange-100';
      case 'green':
        return variant === 'bordered'
          ? 'border-lightGreen-500 bg-lightGreen-100'
          : 'bg-lightGreen-100';
      case 'blue':
        return variant === 'bordered'
          ? 'border-lightBlue-500 bg-lightBlue-100'
          : 'bg-lightBlue-100';
      default:
        return variant === 'bordered'
          ? 'border-darkOrange-500 bg-darkOrange-100'
          : 'bg-darkOrange-100';
    }
  }, [color, variant]);

  const attr = () => {
    switch (variant) {
      case 'bordered':
        return `rounded-[5px] px-[30px] py-[10px] border`;
      case 'contained':
        return `rounded-[5px] px-[30px] py-[10px] border-none`;
      default:
        return `rounded-[5px] px-[30px] py-[10px] border-none`;
    }
  };

  return (
    <button
      className={twMerge(
        `flex items-center justify-center disabled:bg-darkBlue-100 disabled:border-darkBlue-200 ${
          !disabled
            ? loadMoreButton
              ? 'group transition-all duration-200 ease-in shadow-none hover:shadow-custom-shadow'
              : ''
            : ''
        } ${defaultColor} ${attr()}`,
        className
      )}
      disabled={disabled}
      {...rest}>
      {isLoading || disabled
        ? null
        : loadMoreButton && (
            <ArrowRight
              className={`${strokeColor(color)} ${
                back
                  ? '[&>path]:translate-x-0  ltr:first:group-hover:[&>path]:translate-x-[-2px] rtl:first:group-hover:[&>path]:translate-x-[2px] ltr:group-hover:[&>path]:-translate-x-1 rtl:group-hover:[&>path]:translate-x-1 [&_path]:origin-center ltr:[&_path]:rotate-180 rtl:[&_path]:rotate-0 first:[&_path]:rotate-0'
                  : '[&>path]:translate-x-0 ltr:first:group-hover:[&>path]:translate-x-[2px] rtl:first:group-hover:[&>path]:-translate-x-[2px]  ltr:group-hover:[&>path]:translate-x-1 rtl:group-hover:[&>path]:-translate-x-1 [&_path]:origin-center rtl:[&_path]:rotate-180 ltr:[&_path]:rotate-0'
              } ltr:mr-2 rtl:ml-2 overflow-visible w-[24px] h-[24px] [&>path]:ease-in [&>path]:duration-200 [&>path]:transition-all`}
            />
          )}
      {children}
    </button>
  );
};

export default Button;
