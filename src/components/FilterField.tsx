// react
import React from 'react';

// nextjs
import { useRouter } from 'next/router';

// icons
import { Cancel, Search } from '@src/assets/icons';

// next-usequerystate
import { useQueryState } from 'next-usequerystate';

// i18n-next
import { useTranslation } from 'next-i18next';

// components
import TextField from '@src/components/TextField';

interface IProps {
  name: string;
  submitBehavior?: 'sync' | 'async';
  label?: string;
  value: string;
  setValue: any;
  regex?: RegExp;
  className?: string;
  hideIcon?: boolean;
}
const FilterField: React.FC<IProps> = ({
  name,
  submitBehavior = 'async',
  label,
  value,
  setValue,
  regex,
  className,
  hideIcon,
}) => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;
  const [nameQuery, setNameQuery] = useQueryState(name);

  // handle delay  when user stops typing
  const [typingTimer, setTypingTimer] = React.useState<any>(undefined); //timer identifier
  const doneTypingInterval = 1500;

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    if (regex) {
      if (e.target.value.match(regex)) {
        setValue(e.target.value);
        const doneTyping = async () => {
          if (submitBehavior === 'sync')
            await setNameQuery(e.target.value, { scroll: false, shallow: true });
        };
        clearTimeout(typingTimer);
        if (e.target.value) {
          const timer = setTimeout(doneTyping, doneTypingInterval);
          setTypingTimer(timer);
        }
      }
    } else {
      setValue(e.target.value);
      const doneTyping = async () => {
        if (submitBehavior === 'sync')
          await setNameQuery(e.target.value, { scroll: false, shallow: true });
      };
      clearTimeout(typingTimer);
      if (e.target.value) {
        const timer = setTimeout(doneTyping, doneTypingInterval);
        setTypingTimer(timer);
      }
    }
  };

  return (
    <div
      className={`flex items-center gap-2 flex-1 w-full rounded-[4px] px-2 border-darkBlue-100 focus:border-darkBlue-100 bg-white border ltr:pl-4 md:ltr:pl-2 rtl:pr-4 md:rtl:pr-2 py-[1.5px] self-center min-w-[220px] ${className}`}>
      {nameQuery ? (
        <span
          className="p-1 cursor-pointer"
          onClick={async () => {
            await setNameQuery(null, { scroll: false, shallow: true });
            setValue('');
          }}>
          <Cancel className="w-5 h-5" />
        </span>
      ) : hideIcon ? null : (
        <Search className="first:[&_path]:fill-none [&_path]:fill-darkBlue-300 w-4 h-4" />
      )}

      <TextField
        placeholder={t(label || name)}
        className={`flex-1 pl-0 py-1 placeholder:text-caption placeholder:text-darkBlue-100`}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default FilterField;
