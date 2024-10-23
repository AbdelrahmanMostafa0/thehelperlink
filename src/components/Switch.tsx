// react
import { forwardRef } from 'react';

// next js
import { useRouter } from 'next/router';

// tailwind merge in order to merge added classes
import { twMerge } from 'tailwind-merge';

interface IProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  labelClassName?: string;
}

// @ts-ignore
const Switch: React.FC<IProps> = forwardRef((props, ref) => {
  const router = useRouter();
  const { children, labelClassName = '', className = '', ...rest } = props;

  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" {...rest} />
      <div
        className={twMerge(
          `w-11 h-6 bg-inherit peer-focus:outline-none peer-focus:ring-0 peer-checked:border-0 border border-darkBlue-200 rounded-full peer ltr:peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-0 after:content-[''] after:absolute after:top-[2px] ltr:after:left-[2px] ltr:after:right-unset rtl:after:right-[2px] rtl:after:left-unset after:bg-lightGreen-500 after:border-0 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-darkBlue-100`,
          className
        )}></div>
      <span className={twMerge(`ltr:ml-3 rtl:mr-3 text-sm font-book text-black`, labelClassName)}>
        {children}
      </span>
    </label>
  );
});

Switch.displayName = 'Switch';

export default Switch;
