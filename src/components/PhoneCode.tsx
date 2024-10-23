import React, { useRef, useState } from 'react';
import Typography from './Typography';
import { countryCodes as countries } from '@src/constants/country_codes';
import Image from 'next/image';
import { ArrowDown } from '@src/assets/icons';
import useComponentVisible from '@src/hooks/useComponentVisible';
import TextField from '@src/components/TextField';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

interface IProps {
  onChange: (country: ICoutrny) => void;
  value: string;
  isEmployer?: boolean;
}

interface ICoutrny {
  name: string;
  ar_name: string;
  dial_code: string;
  code: string;
}

const PhoneCode: React.FC<IProps> = ({ onChange, value, isEmployer = false }) => {
  const [selectedCountry, setSelectedCountry] = useState<ICoutrny>(
    isEmployer ? countries.find((el) => el.code === 'SA') || countries[0] : countries[0]
  );
  const { isComponentVisible, ref, setIsComponentVisible } = useComponentVisible(false);
  const [searchValue, setSearchValue] = useState('');
  const [countryCodes, setCountryCodes] = useState(countries);
  const searchRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const { t } = useTranslation('common') as any;
  const router = useRouter();
  const isArabic = router.locale === 'ar-SA';

  React.useEffect(() => {
    if (value) {
      const selected = countryCodes.find((country) => country.dial_code === value);
      if (selected) setSelectedCountry(selected);
    }
  }, [value]);

  const handleChangeCountry = (country: ICoutrny) => {
    setIsComponentVisible(false);
    onChange(country);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    setSearchValue(e.target.value);
  };

  const handleChangeCoutriesList = () => {
    let newCountriesList = [...countries];
    newCountriesList = newCountriesList.filter(
      (country) =>
        (isArabic ? country.ar_name : country.name)
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) !== -1
    );
    setCountryCodes(newCountriesList);
  };

  React.useEffect(() => {
    handleChangeCoutriesList();
  }, [searchValue]);

  React.useEffect(() => {
    if (!isComponentVisible) {
      setSearchValue('');
    } else {
      searchRef.current?.focus();
    }
  }, [isComponentVisible]);

  React.useLayoutEffect(() => {
    const handleOnScroll = () => {
      setIsComponentVisible(false);
    };
    document.addEventListener('scroll', handleOnScroll);

    return () => {
      document.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <div className="cursor-pointer relative bg-inherit border-b border-x-0 border-t-0 min-h-[41px] border-darkBlue-100 text-black rounded-none focus:ring-0 focus:border-darkBlue-100 block min-w-[127px]">
      {/* display selected item  */}
      <div
        role="listbox"
        tabIndex={0}
        aria-expanded={isComponentVisible}
        aria-activedescendant={selectedCountry.code}
        onClick={() => setIsComponentVisible(true)}
        className="flex items-center gap-2 justify-between px-3 py-2">
        <div className="flex items-center w-full gap-2">
          <span className="relative w-6 h-[18px] aspect-[24/18]">
            <Image
              src={`https://flagsapi.com/${selectedCountry.code}/flat/64.png`}
              alt={selectedCountry.name}
              fill
              className="object-cover"
              sizes="24px"
            />
          </span>
          <Typography variant="body2" fontweight="book" style={{ direction: 'ltr' }}>
            {`+${Number(selectedCountry.dial_code.replace('+', '')).toLocaleString(router.locale)}`}
          </Typography>
        </div>
        <ArrowDown />
      </div>
      {/* dropdown  */}
      {isComponentVisible && (
        <div
          ref={ref}
          className="absolute top-[48px] ltr:left-0 ltr:right-unset rtl:right-0 rtl:left-unset shadow-custom-shadow bg-white rounded-10 min-w-[204px] overflow-hidden z-[1]">
          {/* search field */}
          <TextField
            ref={searchRef}
            placeholder={t('searchCountryName')}
            className="px-3 pt-4 text-caption !rounded-10 !rounded-bl-none !rounded-br-none mb-2"
            variant="bordered"
            value={searchValue}
            onChange={handleSearch}
            autoComplete="new-password"
          />
          {/* list of items  */}
          <ul className="flex flex-col w-full scrollbar-hidden max-h-[200px] overflow-auto">
            {countryCodes.length > 0 ? (
              countryCodes
                .filter((el) => (isEmployer ? el.code === 'SA' : el))
                .map((country, index) => (
                  <li
                    role="option"
                    aria-selected={selectedCountry.code === country.code}
                    onClick={() => handleChangeCountry(country)}
                    key={index}
                    className={`flex items-center gap-2 p-2 hover:bg-darkBlue-100 ${
                      selectedCountry.code === country.code ? 'bg-lightGreen-200' : 'bg-inherit'
                    }`}>
                    <span className="relative w-6 h-[18px] aspect-[24/18]">
                      <Image
                        src={`https://flagsapi.com/${country.code}/flat/64.png`}
                        alt={country.name}
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </span>
                    <Typography
                      variant="body2"
                      fontweight="book"
                      className="whitespace-nowrap"
                      style={{ direction: 'ltr' }}>
                      {`+${Number(country.dial_code.replace('+', '')).toLocaleString(
                        router.locale
                      )}`}
                    </Typography>
                    -
                    <Typography
                      variant="caption"
                      fontweight="book"
                      className="ltr:text-left rtl:text-right">
                      {isArabic ? country.ar_name : country.name}
                    </Typography>
                  </li>
                ))
            ) : (
              <Typography
                variant="caption"
                fontweight="book"
                textTransform="capitalize"
                className="py-2">
                {t('noResults')}
              </Typography>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PhoneCode;
