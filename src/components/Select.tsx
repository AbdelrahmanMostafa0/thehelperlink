// react
import { ReactNode, forwardRef } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// tailwind merge in order to merge added classes
import { twMerge } from 'tailwind-merge';

// components
import Typography from './Typography';

interface IProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: { name: string; value: string }[];
  label?: ReactNode;
  errorText?: string;
  error?: boolean;
  variant?: 'bordered' | 'underline';
}

// @ts-ignore
const Select: React.FC<IProps> = forwardRef((props, ref) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const {
    children,
    className = '',
    label,
    options,
    errorText,
    error,
    variant = 'bordered',
    ...rest
  } = props;

  return (
    <div className="flex-1 w-full flex items-start flex-col gap-3">
      {label && label}
      <select
        ref={ref}
        {...rest}
        className={twMerge(
          `bg-inherit border-darkBlue-100 text-darkBlue-100 focus:ring-0 focus:border-darkBlue-100 block w-full ${
            variant === 'bordered'
              ? 'border rounded-[4px]'
              : 'border-b border-x-0 border-t-0 rounded-none'
          }`,
          className
        )}>
        {options.map((opt, index) => (
          <option key={index} value={opt.value} className="text-inherit">
            {opt.name}
          </option>
        ))}
      </select>
      {error && (
        <Typography variant="caption" className="text-darkOrange-500 ltr:text-left rtl:text-right">
          {t(errorText || '')}
        </Typography>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
