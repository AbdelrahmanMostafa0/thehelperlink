// react & next js
import { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// EXTERNAL PACKAGES START
// i18next
import { useTranslation, Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// yup & react-user-form
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// react-query
import { dehydrate, QueryClient, useQuery } from 'react-query';
// react-date-object
import DateObject from 'react-date-object';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
// EXTERNAL PACKAGES END

// types
import { IReligion } from '@src/@types/user';
import { IDataList } from '@src/@types/common';

// routes
import { ROUTES_URL } from '@src/routes';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// utils
import { listTranslator } from '@src/utils/listTranslator';
import {
  SurnameSchema,
  agreeTermsSchema,
  citySchema,
  countryPhoneCodeSchema,
  // dateOfBirthSchema,
  emailSchema,
  genderSchema,
  nameSchema,
  nationalitySchema,
  passwordSchema,
  phoneSchema,
  rePasswordSchema,
  regionSchema,
  religionSchema,
} from '@src/utils/schema';

// api
import { getCities } from '@src/api/GET/getCities';
import { getRegions } from '@src/api/GET/getRegions';
import { getNationalities } from '@src/api/GET/getNationalities';
import { registerEmployer } from '@src/api/POST/registerEmployer';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import TextField from '@src/components/TextField';
import Checkbox from '@src/components/Checkbox';
import Select from '@src/components/Select';
import PhoneCode from '@src/components/PhoneCode';
const Datepicker = dynamic(() => import('@src/components/Datepicker'), {
  ssr: false,
});

interface IProps {
  children?: ReactNode;
}

export interface IFormInputs {
  email: string;
  name: string;
  surname: string;
  // dateOfBirth: string;
  gender: string;
  countryPhoneCode: string;
  phone: string;
  city: string;
  region: string;
  password: string;
  rePassword: string;
  agreeTerms: boolean;
  remember: boolean;
}

const schema = yup
  .object({
    email: emailSchema,
    name: nameSchema,
    surname: SurnameSchema,
    // dateOfBirth: dateOfBirthSchema,
    gender: genderSchema,
    countryPhoneCode: countryPhoneCodeSchema,
    phone: phoneSchema,
    region: regionSchema,
    city: citySchema,
    password: passwordSchema,
    rePassword: rePasswordSchema,
    agreeTerms: agreeTermsSchema,
    remember: yup.boolean(),
  })
  .required();

const EmployerRegister: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('auth') as any;
  const { changeUserState } = useUserStore((state) => state);

  const { data: regions } = useQuery<{ data: IDataList[] }>(['regions', router.locale], () =>
    getRegions(router.locale || '')
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      countryPhoneCode: '+966',
      // dateOfBirth: new DateObject().subtract(15, 'years').toString(),
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    registerEmployer(data, changeUserState, router);
  };

  const { data: cities, refetch } = useQuery<{ data: IDataList[] }>(
    ['cities', router.locale, watch('region')],
    () => getCities(router.locale || '', watch('region') || undefined, true),
    {
      enabled: regions && regions.data.length > 0,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    refetch();
    setValue('city', '');
  }, [watch('region')]);

  return (
    <>
      <Head>
        <title>{t('employerRegisterPage')}</title>
        <meta name="description" content="Employer Register page" />
      </Head>
      <div className="w-full flex justify-center items-center min-h-screen bg-[url('/images/vacancies-page-bg.png')] bg-fixed bg-right-top bg-cover bg-no-repeat p-4 py-10">
        <div className="max-w-[597px] min-h-[489px] w-full bg-white rounded-20 px-5 sm:px-9 md:px-16 pt-8 pb-14">
          <form className="w-full flex flex-col text-center" onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h3"
              className="pb-14 text-lightBlue-500"
              textTransform="first-letter-capital">
              {t('registerAsEmployer')}
            </Typography>
            <div className="flex flex-col gap-7">
              <TextField
                variant="underline"
                placeholder={t('contactEmail')}
                className="text-body1"
                {...register('email')}
                errorText={errors.email?.message}
                error={errors.email?.message !== undefined}
                autoComplete="new-password"
              />
              <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
                <TextField
                  variant="underline"
                  placeholder={t('name')}
                  className="text-body1"
                  {...register('name')}
                  errorText={errors.name?.message}
                  error={errors.name?.message !== undefined}
                  autoComplete="new-password"
                />
                <TextField
                  variant="underline"
                  placeholder={t('surname')}
                  className="text-body1"
                  {...register('surname')}
                  errorText={errors.surname?.message}
                  error={errors.surname?.message !== undefined}
                  autoComplete="new-password"
                />
              </div>
              <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
                {/* <Datepicker
                  label={
                    <Typography variant="h6" fontweight="book">
                      {t('dateOfBirth')}
                    </Typography>
                  }
                  className="text-caption"
                  placeholder={t('dateOfBirth')}
                  {...register('dateOfBirth')}
                  value={watch('dateOfBirth')}
                  onChange={(date) => {
                    const newDate = new DateObject(date as any);
                    newDate.convert(gregorian, gregorian_en);
                    setValue('dateOfBirth', newDate.format('YYYY-MM-DD'));
                  }}
                  id="dateOfBirth"
                  errorText={errors.dateOfBirth?.message}
                  error={errors.dateOfBirth?.message !== undefined}
                  autoComplete="new-password"
                /> */}
                <Select
                  options={[
                    { name: t('male'), value: 'male' },
                    { name: t('female'), value: 'female' },
                    // { name: t('others'), value: 'others' },
                  ]}
                  label={
                    <Typography variant="h6" fontweight="book">
                      {t('gender')}
                    </Typography>
                  }
                  className="text-caption"
                  {...register('gender')}
                  errorText={errors.gender?.message}
                  error={errors.gender?.message !== undefined}
                  autoComplete="new-password"
                />
              </div>
              <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
                <PhoneCode
                  isEmployer
                  onChange={(country) => setValue('countryPhoneCode', country.dial_code)}
                  value={watch('countryPhoneCode', '+966')}
                />
                <TextField
                  variant="underline"
                  placeholder={t('phone')}
                  className=" w-full min-h-[41px] text-body2"
                  {...register('phone')}
                  errorText={errors.phone?.message}
                  error={errors.phone?.message !== undefined}
                  autoComplete="new-password"
                />
              </div>
              <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
                <Select
                  options={[
                    { name: t('region'), value: '' },
                    ...(listTranslator(router.locale || '', regions?.data || [])
                      ?.sort((a, b) => a.attributes.name?.localeCompare(b.attributes.name))
                      .map((el) => ({
                        name: el.attributes.name,
                        value: el.id.toString(),
                      })) || []),
                  ]}
                  label={
                    <Typography variant="h6" fontweight="book">
                      {t('region')}
                    </Typography>
                  }
                  className=" text-caption"
                  {...register('region')}
                  errorText={errors.region?.message}
                  error={errors.region?.message !== undefined}
                  autoComplete="new-password"
                />
                <Select
                  options={
                    watch('region')
                      ? [
                          { name: t('city'), value: '' },
                          ...(listTranslator(router.locale || '', cities?.data || [])
                            ?.sort((a, b) => a.attributes.name?.localeCompare(b.attributes.name))
                            .map((el) => ({
                              name: el.attributes.name,
                              value: el.id.toString(),
                            })) || []),
                        ]
                      : [{ name: t('city'), value: '' }]
                  }
                  label={
                    <Typography variant="h6" fontweight="book">
                      {t('city')}
                    </Typography>
                  }
                  className=" text-caption"
                  {...register('city')}
                  errorText={errors.city?.message}
                  error={errors.city?.message !== undefined}
                  autoComplete="new-password"
                />
              </div>
              <TextField
                variant="underline"
                type="password"
                placeholder={t('password')}
                className="text-body1"
                {...register('password')}
                errorText={errors.password?.message}
                error={errors.password?.message !== undefined}
                autoComplete="new-password"
              />
              <TextField
                variant="underline"
                type="password"
                placeholder={t('rePassword')}
                className="text-body1"
                {...register('rePassword')}
                errorText={errors.rePassword?.message}
                error={errors.rePassword?.message !== undefined}
                autoComplete="new-password"
              />
            </div>
            {router.locale !== 'th-TH' ? (
              <Typography
                variant="body2"
                fontweight="book"
                className="mt-6 mb-4 flex items-center justify-center flex-wrap gap-5 sm:gap-2">
                {t('alreadyHaveAccount')}{' '}
                <Link href={ROUTES_URL.authRoutes.login}>
                  <span className="font-medium underline whitespace-nowrap">{t('signIn')}</span>
                </Link>
              </Typography>
            ) : (
              <></>
            )}
            <div className="flex flex-col gap-3 w-full">
              <Controller
                control={control}
                name="remember"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    id="remember-me"
                    labelClassName="text-caption"
                    onChange={onChange}
                    checked={value}>
                    {t('remember')}
                  </Checkbox>
                )}
              />

              <Controller
                control={control}
                name="agreeTerms"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onChange={onChange}
                    checked={value}
                    className=""
                    id="agree-to-the-terms-and-conditions"
                    labelClassName="text-caption text-left">
                    <Typography variant="body2" fontweight="book">
                      {t('IhaveReadAndAgree')}{' '}
                      <Link
                        target="_blank"
                        className="underline"
                        href={ROUTES_URL.navRoutes.termsAndConditions}>
                        <span>{t('termsAndConditions')}</span>
                      </Link>{' '}
                      <span>{t('and')}</span>{' '}
                      <Link
                        target="_blank"
                        className="underline"
                        href={ROUTES_URL.navRoutes.privacy}>
                        <span>{t('privacyPolicy')}</span>
                      </Link>
                    </Typography>
                  </Checkbox>
                )}
              />
            </div>

            <Button
              disabled={!watch('agreeTerms')}
              type="submit"
              variant="bordered"
              color="green"
              className="py-5 mt-8">
              <Typography variant="caption">{t('signUp')}</Typography>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: any }) => {
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery<{ data: IDataList[] }>(['nationalities', locale], () =>
      getNationalities(locale)
    );
  } catch (error: any) {
    console.log(error);
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default EmployerRegister;
