// react
import React from 'react';

// nextjs
import { useRouter } from 'next/router';

// yup & react-user-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// icons
import { Cancel, Search } from '@src/assets/icons';

// next-usequerystate
import { useQueryState } from 'next-usequerystate';

// i18n-next
import { useTranslation } from 'next-i18next';

// routes
import { ROUTES_URL } from '@src/routes';

// components
import Button from '@src/components/Button';
import TextField from '@src/components/TextField';
import Typography from '@src/components/Typography';

interface IProps {
  searchType?: 'jobTitle' | 'helpers';
}

interface IFormInputs {
  searchValue: string;
}

const schema = yup
  .object({
    searchValue: yup.string(),
  })
  .required();

const SearchField: React.FC<IProps> = ({ searchType = 'jobTitle' }) => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;
  const [searchQuery, setSearchQuery] = useQueryState('search');
  const isHelperPage = router.pathname === ROUTES_URL.navRoutes.helpers;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      searchValue: searchQuery || '',
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    if (router.pathname === ROUTES_URL.navRoutes.home) {
      router.push({
        pathname: `${ROUTES_URL.navRoutes.vacancies}`,
        query: { search: data.searchValue },
      });
    } else {
      // setSearchQuery(data.searchValue || null);
      router.replace(
        {
          pathname: router.pathname,
          query: {
            search: data.searchValue || null,
          },
        },
        undefined,
        { shallow: false }
      );
    }
  };

  const clearSearchValue = () => {
    setValue('searchValue', '');
    setSearchQuery(null, { scroll: false, shallow: true });
  };

  return (
    <form
      className="flex items-center gap-2 bg-white shadow-custom-shadow px-[3px] ltr:pl-4 md:ltr:pl-7 rtl:pr-4 md:rtl:pr-7 py-[1.5px] rounded-[5px] self-center w-full sm:w-[467px]"
      onSubmit={handleSubmit(onSubmit)}>
      {watch('searchValue') ? (
        <span className="p-1 cursor-pointer" onClick={clearSearchValue}>
          <Cancel className="w-5 h-5" />
        </span>
      ) : (
        <Search className="first:[&_path]:fill-none [&_path]:fill-darkBlue-300 w-4 h-4" />
      )}

      <TextField
        placeholder={searchType === 'helpers' ? t('typeHere') : t('jobTitle')}
        className={`flex-1 pl-0 placeholder:text-caption ${
          searchType === 'helpers' ? 'placeholder:text-darkBlue-100' : 'placeholder:font-black '
        }`}
        {...register('searchValue')}
        // label="first name"
        // error={errors.firstName?.message !== undefined}
        // helperText={errors.firstName?.message}
      />
      <Button color="green" type="submit">
        <Typography variant="caption">{t('searchNow')}</Typography>
      </Button>
    </form>
  );
};

export default SearchField;
