// react
import React, { ReactNode, useEffect, useState } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// next-usequerystate
import { useQueryState, queryTypes } from 'next-usequerystate';

// react-query
import { useQuery } from 'react-query';

// types
import { IDataList } from '@src/@types/common';

// utils
import { listTranslator } from '@src/utils/listTranslator';

// api
import { getJobTypes } from '@src/api/GET/getJobTypes';
import { getNationalities } from '@src/api/GET/getNationalities';

// components
import Typography from '@src/components/Typography';
import Select from '@src/components/Select';
import MultiRangeSlider from '@src/components/MultiRangeSlider';

interface IProps {
  children?: ReactNode;
  setClearFilter: React.Dispatch<React.SetStateAction<boolean>>;
  clearFilter: boolean;
  setSubmitFilters: React.Dispatch<React.SetStateAction<boolean>>;
  submitFilters: boolean;
}

const JobsFilterLabelsMobile: React.FC<IProps> = ({
  setClearFilter,
  submitFilters,
  clearFilter,
  setSubmitFilters,
}) => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;

  const { data: nationalities } = useQuery<{ data: IDataList[] }>(
    ['nationalities', router.locale],
    () => getNationalities(router.locale || '')
  );
  const { data: jobTypes } = useQuery<{ data: IDataList[] }>(['job-types', router.locale], () =>
    getJobTypes(router.locale || '')
  );

  // fields states
  const [values, setValues] = React.useState({
    gender: '',
    nationality: '',
    jobType: '',
    minAge: '',
    maxAge: '',
    drivingLicense: false,
    language: '',
    experience: '',
  });
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');

  // query states
  const [jobType, setJobType] = useQueryState('jobType');
  const [minAge, setMinAge] = useQueryState('minAge');
  const [maxAge, setMaxAge] = useQueryState('maxAge');
  const [language, setLanguage] = useQueryState('language');
  const [experience, setExperience] = useQueryState('yearsOfExperience');
  const [nationality, setNationality] = useQueryState('nationality');
  const [genderQuery, setGenderQuery] = useQueryState('gender');
  const [firstNameQuery, setFirstNameQuery] = useQueryState('firstName');
  const [addressQuery, setAddressQuery] = useQueryState('address');
  const [drivingLicenseQuery, setDrivingLicenseQuery] = useQueryState(
    'drivingLicense',
    queryTypes.boolean
  );
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });

  // clean filtes handler
  const cleanFilters = async () => {
    await setJobType(null, { scroll: false, shallow: true });
    await setNationality(null, { scroll: false, shallow: true });
    await setGenderQuery(null, { scroll: false, shallow: true });
    await setDrivingLicenseQuery(null, { scroll: false, shallow: true });
    await setFirstNameQuery(null, { scroll: false, shallow: true });
    await setAddressQuery(null, { scroll: false, shallow: true });
    await setPage('1', { scroll: false, shallow: true });
    await setMinAge(null, { scroll: false, shallow: true });
    await setMaxAge(null, { scroll: false, shallow: true });
    await setLanguage(null, { scroll: false, shallow: true });
    await setExperience(null, { scroll: false, shallow: true });
    setValues({
      gender: '',
      nationality: '',
      jobType: '',
      drivingLicense: false,
      maxAge: '',
      minAge: '',
      language: '',
      experience: '',
    });
    setFirstName('');
    setAddress('');
    setClearFilter(false);
  };

  // handle submit filters
  const handleSubmitQueries = async () => {
    await setJobType(values.jobType || null, { scroll: false, shallow: true });
    await setNationality(values.nationality || null, { scroll: false, shallow: true });
    await setGenderQuery(values.gender || null, { scroll: false, shallow: true });
    await setDrivingLicenseQuery(values.drivingLicense || null, { scroll: false, shallow: true });
    await setFirstNameQuery(firstName || null, { scroll: false, shallow: true });
    await setAddressQuery(address || null, { scroll: false, shallow: true });
    await setPage('1', { scroll: false, shallow: true });
    await setMinAge(values.minAge || null, { scroll: false, shallow: true });
    await setMaxAge(values.maxAge || null, { scroll: false, shallow: true });
    await setLanguage(values.language || null, { scroll: false, shallow: true });
    await setExperience(values.experience || null, { scroll: false, shallow: true });

    setTimeout(() => {
      setSubmitFilters(false);
    }, 1000);
  };

  useEffect(() => {
    if (clearFilter) {
      cleanFilters();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearFilter]);

  useEffect(() => {
    if (submitFilters) {
      handleSubmitQueries();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitFilters]);

  // get the values from the queries
  useEffect(() => {
    setValues({
      ...values,
      drivingLicense: drivingLicenseQuery || false,
      gender: genderQuery || '',
      jobType: jobType || '',
      nationality: nationality || '',
      language: language || '',
      experience: experience || '',
    });
    setFirstName(firstNameQuery || '');
    setAddress(addressQuery || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    genderQuery,
    jobType,
    nationality,
    drivingLicenseQuery,
    firstNameQuery,
    addressQuery,
    language,
    experience,
  ]);

  return (
    <>
      {/* <FilterField
        regex={onlyLetters_REGEX}
        name="firstName"
        label="firstName"
        submitBehavior="async"
        setValue={setFirstName}
        value={firstName}
      /> */}
      {/* <FilterField
        // regex={onlyLetters_REGEX}
        name="address"
        label="address"
        submitBehavior="async"
        setValue={setAddress}
        value={address}
      /> */}
      <Select
        className="text-caption min-w-[250px] lg:min-w-[auto] w-full lg:flex-1"
        placeholder={t('jobType')}
        options={[
          { name: t('jobType'), value: '' },
          ...(listTranslator(router.locale || '', jobTypes?.data || []).map((el) => ({
            name: el.attributes.name,
            value: el.id.toString(),
          })) || []),
        ]}
        value={values.jobType || ''}
        onChange={(e) => setValues((prevState) => ({ ...prevState, jobType: e.target.value }))}
      />
      <Select
        className="text-caption min-w-[250px] lg:min-w-[auto] w-full lg:flex-1"
        placeholder={t('nationality')}
        options={[
          { name: t('nationality'), value: '' },
          ...(listTranslator(router.locale || '', nationalities?.data || [])
            .sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
            .map((el) => ({
              name: el.attributes.name,
              value: el.id.toString(),
            })) || []),
        ]}
        value={values.nationality || ''}
        onChange={(e) => setValues((prevState) => ({ ...prevState, nationality: e.target.value }))}
      />
      <Select
        className="text-caption min-w-[250px] lg:min-w-[auto] w-full lg:flex-1"
        placeholder={t('gender')}
        options={[
          { name: t('gender'), value: '' },
          { name: t('male'), value: 'male' },
          { name: t('female'), value: 'female' },
          // { name: t('others'), value: 'others' },
        ]}
        value={values.gender || ''}
        onChange={(e) => setValues((prevState) => ({ ...prevState, gender: e.target.value }))}
      />
      <div className="flex flex-col gap-6">
        <Typography variant="body2">{t('age')}</Typography>
        <MultiRangeSlider
          // stepOnly={true}
          // preventWheel={false}
          max={100}
          min={15}
          step={1}
          maxValue={values.maxAge || maxAge || 100}
          minValue={values.minAge || minAge || 15}
          maxCaption={`${values.maxAge || 100}${t('Y')} `}
          minCaption={`${values.minAge || 15}${t('Y')} `}
          onInput={(e) => {
            if (e.maxValue !== +values.maxAge || e.minValue !== +values.minAge) {
              setValues((prevState) => ({
                ...prevState,
                minAge: e.minValue.toString(),
                maxAge: e.maxValue.toString(),
              }));
            }
          }}
        />
      </div>
      <Select
        className="text-caption min-w-[250px] lg:min-w-[auto] w-full lg:flex-1"
        placeholder={t('experience')}
        options={[
          { name: t('experience'), value: '' },
          { name: t('no experience'), value: 'no experience' },
          { name: t('1-2 years'), value: '1-2 years' },
          { name: t('3-5 years'), value: '3-5 years' },
          { name: t('5-10 years'), value: '5-10 years' },
          { name: t('10+ years'), value: '10+ years' },
        ]}
        value={values.experience || ''}
        onChange={(e) => setValues((prevState) => ({ ...prevState, experience: e.target.value }))}
      />
      <Select
        className="text-caption min-w-[250px] lg:min-w-[auto] w-full lg:flex-1"
        placeholder={t('Language')}
        options={[
          { name: t('language'), value: '' },
          { name: t('english'), value: 'english' },
          { name: t('arabic'), value: 'arabic' },
        ]}
        value={values.language || ''}
        onChange={(e) => setValues((prevState) => ({ ...prevState, language: e.target.value }))}
      />

      {/* <Switch
        checked={values.drivingLicense || false}
        onChange={(e) =>
          setValues((prevState) => ({ ...prevState, drivingLicense: e.target.checked }))
        }>
        {t('drivingLicenseHelper')}
      </Switch> */}
    </>
  );
};

export default JobsFilterLabelsMobile;
