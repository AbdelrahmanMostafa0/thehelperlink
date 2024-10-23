// next js
import { useRouter } from 'next/router';

// tailwind merge in order to merge added classes
import { twMerge } from 'tailwind-merge';

interface IProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelClassName?: string;
  errorText?: string;
  error?: boolean;
  id: string;
}

const Checkbox: React.FC<IProps> = (props) => {
  const router = useRouter();
  const {
    children,
    labelClassName = '',
    className,
    checked,
    errorText,
    error,
    id,
    ...rest
  } = props;

  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        className={twMerge(
          `w-4 h-4 text-lightGreen-500 bg-inherit rounded-sm border border-darkBlue-100 focus:outline-0 outline-0 ring-0 focus:ring-0 focus:ring-offset-0 cursor-pointer`,
          className
        )}
        {...rest}
      />
      <label
        htmlFor={id}
        className={twMerge(
          `ltr:ml-4 rtl:mr-4 text-sm font-book text-darkBlue-500 cursor-pointer`,
          labelClassName
        )}>
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
