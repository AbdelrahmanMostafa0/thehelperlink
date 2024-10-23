// react
import { ReactNode, useEffect, useState } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

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

// next-usequerystate
import { useQueryState } from 'next-usequerystate';

// components
import Typography from '@src/components/Typography';
import Select from '@src/components/Select';
import FilterField from '@src/components/FilterField';

interface IProps {
  children?: ReactNode;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobsFilterLabelDesktop: React.FC<IProps> = ({ setModalOpen }) => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;

  const { data: nationalities } = useQuery<{ data: IDataList[] }>(
    ['nationalities', router.locale],
    () => getNationalities(router.locale || '')
  );
  const { data: jobTypes } = useQuery<{ data: IDataList[] }>(['job-types', router.locale], () =>
    getJobTypes(router.locale || '')
  );

  const { data: regions } = useQuery<{ data: IDataList[] }>(['regions', router.locale], () =>
    getRegions(router.locale || '')
  );

  const [jobType, setJobType] = useQueryState('jobType');
  // const [nationality, setNationality] = useQueryState('nationality');
  const [region, setRegion] = useQueryState('region');
  const [city, setCity] = useQueryState('city');
  const [gender, setGender] = useQueryState('gender');
  const [yearsOfExperience, setYearsOfExperience] = useQueryState('yearsOfExperience');
  const [minAgeQuery, setMinAgeQuery] = useQueryState('minAge');
  const [maxAgeQuery, setMaxAgeQuery] = useQueryState('maxAge');
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });
  const [isInit, setIsInit] = useState(true);
  const [recentRegion, setRecentRegion] = useState<string | null>(null);

  const { data: cities } = useQuery<{ data: IDataList[] }>(
    ['cities', router.locale, region],
    () => getCities(router.locale || '', region || undefined, true),
    {
      enabled: regions && regions.data.length > 0,
      staleTime: Infinity,
    }
  );

  // fields states
  // const [firstName, setFirstName] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');

  // check active filters
  const queries = { ...router.query };
  delete queries['currentJobId'];
  delete queries['page'];
  const queryList = Object.keys(queries).map((q) => q);

  useEffect(() => {
    setMinAge(minAgeQuery || '');
    setMaxAge(maxAgeQuery || ''); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minAgeQuery, maxAgeQuery]);

  // every time a filter gets changed page query param resets to 1
  useEffect(() => {
    if (!isInit) {
      setPage('1', { scroll: false, shallow: true });
    }
    setIsInit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minAgeQuery, maxAgeQuery, region, gender, jobType]);

  return (
    <>
      {/* {filtersType === 'helpers' && <SortSelect />} */}
      {/* <FilterField setValue={setLocation} value={location} name="location" submitBehavior="sync" /> */}
      <div className="flex items-center gap-1 max-w-[250px]">
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
        value={yearsOfExperience || ''}
        onChange={(e) =>
          setYearsOfExperience(e.target.value || null, { scroll: false, shallow: true })
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
        value={region || ''}
        onChange={async (e) => {
          await setRegion(e.target.value || null, { scroll: false, shallow: true });
          await setCity(null, { scroll: false, shallow: true });
        }}
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
        value={city || ''}
        onChange={(e) => setCity(e.target.value || null, { scroll: false, shallow: true })}
      />
      {/* <Select
        className="text-caption min-w-[250px] lg:min-w-[auto] w-full lg:flex-1"
        placeholder={t('gender')}
        options={[
          { name: t('gender'), value: '' },
          { name: t('male'), value: 'male' },
          { name: t('female'), value: 'female' },
          // { name: t('others'), value: 'others' },
        ]}
        value={gender || ''}
        onChange={(e) => setGender(e.target.value || null, { scroll: false, shallow: true })}
      />
      <Select
        className="text-caption min-w-[250px] lg:min-w-[auto] w-full lg:flex-1"
        placeholder={t('nationality')}
        options={[
          { name: t('nationality'), value: '' },
          ...(nationalities?.data
            ?.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
            .map((el) => ({
              name: el.attributes.name,
              value: el.id,
            })) || []),
        ]}
        value={nationality || ''}
        onChange={(e) => setNationality(e.target.value || null, { scroll: false, shallow: true })}
      /> */}
      {/* <span className="relative">
        {queryList.length > 0 && (
          <span className="flex absolute -top-1 ltr:-right-1 ltr:left-unset rtl:-left-1 rtl:right-unset">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-darkOrange-500 opacity-75" />
            <span className="w-3 h-3 rounded-full bg-darkOrange-500" />
          </span>
        )}
        <Button
          color="green"
          loadMoreButton
          onClick={() => setModalOpen(true)}
          className="py-[6px]">
          <Typography variant="caption">{t('showAllFilters')}</Typography>
        </Button>
      </span> */}
    </>
  );
};

export default JobsFilterLabelDesktop;
