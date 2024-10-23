// react
import { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';

// next js
import { useRouter } from 'next/router';

// tailwind merge in order to merge added classes
import { twMerge } from 'tailwind-merge';

// i18next
import { useTranslation } from 'next-i18next';
import Typography from './Typography';

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>,
    HTMLInputElement & HTMLTextAreaElement
  > {
  variant?: 'default' | 'bordered' | 'underline';
  label?: ReactNode;
  multiLine?: boolean;
  rows?: number;
  errorText?: string;
  error?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

// @ts-ignore
const TextField: React.FC<IProps> = forwardRef((props, ref) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const startIconRef = useRef<HTMLSpanElement>(null);
  const endIconRef = useRef<HTMLSpanElement>(null);
  const [paddingLeft, setPaddingLeft] = useState<number>(10);
  const [paddingRight, setPaddingRight] = useState<number>(10);
  const isArabic = router.locale === 'ar-SA';

  const {
    children,
    variant = 'default',
    label,
    className = '',
    multiLine = false,
    rows = 1,
    errorText,
    error,
    startIcon,
    endIcon,
    ...rest
  } = props;

  const attr = () => {
    switch (variant) {
      case 'default':
        return 'border-0';
      case 'bordered':
        return 'rounded-[4px] px-2 border-darkBlue-100 focus:border-darkBlue-100';
      case 'underline':
        return 'border-t-0 border-l-0 border-r-0 border-darkBlue-100 focus:border-darkBlue-100 rounded-none';
      default:
        return 'border-0';
    }
  };

  useEffect(() => {
    if (!isArabic) {
      if (startIconRef.current && startIcon) {
        setPaddingLeft(startIconRef.current.offsetWidth + 10);
      }
      if (endIconRef.current && endIcon) {
        setPaddingRight(endIconRef.current.offsetWidth + 10);
      }
    } else {
      if (startIconRef.current && startIcon) {
        setPaddingRight(startIconRef.current.offsetWidth + 10);
      }
      if (endIconRef.current && endIcon) {
        setPaddingLeft(endIconRef.current.offsetWidth + 10);
      }
    }
  }, [startIconRef.current, endIconRef.current, isArabic]);

  return (
    <div className="flex-1 w-full flex flex-col items-start gap-3">
      {label && label}
      {multiLine ? (
        <textarea
          rows={rows}
          ref={ref}
          type="text"
          className={twMerge(
            `w-full bg-inherit px-0 focus:ring-0 ring-0 outline-none font-book placeholder:font-book placeholder:text-darkBlue-200 ${attr()}`,
            className
          )}
          {...rest}></textarea>
      ) : (
        <span className="relative w-full">
          {startIcon && (
            <span
              ref={startIconRef}
              className="absolute ltr:left-2 ltr:right-unset rtl:right-2 rtl:left-unset top-1/2 -translate-y-1/2">
              {startIcon}
            </span>
          )}
          {endIcon && (
            <span
              ref={endIconRef}
              className="absolute ltr:right-2 ltr:left-unset rtl:left-2 rtl:right-unset top-1/2 -translate-y-1/2">
              {endIcon}
            </span>
          )}
          <input
            ref={ref}
            type="text"
            className={twMerge(
              `w-full bg-inherit focus:ring-0 ring-0 outline-none font-book placeholder:font-book placeholder:text-darkBlue-200 ${attr()}`,
              className
            )}
            {...rest}
            style={{ paddingLeft, paddingRight }}
          />
        </span>
      )}
      {error && (
        <Typography variant="caption" className="text-darkOrange-500 ltr:text-left rtl:text-right">
          {t(errorText || '')}
        </Typography>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;
