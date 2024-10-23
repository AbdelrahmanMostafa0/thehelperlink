// react
import { ReactNode, useEffect, useState } from 'react';

// next js
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// i18next
import { useTranslation } from 'next-i18next';

// yup & react-user-form
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// api
import { updateHelperProfile } from '@src/api/PUT/updateHelperProfile';

// utils
import {
  SurnameSchema,
  countryPhoneCodeSchema,
  dateOfBirthSchema,
  emailSchema,
  genderSchema,
  nameSchema,
  nationalitySchema,
  citySchema,
  phoneSchema,
  bioSchema,
  skillsSchema,
  languagesSchema,
  religionSchema,
  countrySchema,
  otherSkillsSchema,
  yearsOfExperienceSchema,
} from '@src/utils/schema';
import { listTranslator } from '@src/utils/listTranslator';

// types
import { IUser, IReligion, IYearsOfExperience } from '@src/@types/user';
import { IDataList } from '@src/@types/common';

// constants
import { countryCodes } from '@src/constants/country_codes';

// react-date-object
import DateObject from 'react-date-object';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';

// api
import { getCities } from '@src/api/GET/getCities';

// react query
import { useQuery } from 'react-query';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import TextField from '@src/components/TextField';
import Select from '@src/components/Select';
import MultiChoice, { IListItem } from '@src/components/MultiChoice';
import PhoneCode from '@src/components/PhoneCode';
import EmailVerification from '../verifications/EmailVerification';

const Datepicker = dynamic(() => import('@src/components/Datepicker'), {
  ssr: false,
});

interface IProps {
  children?: ReactNode;
  jobTypes?: IDataList[];
  nationalities?: IDataList[];
  countries?: IDataList[];
  skills: IDataList[] | undefined;
  userInfo?: IUser;
}

export interface IFormInputs {
  email: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  gender: string;
  countryPhoneCode: string;
  phone: string;
  nationality: string;
  religion: IReligion;
  city: string;
  country: string;
  languages: Array<IListItem>;
  skills: Array<IListItem>;
  otherSkills: Array<IListItem>;
  yearsOfExperience: IYearsOfExperience | '';
  bio: string;
}

const schema = yup
  .object({
    email: emailSchema,
    name: nameSchema,
    surname: SurnameSchema,
    dateOfBirth: dateOfBirthSchema,
    gender: genderSchema,
    countryPhoneCode: countryPhoneCodeSchema,
    phone: phoneSchema,
    nationality: nationalitySchema(),
    religion: religionSchema(),
    city: citySchema,
    country: countrySchema,
    languages: languagesSchema(),
    skills: skillsSchema(),
    otherSkills: otherSkillsSchema(),
    yearsOfExperience: yearsOfExperienceSchema(),
    bio: bioSchema,
  })
  .required();

const HelperEdit: React.FC<IProps> = ({ jobTypes, nationalities, userInfo, countries, skills }) => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const { changeUserState } = useUserStore((state) => state);
  const [modalOpen, setModalOpen] = useState(false);

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
    defaultValues: {
      email: '',
      name: '',
      surname: '',
      dateOfBirth: '',
      gender: '',
      countryPhoneCode: '+31',
      phone: '',
      religion: 'muslim',
      nationality: '',
      city: '',
      country: '',
      languages: [],
      skills: [],
      otherSkills: [],
      bio: '',
      yearsOfExperience: '',
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    updateHelperProfile(data, changeUserState, router, t);
  };

  const { data: cities } = useQuery<{ data: IDataList[] }>(
    ['cities', router.locale, watch('country')],
    () => getCities(router.locale || '', watch('country') || undefined),
    {
      enabled: countries && countries.length > 0,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (watch('country') !== userInfo?.helper?.location?.country?.id.toString()) {
      setValue('city', '');
    }
  }, [watch('country')]);

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
      dateOfBirth: userInfo?.dateOfBirth || '',
      gender: userInfo?.gender || '',
      countryPhoneCode,
      phone,
      nationality: userInfo?.nationality?.id?.toString() || '',
      religion: userInfo?.religion || 'muslim',
      city: userInfo?.helper?.location?.city?.id.toString() || '',
      country: userInfo?.helper?.location?.country?.id.toString() || '',
      otherSkills:
        userInfo?.helper?.skills?.map((skill) => ({
          name: skill.name,
          value: skill.id.toString(),
        })) || [],
      skills:
        userInfo?.helper?.jobType?.map((jobType) => ({
          name: jobType.name,
          value: jobType.id.toString(),
        })) || [],
      languages: userInfo?.helper?.languages?.map((lang) => ({ name: lang, value: lang })) || [],
      yearsOfExperience: userInfo?.helper?.yearsOfExperience || '',
      bio: userInfo?.helper?.bio || '',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.helper?.jobType, router.locale]);

  useEffect(() => {
    if (!userInfo?.confirmed) {
      setModalOpen(true);
    }
  }, [userInfo?.confirmed]);

  return (
    <>
      <form className="w-full flex flex-col text-center" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" className="text-darkOrange-500 mb-9">
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
            <Datepicker
              label={
                <Typography variant="h6" fontweight="book">
                  {t('age')}
                </Typography>
              }
              className="text-caption"
              placeholder={t('age')}
              value={getValues('dateOfBirth')}
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
          <div className="flex items-start w-full flex-row gap-3">
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
          <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
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
            <Select
              options={[
                { name: t('nationality'), value: '' },
                ...(nationalities?.map((el) => ({
                  name: el.attributes.name,
                  value: el.id.toString(),
                })) || [])
                  .filter((el) => el.value != '13'), // Remove Saudi Arabia,
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
          </div>
          <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
            <Select
              options={[
                { name: t('country'), value: '' },
                ...(countries?.map((el) => ({
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
            {/* {cities && cities?.data.length > 0 && ( */}
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  ref={ref}
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
                  value={value}
                  onChange={onChange}
                  // {...register('city')}
                  errorText={errors.city?.message}
                  error={errors.city?.message !== undefined}
                  autoComplete="new-password"
                />
              )}
            />

            {/* )} */}
          </div>
          <Typography
            className="text-lightGreen-500 uppercase ltr:text-left rtl:text-right"
            variant="h6">
            {t('skills')}
          </Typography>
          <MultiChoice
            label={
              <Typography variant="h6" fontweight="book">
                {t('spokenLanguage')}
              </Typography>
            }
            list={[
              { value: 'english', name: t('english') },
              { value: 'arabic', name: t('arabic') },
            ]}
            selectedItems={watch('languages')}
            onChange={(list) => setValue('languages', list)}
          />

          <MultiChoice
            label={
              <Typography variant="h6" fontweight="book">
                {t('mainSkills')}
              </Typography>
            }
            list={[
              ...(jobTypes?.map((el) => ({ name: el.attributes.name, value: el.id.toString() })) ||
                []),
            ]}
            selectedItems={watch('skills')}
            onChange={(list) => setValue('skills', list)}
          />

          <MultiChoice
            label={
              <Typography variant="h6" fontweight="book">
                {t('otherSkills')}
              </Typography>
            }
            list={[
              ...(skills?.map((el) => ({ name: el.attributes.name, value: el.id.toString() })) ||
                []),
            ]}
            selectedItems={watch('otherSkills')}
            onChange={(list) => setValue('otherSkills', list)}
          />
          <Select
            options={[
              { name: t('yearsOfExperience'), value: '' },
              { name: t('no experience'), value: 'no experience' },
              { name: t('1-2 years'), value: '1-2 years' },
              { name: t('3-5 years'), value: '3-5 years' },
              { name: t('5-10 years'), value: '5-10 years' },
              { name: t('10+ years'), value: '10+ years' },
            ]}
            label={
              <Typography variant="h6" fontweight="book">
                {t('yearsOfExperience')}
              </Typography>
            }
            className=" text-caption"
            {...register('yearsOfExperience')}
            errorText={errors.yearsOfExperience?.message}
            error={errors.yearsOfExperience?.message !== undefined}
            autoComplete="new-password"
          />
          <TextField
            label={
              <Typography variant="h6" fontweight="book">
                {t('bio')}
              </Typography>
            }
            multiLine
            rows={10}
            variant="bordered"
            placeholder={t('typeHere')}
            className="text-caption px-2"
            {...register('bio')}
            errorText={errors.bio?.message}
            error={errors.bio?.message !== undefined}
            autoComplete="new-password"
          />
        </div>

        <Button type="submit" variant="bordered" color="green" className="py-5 mt-8">
          <Typography variant="caption">{t('updateProfile')}</Typography>
        </Button>
      </form>
      <EmailVerification open={modalOpen} setOpen={setModalOpen} userData={userInfo || null}/>
    </>
  );
};

export default HelperEdit;
