// react
import { ReactNode, useEffect, useMemo, useState } from 'react';

// next js
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// i18next
import { useTranslation } from 'next-i18next';

// yup & react-user-form
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// lodash
import _ from 'lodash';

// api
import { updateEmployerProfile } from '@src/api/PUT/updateEmployerProfile';

// utils
import {
  SurnameSchema,
  citySchema,
  countryPhoneCodeSchema,
  // dateOfBirthSchema,
  emailSchema,
  genderSchema,
  nameSchema,
  nationalitySchema,
  numberOfAdultsSchema,
  numberOfChildrenSchema,
  phoneSchema,
  regionSchema,
  religionSchema,
} from '@src/utils/schema';
import { listTranslator } from '@src/utils/listTranslator';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// constants
import { countryCodes } from '@src/constants/country_codes';

// types
import { IFamilyChildren, IFamilyMembers, IReligion, IUser } from '@src/@types/user';
import { IDataList } from '@src/@types/common';

// api
import { getCities } from '@src/api/GET/getCities';

// react query
import { useQuery } from 'react-query';

// react-date-object
import DateObject from 'react-date-object';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import TextField from '@src/components/TextField';
import Select from '@src/components/Select';
import PhoneCode from '@src/components/PhoneCode';
import EmailVerification from '../verifications/EmailVerification';
import PhoneVerification from '../verifications/PhoneVerification';
const Datepicker = dynamic(() => import('@src/components/Datepicker'), {
  ssr: false,
});

interface IProps {
  children?: ReactNode;
  regions?: IDataList[];
  userInfo?: IUser;
}

export interface IFormInputs {
  email: string;
  name: string;
  surname: string;
  // dateOfBirth: string;
  gender: string;
  numberOfAddults: IFamilyMembers;
  numberOfChildren: IFamilyChildren;
  countryPhoneCode: string;
  phone: string;
  city: string;
  region: string;
}

const schema = yup
  .object({
    email: emailSchema,
    name: nameSchema,
    surname: SurnameSchema,
    // dateOfBirth: dateOfBirthSchema,
    gender: genderSchema,
    numberOfChildren: numberOfChildrenSchema,
    numberOfAddults: numberOfAdultsSchema,
    countryPhoneCode: countryPhoneCodeSchema,
    phone: phoneSchema,
    region: regionSchema,
    city: citySchema,
  })
  .required();

let five = 5;
const EmployerEdit: React.FC<IProps> = ({ userInfo, regions }) => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);

  const { changeUserState } = useUserStore((state) => state);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return {
        email: '',
        name: '',
        surname: '',
        countryPhoneCode: '+31',
        phone: '',
        // dateOfBirth: '',
        gender: 'male',
        numberOfAddults: '0',
        numberOfChildren: '0',
        region: '',
        city: '',
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo?.firstName]),
  });
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    updateEmployerProfile(data, changeUserState, router, t);
  };

  const { data: cities } = useQuery<{ data: IDataList[] }>(
    ['cities', router.locale, watch('region')],
    () => getCities(router.locale || '', watch('region') || undefined, true),
    {
      enabled: regions && regions.length > 0,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (watch('region') !== userInfo?.employer?.location?.region?.id.toString()) {
      setValue('city', '');
    }
  }, [watch('region')]);

  useEffect(() => {
    let phone = userInfo?.phoneNumber;
    let countryPhoneCode = '';
    countryCodes.forEach((element) => {
      if (phone?.startsWith(element.dial_code)) {
        countryPhoneCode = element.dial_code;
        // split phone number
        phone = userInfo?.phoneNumber?.split(countryPhoneCode)[1];
      }
    });

    reset({
      email: userInfo?.email || '',
      name: userInfo?.firstName || '',
      surname: userInfo?.lastName || '',
      countryPhoneCode,
      phone,
      // dateOfBirth: userInfo?.dateOfBirth || '',
      gender: userInfo?.gender || '',
      numberOfAddults: (userInfo?.employer?.adults?.toString() as IFamilyMembers) || '0',
      numberOfChildren: (userInfo?.employer?.children?.toString() as IFamilyMembers) || '0',
      city: userInfo?.employer?.location?.city?.id.toString() || '',
      region: userInfo?.employer?.location?.region?.id.toString() || '',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.firstName, router.locale]);

  useEffect(() => {
    if (userInfo && userInfo.firstName) {
      changeUserState(userInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.firstName]);

  if (!userInfo?.firstName) return <></>;

  useEffect(() => {
    if (!userInfo?.confirmedPhoneNumber) {
      setPhoneModalOpen(true);
    }
    if (!userInfo?.confirmed && userInfo?.confirmedPhoneNumber) {
      setEmailModalOpen(true);
    }
  }, [userInfo?.confirmed, userInfo?.confirmedPhoneNumber]);

  return (
    <>
      <form className="w-full flex flex-col text-center" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="h3"
          className="mb-9 text-lightGreen-500"
          textTransform="first-letter-capital">
          {t('myProfile')}
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
              value={getValues('dateOfBirth')}
              // {...register('dateOfBirth')}
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
            <Select
              options={[
                ...Array.from(Array(5).keys()).map((val) => ({
                  name: val.toLocaleString(router.locale || ''),
                  value: val.toString(),
                })),
                { name: `${five.toLocaleString(router.locale || '')}+`, value: '+5' },
              ]}
              label={
                <Typography variant="h6" fontweight="book">
                  {t('numberOfAddults')}
                </Typography>
              }
              className="text-caption"
              {...register('numberOfAddults')}
              errorText={errors.numberOfAddults?.message}
              error={errors.numberOfAddults?.message !== undefined}
              autoComplete="new-password"
            />
            <Select
              options={[
                ...Array.from(Array(5).keys()).map((val) => ({
                  name: val.toLocaleString(router.locale || ''),
                  value: val.toString(),
                })),
                { name: `${five.toLocaleString(router.locale || '')}+`, value: '+5' },
              ]}
              label={
                <Typography variant="h6" fontweight="book">
                  {t('familyChildren')}
                </Typography>
              }
              className="text-caption"
              {...register('numberOfChildren')}
              errorText={errors.numberOfChildren?.message}
              error={errors.numberOfChildren?.message !== undefined}
              autoComplete="new-password"
            />
          </div>

          <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
            <PhoneCode
              isEmployer
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
          <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
            <Select
              options={[
                { name: t('region'), value: '' },
                ...(regions?.map((el) => ({
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
            {/* {cities && cities?.data.length > 0 && ( */}
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  ref={ref}
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
                  value={value}
                  onChange={onChange}
                  // {...register('city')}
                  errorText={errors.city?.message}
                  error={errors.city?.message !== undefined}
                  autoComplete="new-password"
                />
              )}
            />
          </div>
        </div>
        <Button type="submit" variant="bordered" color="green" className="py-5 mt-8">
          <Typography variant="caption">{t('updateProfile')}</Typography>
        </Button>
      </form>
      <EmailVerification
        open={emailModalOpen}
        setOpen={setEmailModalOpen}
        userData={userInfo || null}
      />
      {/* <PhoneVerification
        open={phoneModalOpen}
        setOpen={setPhoneModalOpen}
        userData={userInfo || null}
      /> */}
    </>
  );
};

export default EmployerEdit;
