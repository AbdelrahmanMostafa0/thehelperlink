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
import { getRegions } from '@src/api/GET/getRegions';
import { getCities } from '@src/api/GET/getCities';

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
    startingDate: '',
    drivingLicense: false,
    yearsOfExperience: '',
    region: '',
    city: '',
  });
  const [religion, setReligion] = useState('');
  const [location, setLocation] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [minAge, setMinAge] = useState('');
  const [salary, setSalary] = useState('');
  const [title, setTitle] = useState('');

  // query states
  const [jobType, setJobType] = useQueryState('jobType');
  const [nationality, setNationality] = useQueryState('nationality');
  const [genderQuery, setGenderQuery] = useQueryState('gender');
  const [startingDateQuery, setStartingDateQuery] = useQueryState('startingDate');
  const [drivingLicenseQuery, setDrivingLicenseQuery] = useQueryState(
    'drivingLicense',
    queryTypes.boolean
  );
  const [religionQuery, setReligionQuery] = useQueryState('religion');
  const [locationQuery, setLocationQuery] = useQueryState('location');
  const [maxAgeQuery, setMaxAgeQuery] = useQueryState('maxAge');
  const [minAgeQuery, setMinAgeQuery] = useQueryState('minAge');
  const [salaryQuery, setSalaryQuery] = useQueryState('salary');
  const [regionQuery, setRegionQuery] = useQueryState('region');
  const [cityQuery, setCityQuery] = useQueryState('city');
  const [yearsOfExperienceQuery, setYearsOfExperienceQuery] = useQueryState('yearsOfExperience');
  const [titleQuery, setTitleQuery] = useQueryState('title');
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });

  const { data: regions } = useQuery<{ data: IDataList[] }>(['regions', router.locale], () =>
    getRegions(router.locale || '')
  );

  const { data: cities } = useQuery<{ data: IDataList[] }>(
    ['cities', router.locale, values.region],
    () => getCities(router.locale || '', values.region || undefined, true),
    {
      enabled: regions && regions.data.length > 0,
      staleTime: Infinity,
    }
  );

  // clean filtes handler
  const cleanFilters = async () => {
    await setJobType(null, { scroll: false, shallow: true });
    await setNationality(null, { scroll: false, shallow: true });
    await setGenderQuery(null, { scroll: false, shallow: true });
    await setStartingDateQuery(null, { scroll: false, shallow: true });
    await setDrivingLicenseQuery(null, { scroll: false, shallow: true });
    await setReligionQuery(null, { scroll: false, shallow: true });
    await setLocationQuery(null, { scroll: false, shallow: true });
    await setMaxAgeQuery(null, { scroll: false, shallow: true });
    await setMinAgeQuery(null, { scroll: false, shallow: true });
    await setSalaryQuery(null, { scroll: false, shallow: true });
    await setYearsOfExperienceQuery(null, { scroll: false, shallow: true });
    await setTitleQuery(null, { scroll: false, shallow: true });
    await setRegionQuery(null, { scroll: false, shallow: true });
    await setCityQuery(null, { scroll: false, shallow: true });
    await setPage('1', { scroll: false, shallow: true });
    setValues({
      gender: '',
      nationality: '',
      jobType: '',
      startingDate: '',
      drivingLicense: false,
      yearsOfExperience: '',
      city: '',
      region: '',
    });
    setLocation('');
    setReligion('');
    setMaxAge('');
    setMinAge('');
    setSalary('');
    setTitle('');
    setClearFilter(false);
  };

  // handle submit filters
  const handleSubmitQueries = async () => {
    await setJobType(values.jobType || null, { scroll: false, shallow: true });
    await setNationality(values.nationality || null, { scroll: false, shallow: true });
    await setGenderQuery(values.gender || null, { scroll: false, shallow: true });
    await setStartingDateQuery(values.startingDate || null, { scroll: false, shallow: true });
    await setDrivingLicenseQuery(values.drivingLicense || null, { scroll: false, shallow: true });
    await setReligionQuery(religion || null, { scroll: false, shallow: true });
    await setLocationQuery(location || null, { scroll: false, shallow: true });
    await setMaxAgeQuery(maxAge || null, { scroll: false, shallow: true });
    await setMinAgeQuery(minAge || null, { scroll: false, shallow: true });
    await setSalaryQuery(salary || null, { scroll: false, shallow: true });
    await setYearsOfExperienceQuery(values.yearsOfExperience || null, {
      scroll: false,
      shallow: true,
    });
    await setRegionQuery(values.region || null, { scroll: false, shallow: true });
    await setCityQuery(values.city || null, { scroll: false, shallow: true });
    await setTitleQuery(title || null, { scroll: false, shallow: true });
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
      startingDate: startingDateQuery || '',
      yearsOfExperience: yearsOfExperienceQuery || '',
      city: cityQuery || '',
      region: regionQuery || '',
    });
    setReligion(religionQuery || '');
    setLocation(locationQuery || '');
    setMaxAge(maxAgeQuery || '');
    setMinAge(minAgeQuery || '');
    setSalary(salaryQuery || '');
    setTitle(titleQuery || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    genderQuery,
    jobType,
    nationality,
    locationQuery,
    startingDateQuery,
    religionQuery,
    maxAgeQuery,
    minAgeQuery,
    yearsOfExperienceQuery,
    salaryQuery,
    drivingLicenseQuery,
    titleQuery,
    regionQuery,
    cityQuery,
  ]);

  return (
    <>
      {/* <Datepicker
        className="text-caption"
        placeholder={t('startingDate')}
        maxDate={-1}
        value={values.startingDate}
        onChange={(date) => {
          const newDate = new DateObject(date as any);
          newDate.convert(gregorian, gregorian_en);
          setValues((prevState) => ({ ...prevState, startingDate: newDate.format('YYYY-MM-DD') }));
        }}
        id="starting-date"
        autoComplete="new-password"
      />
      <FilterField
        name="title"
        label="title"
        submitBehavior="async"
        setValue={setTitle}
        value={title}
      />
      <FilterField
        name="religion"
        label="religion"
        submitBehavior="async"
        setValue={setReligion}
        value={religion}
      />
      <FilterField
        name="location"
        label="Location"
        submitBehavior="async"
        setValue={setLocation}
        value={location}
      />
      <FilterField
        regex={onlynumerics_REGEX}
        name="maxAge"
        label="Maximum age"
        submitBehavior="async"
        setValue={setMaxAge}
        value={maxAge}
      />
      <FilterField
        regex={onlynumerics_REGEX}
        name="minAge"
        label="Minimum age"
        submitBehavior="async"
        setValue={setMinAge}
        value={minAge}
      />
      <FilterField
        // regex={onlynumerics_REGEX}
        name="salary"
        label="Salary"
        submitBehavior="async"
        setValue={setSalary}
        value={salary}
      /> */}
      {/* <FilterField
        regex={onlynumerics_REGEX}
        name="yearsOfExperience"
        label="Years of experience"
        submitBehavior="async"
        setValue={setYearsOfExperiense}
        value={yearsOfExperiense}
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
        onChange={(e) => setJobType(e.target.value || null, { scroll: false, shallow: true })}
      /> */}
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
        placeholder={t('region')}
        options={[
          { name: t('region'), value: '' },
          ...(listTranslator(router.locale || '', regions?.data || [])
            .sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
            .map((el) => ({
              name: el.attributes.name,
              value: el.id.toString(),
            })) || []),
        ]}
        value={values.region || ''}
        onChange={async (e) =>
          setValues((prevState) => ({ ...prevState, region: e.target.value, city: '' }))
        }
      />
      <Select
        className="text-caption min-w-[250px] lg:min-w-[auto] w-full lg:flex-1"
        placeholder={t('city')}
        options={[
          { name: t('city'), value: '' },
          ...(listTranslator(router.locale || '', cities?.data || [])
            .sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
            .map((el) => ({
              name: el.attributes.name,
              value: el.id.toString(),
            })) || []),
        ]}
        value={values.city || ''}
        onChange={(e) => setValues((prevState) => ({ ...prevState, city: e.target.value }))}
      />
      {/* <Switch
        checked={values.drivingLicense || false}
        onChange={(e) =>
          setValues((prevState) => ({ ...prevState, drivingLicense: e.target.checked }))
        }>
        {t('drivingLicense')}
      </Switch> */}
    </>
  );
};

export default JobsFilterLabelsMobile;
