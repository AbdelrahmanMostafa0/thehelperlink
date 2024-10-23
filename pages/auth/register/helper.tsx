// react & next js
import { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// EXTERNAL PACKAGES START
// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// yup & react-user-form
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// react-query
import { dehydrate, QueryClient, useQuery } from 'react-query';
//react-date-object
import DateObject from 'react-date-object';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
// EXTERNAL PACKAGES END

// routes
import { ROUTES_URL } from '@src/routes';

// api
import { getNationalities } from '@src/api/GET/getNationalities';
import { registerHelper } from '@src/api/POST/registerHelper';
import { getCountries } from '@src/api/GET/getCountries';
import { getCities } from '@src/api/GET/getCities';

// utils
import { listTranslator } from '@src/utils/listTranslator';
import {
  SurnameSchema,
  countryPhoneCodeSchema,
  dateOfBirthSchema,
  emailSchema,
  genderSchema,
  nameSchema,
  nationalitySchema,
  passwordSchema,
  phoneSchema,
  rePasswordSchema,
  citySchema,
  religionSchema,
  agreeTermsSchema,
} from '@src/utils/schema';

// types
import { IReligion } from '@src/@types/user';
import { IDataList } from '@src/@types/common';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

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
  dateOfBirth: string;
  gender: string;
  religion: IReligion;
  countryPhoneCode: string;
  phone: string;
  nationality: string;
  city: string;
  country: string;
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
    dateOfBirth: dateOfBirthSchema,
    gender: genderSchema,
    religion: religionSchema(),
    countryPhoneCode: countryPhoneCodeSchema,
    phone: phoneSchema,
    nationality: nationalitySchema(),
    country: citySchema,
    city: citySchema,
    password: passwordSchema,
    rePassword: rePasswordSchema,
    agreeTerms: agreeTermsSchema,
    remember: yup.boolean(),
  })
  .required();

const HelperRegister: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('auth') as any;
  const { changeUserState } = useUserStore((state) => state);

  const { data: nationalities } = useQuery<{ data: IDataList[] }>(
    ['nationalities', router.locale],
    () => getNationalities(router.locale || '')
  );
  const { data: countries } = useQuery<{ data: IDataList[] }>(['countries', router.locale], () =>
    getCountries(router.locale || '')
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
      countryPhoneCode: '+93',
      dateOfBirth: new DateObject().subtract(15, 'years').toString(),
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    registerHelper(data, changeUserState, router, t);
  };

  const isLangThai = router.locale === 'th-TH';

  const { data: cities, refetch } = useQuery<{ data: IDataList[] }>(
    ['cities', router.locale, watch('country')],
    () => getCities(router.locale || '', watch('country') || undefined),
    {
      enabled: countries && countries.data.length > 0,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (isLangThai) {
      router.push('/not-found', undefined, { locale: 'en-GB' });
    }
  }, [router]);

  useEffect(() => {
    setValue('city', '');
  }, [watch('country')]);

  if (isLangThai) return <></>;
  return (
    <>
      <Head>
        <title>{t('helperRegisterPage')}</title>
        <meta name="description" content="Helper Register page" />
      </Head>
      <div className="w-full flex justify-center items-center min-h-screen bg-[url('/images/helpers-page-bg.png')] bg-fixed bg-left-top bg-cover bg-no-repeat p-4 py-10">
        <div className="max-w-[597px] min-h-[489px] w-full bg-white rounded-20 px-5 sm:px-9 md:px-16 pt-8 pb-14">
          <form className="w-full flex flex-col text-center" onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h3"
              className="pb-14 text-darkOrange-500"
              textTransform="first-letter-capital">
              {t('registerAsHelper')}
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
                <Datepicker
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
                />
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
              <Select
                options={[
                  { name: t('NoPreference'), value: '' },
                  { name: t('muslim'), value: 'muslim' },
                  { name: t('non-muslim'), value: 'non-muslim' },
                ]}
                label={
                  <Typography variant="h6" fontweight="book">
                    {t('religion')}
                  </Typography>
                }
                className=" text-caption"
                {...register('religion')}
                errorText={errors.religion?.message}
                error={errors.religion?.message !== undefined}
                autoComplete="new-password"
              />
              <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
                <PhoneCode
                  onChange={(country) => setValue('countryPhoneCode', country.dial_code)}
                  value={watch('countryPhoneCode')}
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
              <Select
                options={[
                  { name: t('nationality'), value: '' },
                  ...(
                    listTranslator(router.locale || '', nationalities?.data || [])
                      ?.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
                      .map((el) => ({
                        name: el.attributes.name,
                        value: el.id.toString(),
                      })) || []
                  ).filter((el) => el.value != '13'), // Remove Saudi Arabia,
                ]}
                label={
                  <Typography variant="h6" fontweight="book">
                    {t('nationality')}
                  </Typography>
                }
                className=" text-caption"
                {...register('nationality')}
                errorText={errors.nationality?.message}
                error={errors.nationality?.message !== undefined}
                autoComplete="new-password"
              />
              <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
                <Select
                  options={[
                    { name: t('country'), value: '' },
                    ...(listTranslator(router.locale || '', countries?.data || [])
                      ?.sort((a, b) => a.attributes.name?.localeCompare(b.attributes.name))
                      .map((el) => ({
                        name: el.attributes.name,
                        value: el.id.toString(),
                      })) || []),
                  ]}
                  label={
                    <Typography variant="h6" fontweight="book">
                      {t('country')}
                    </Typography>
                  }
                  className=" text-caption"
                  {...register('country')}
                  errorText={errors.country?.message}
                  error={errors.country?.message !== undefined}
                  autoComplete="new-password"
                />
                <Select
                  options={
                    watch('country')
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
              disabled={isLangThai || !watch('agreeTerms')}
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
    await queryClient.fetchQuery<{ data: IDataList[] }>(['countries', locale], () =>
      getCountries(locale)
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

export default HelperRegister;
