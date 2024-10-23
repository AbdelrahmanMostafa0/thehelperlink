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

// api
import { getJobTypes } from '@src/api/GET/getJobTypes';
import { getNationalities } from '@src/api/GET/getNationalities';

// utils
import { onlynumerics_REGEX } from '@src/utils/REGEX';
import { listTranslator } from '@src/utils/listTranslator';

// components
import Typography from '@src/components/Typography';
import Select from '@src/components/Select';
import FilterField from '@src/components/FilterField';

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
    drivingLicense: false,
    yearsOfExperience: '',
  });
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');

  // query states
  const [jobType, setJobType] = useQueryState('jobType');
  const [nationality, setNationality] = useQueryState('nationality');
  const [genderQuery, setGenderQuery] = useQueryState('gender');
  const [firstNameQuery, setFirstNameQuery] = useQueryState('firstName');
  const [addressQuery, setAddressQuery] = useQueryState('address');
  const [minAgeQuery, setMinAgeQuery] = useQueryState('minAge');
  const [maxAgeQuery, setMaxAgeQuery] = useQueryState('maxAge');
  const [yearsOfExperience, setYearsOfExperience] = useQueryState('yearsOfExperience');
  const [drivingLicenseQuery, setDrivingLicenseQuery] = useQueryState(
    'drivingLicense',
    queryTypes.boolean
  );
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });
  const [maxAge, setMaxAge] = useState('');
  const [minAge, setMinAge] = useState('');

  // clean filtes handler
  const cleanFilters = async () => {
    await setJobType(null, { scroll: false, shallow: true });
    await setNationality(null, { scroll: false, shallow: true });
    await setGenderQuery(null, { scroll: false, shallow: true });
    await setDrivingLicenseQuery(null, { scroll: false, shallow: true });
    await setFirstNameQuery(null, { scroll: false, shallow: true });
    await setAddressQuery(null, { scroll: false, shallow: true });
    await setPage('1', { scroll: false, shallow: true });
    await setMinAgeQuery(null, { scroll: false, shallow: true });
    await setMaxAgeQuery(null, { scroll: false, shallow: true });
    setValues({
      gender: '',
      nationality: '',
      jobType: '',
      drivingLicense: false,
      yearsOfExperience: '',
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
      drivingLicense: drivingLicenseQuery || false,
      gender: genderQuery || '',
      jobType: jobType || '',
      nationality: nationality || '',
      yearsOfExperience: yearsOfExperience || '',
    });
    setMinAge(minAgeQuery || '');
    setMaxAge(maxAgeQuery || '');
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
    minAgeQuery,
    maxAgeQuery,
    yearsOfExperience,
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
      {/* <Select
        className="text-caption min-w-[250px] lg:min-w-[auto] w-full lg:flex-1"
        placeholder={t('jobType')}
        options={[
          { name: t('jobType'), value: '' },
          ...(listTranslator(router.locale || '', jobTypes?.data || []).map((el) => ({
            name: el.attributes.name,
            value: el.id.toString(),
          })) || []),
        ]}
        value={jobType || ''}
        onChange={(e) => setValues((prevState) => ({ ...prevState, jobType: e.target.value }))}
      /> */}
      <div className="flex items-center gap-1">
        <Typography variant="body2">{t('age')}</Typography>
        <FilterField
          hideIcon
          regex={onlynumerics_REGEX}
          className="min-w-[auto] flex-1"
          setValue={setMinAge}
          value={minAge}
          name="minAge"
          label="min"
          submitBehavior="sync"
        />
        <span> - </span>
        <FilterField
          hideIcon
          regex={onlynumerics_REGEX}
          className="min-w-[auto] flex-1"
          setValue={setMaxAge}
          value={maxAge}
          name="maxAge"
          label="max"
          submitBehavior="sync"
        />
      </div>
      <Select
        className="text-caption min-w-[250px] lg:min-w-[auto] w-full lg:flex-1"
        placeholder={t('workExperience')}
        options={[
          { name: t('workExperience'), value: '' },
          { name: t('no experience'), value: 'no experience' },
          { name: t('1-2 years'), value: '1-2 years' },
          { name: t('3-5 years'), value: '3-5 years' },
          { name: t('5-10 years'), value: '5-10 years' },
          { name: t('10+ years'), value: '10+ years' },
        ]}
        value={values.yearsOfExperience || ''}
        onChange={(e) =>
          setValues((prevState) => ({ ...prevState, yearsOfExperience: e.target.value }))
        }
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
            })) || [])
            .filter((el) => el.value != '13'), // Remove Saudi Arabia,
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
