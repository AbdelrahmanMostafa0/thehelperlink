// react
import React, { forwardRef, ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// icons
import { Calendar } from '@src/assets/icons';

// i18next
import { useTranslation, Trans } from 'next-i18next';
import Typography from './Typography';

import DatePicker from 'react-multi-date-picker';
import arabic from 'react-date-object/calendars/arabic';
import arabic_ar from 'react-date-object/locales/arabic_ar';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import DateObject from 'react-date-object';

interface IProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: ReactNode;
  id: string;
  errorText?: string;
  error?: boolean;
  maxDate?: null | number;
  minDate?: null | number;
}

//@ts-ignore
const Datepicker: React.FC<IProps> = forwardRef((props, ref) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const {
    children,
    label,
    className = '',
    id,
    errorText,
    error,
    maxDate = 15,
    minDate = null,
    value,
    ...rest
  } = props;
  // let [value, setValue] = useState(new Date());
  const isArabic = router.locale === 'ar-SA';

  return (
    <div className="flex-1 w-full flex items-start flex-col gap-3">
      {label && label}
      <div className="relative w-full">
        {/* @ts-ignore */}
        <DatePicker
          inputClass="w-full rounded border-darkBlue-100 h-[36px]"
          hideOnScroll
          minDate={minDate === null ? undefined : new DateObject().subtract(minDate, 'years')}
          maxDate={maxDate === null ? undefined : new DateObject().subtract(maxDate, 'years')}
          containerClassName="w-full"
          calendar={isArabic ? arabic : gregorian}
          locale={isArabic ? arabic_ar : gregorian_en}
          value={
            value
              ? //@ts-ignore
                new Date(value)?.toISOString()
              : maxDate !== null
              ? new DateObject().subtract(maxDate, 'years')
              : undefined
          }
          id={id}
          {...rest}
        />

        <div className="flex absolute inset-y-0 ltr:right-0 ltr:left-unset rtl:left-0 rtl:right-unset items-center ltr:pr-3 rtl:pl-3 pointer-events-none">
          <Calendar className="w-4 h-4 [&_path]:stroke-darkBlue-300" />
        </div>
      </div>
      {error && (
        <Typography variant="caption" className="text-darkOrange-500">
          {t(errorText || '')}
        </Typography>
      )}
    </div>
  );
});

Datepicker.displayName = 'Datepicker';

export default Datepicker;
