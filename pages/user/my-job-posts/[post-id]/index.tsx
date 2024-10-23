// react
import { ReactNode, useEffect } from 'react';

// next js
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// yup & react-user-form
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';
import { shallow } from 'zustand/shallow';

// api
import { getJobTypes } from '@src/api/GET/getJobTypes';
import { getNationalities } from '@src/api/GET/getNationalities';
import { getRegions } from '@src/api/GET/getRegions';
import { getCities } from '@src/api/GET/getCities';

// react-query
import { dehydrate, QueryClient, useQuery } from 'react-query';

// react quill
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
import 'react-quill/dist/quill.snow.css';

// react-date-object
import DateObject from 'react-date-object';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';

// utils
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';
import {
  titleSchema,
  religionSchema,
  yearsOfExperienceSchema,
  startingDateSchema,
  minAgeSchema,
  maxAgeSchema,
  genderSchema,
  nationalitySchema,
  languagesSchema,
  validDrivingLicenseSchema,
  citySchema,
  countrySchema,
  skillsSchema,
  richTextEditorSchema,
} from '@src/utils/schema';
import { listTranslator } from '@src/utils/listTranslator';

// types
import { IDataList } from '@src/@types/common';
import { IJobPost } from '@src/@types/jobPost';

// routes
import { ROUTES_URL } from '@src/routes';

// api
import { editJob } from '@src/api/PUT/editJob';
import { getSingleJobPost } from '@src/api/GET/getJobPosts';

// layout
import UserLayout from '@src/layout/UserLayout';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import TextField from '@src/components/TextField';
import Select from '@src/components/Select';
import Switch from '@src/components/Switch';
import MultiChoice, { IListItem } from '@src/components/MultiChoice';
const Datepicker = dynamic(() => import('@src/components/Datepicker'), {
  ssr: false,
});

interface IProps {
  children?: ReactNode;
}

export interface IFormInputs {
  title: string;
  description: string;
  nationality: string;
  religion: string;
  startingDate: string;
  skills: Array<IListItem>;
  minAge: string;
  maxAge: string;
  gender: string;
  region: string;
  city: string;
  drivingLicense: boolean;
  yearsOfExperience: string;
  languages: Array<IListItem>;
}

const schema = yup
  .object({
    title: titleSchema,
    description: richTextEditorSchema,
    nationality: nationalitySchema(false),
    religion: religionSchema(false),
    startingDate: startingDateSchema(false),
    skills: skillsSchema(true),
    gender: genderSchema,
    minAge: minAgeSchema,
    maxAge: maxAgeSchema,
    // region: countrySchema,
    // city: citySchema,
    drivingLicense: validDrivingLicenseSchema,
    yearsOfExperience: yearsOfExperienceSchema(true),
    languages: languagesSchema(true),
  })
  .required();

const EditPostJob: React.FC<IProps> = () => {
  const router = useRouter();
  const { t: tCommon } = useTranslation('common') as any;
  const { t } = useTranslation('user') as any;
  const user = useUserStore((state) => state.userState, shallow);
  const isHelper = user?.userType === 'helper';

  useEffect(() => {
    if (isHelper) {
      router.push(ROUTES_URL.navRoutes.user.profile);
    }
  }, [router, isHelper]);

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

  useEffect(() => {
    if (!user || user.userType === 'helper') {
      router.push(ROUTES_URL.navRoutes.home);
    }
  }, [router, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      startingDate: '',
      languages: [],
      skills: [],
      drivingLicense: false,
      city: '',
      description: '',
      gender: '',
      maxAge: '',
      minAge: '',
      nationality: '',
      region: '',
      religion: '',
      title: '',
      yearsOfExperience: '',
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    editJob(
      singleJobData?.id || 0,
      {
        ...data,
        city: user?.employer?.location.city?.id.toString() || '',
        region: user?.employer?.location.region?.id.toString() || '',
      },
      router,
      t
    ).then((res) => {
      if (res?.status === 200) {
        refetch();
        setTimeout(() => {
          router.push(ROUTES_URL.navRoutes.user.jobPosts.main);
        }, 3000);
      }
    });
  };

  // fetch singler job csr
  const {
    isIdle,
    data: singleJobData,
    isLoading,
    refetch,
  } = useQuery<IJobPost>(
    ['single-jobPost', router.query['post-id'], router.locale],
    () => getSingleJobPost((router.query['post-id'] as string) || '', router.locale),
    {
      enabled: router.query['post-id'] !== undefined,
    }
  );

  const { data: cities } = useQuery<{ data: IDataList[] }>(
    ['cities', router.locale, watch('region')],
    () => getCities(router.locale || '', watch('region') || undefined, true),
    {
      enabled: regions && regions.data.length > 0,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (watch('region') !== singleJobData?.location?.region?.id.toString()) {
      setValue('city', '');
    }
  }, [watch('region')]);

  useEffect(() => {
    reset({
      startingDate: singleJobData?.startingDate,
      skills:
        singleJobData?.jobType?.map((jobType) => ({
          name: jobType.name,
          value: jobType.id.toString(),
        })) || [],
      languages: singleJobData?.languages?.map((lang) => ({ name: lang, value: lang })) || [],
      drivingLicense: singleJobData?.drivingLicense,
      description: singleJobData?.description,
      maxAge: singleJobData?.maxAge?.toString(),
      minAge: singleJobData?.minAge?.toString(),
      title: singleJobData?.title,
      yearsOfExperience: singleJobData?.yearsOfExperience || '',
      gender: singleJobData?.gender || '',
      nationality: singleJobData?.nationality?.id?.toString() || '',
      city: singleJobData?.location?.city?.id.toString() || '',
      region: singleJobData?.location?.region?.id.toString() || '',
      religion: singleJobData?.religion || 'muslim',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleJobData?.title, router.locale]);

  return (
    <>
      <Head>
        <title>{t('myJobPost')}</title>
        <meta name="description" content="my job posts" />
      </Head>
      <UserLayout
        isLoading={isIdle || isLoading}
        page="edit-my-job-posts"
        post={singleJobData || undefined}>
        {/* employer job posts */}
        <div className="w-full bg-white rounded-20 shadow-custom-shadow flex flex-col text-center py-8 px-5 md:px-9 lg:px-16">
          <form className="w-full flex flex-col text-center" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h3" className="pb-14" textTransform="first-letter-capital">
              {t('editJob')}
            </Typography>
            <div className="flex flex-col gap-7">
              <TextField
                variant="underline"
                placeholder={t('jobTitle')}
                className="text-body1"
                {...register('title')}
                errorText={errors.title?.message}
                error={errors.title?.message !== undefined}
                autoComplete="new-password"
              />

              <div className="flex flex-col items-start gap-2 w-full">
                <Typography variant="h6" fontweight="book">
                  {t('description')}
                </Typography>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      className="[&>.ql-container>.ql-editor]:min-h-[200px] [&>.ql-container]:rounded-bl [&>.ql-container]:rounded-br [&>.ql-toolbar]:rounded-tl [&>.ql-toolbar]:rounded-tr w-full !font-AvenirArabic rounded"
                      modules={{
                        toolbar: {
                          container: [
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            // ['blockquote', 'code-block'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link', 'image'],
                            ['clean'],
                          ],
                        },
                      }}
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <Typography
                  variant="caption"
                  className="text-darkOrange-500 ltr:text-left rtl:text-right">
                  {tCommon(errors.description?.message)}
                </Typography>
              </div>
              <Select
                options={[
                  { name: t('nationality'), value: '' },
                  ...(listTranslator(router.locale || '', nationalities?.data || [])
                    ?.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
                    .map((el) => ({
                      name: el.attributes.name,
                      value: el.id.toString(),
                    })) || []),
                ]}
                label={
                  <Typography variant="h6" fontweight="book">
                    {t('nationalityOptional')}
                  </Typography>
                }
                className=" text-caption"
                {...register('nationality')}
                errorText={errors.nationality?.message}
                error={errors.nationality?.message !== undefined}
                autoComplete="new-password"
              />
              <Select
                options={[
                  { name: t('NoPreference'), value: '' },
                  { name: t('muslim'), value: 'muslim' },
                  { name: t('non-muslim'), value: 'non-muslim' },
                ]}
                label={
                  <Typography variant="h6" fontweight="book">
                    {t('religionOptional')}
                  </Typography>
                }
                className=" text-caption"
                {...register('religion')}
                errorText={errors.religion?.message}
                error={errors.religion?.message !== undefined}
                autoComplete="new-password"
              />
              <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
                <Datepicker
                  label={
                    <Typography variant="h6" fontweight="book">
                      {t('startingDateOptional')}
                    </Typography>
                  }
                  name="startingDate"
                  className="text-caption"
                  placeholder={t('startingDate')}
                  value={watch('startingDate')}
                  onChange={(date) => {
                    const newDate = new DateObject(date as any);
                    newDate.convert(gregorian, gregorian_en);
                    setValue('startingDate', newDate.format('YYYY-MM-DD'));
                  }}
                  minDate={0}
                  maxDate={null}
                  id="starting-date"
                  errorText={errors.startingDate?.message}
                  error={errors.startingDate?.message !== undefined}
                  autoComplete="new-password"
                />
              </div>
              <div className="w-full flex flex-col gap-3 items-start">
                <Typography variant="h6" fontweight="book">
                  {t('ageRange')}
                </Typography>
                <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
                  <TextField
                    // label={
                    //   <Typography variant="h6" fontweight="book">
                    //     {t('ageRange')}
                    //   </Typography>
                    // }
                    variant="bordered"
                    placeholder={t('minimumAge')}
                    className="text-caption px-2"
                    {...register('minAge')}
                    errorText={errors.minAge?.message}
                    error={errors.minAge?.message !== undefined}
                    autoComplete="new-password"
                  />
                  <TextField
                    // label={
                    //   <Typography variant="h6" fontweight="book">
                    //     {t('ageRange')}
                    //   </Typography>
                    // }
                    variant="bordered"
                    placeholder={t('maximumAge')}
                    className="text-caption px-2"
                    {...register('maxAge')}
                    errorText={errors.maxAge?.message}
                    error={errors.maxAge?.message !== undefined}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <Select
                options={[
                  { name: t('male'), value: 'male' },
                  { name: t('female'), value: 'female' },
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
              {/* <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
                <Controller
                  control={control}
                  name="region"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      ref={ref}
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
                      value={value}
                      onChange={onChange}
                      // {...register('region')}
                      errorText={errors.region?.message}
                      error={errors.region?.message !== undefined}
                      autoComplete="new-password"
                    />
                  )}
                /> */}

              {/* {cities && cities?.data.length > 0 && ( */}
              {/* <Controller
                  control={control}
                  name="city"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      ref={ref}
                      options={[
                        { name: t('city'), value: '' },
                        ...(listTranslator(router.locale || '', cities?.data || [])
                          ?.sort((a, b) => a.attributes.name?.localeCompare(b.attributes.name))
                          .map((el) => ({
                            name: el.attributes.name,
                            value: el.id.toString(),
                          })) || []),
                      ]}
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
              </div> */}

              <div className="flex items-start w-full sm:flex-row flex-col sm:gap-2 gap-7">
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
              </div>
              <MultiChoice
                label={
                  <Typography variant="h6" fontweight="book">
                    {t('jobType')}
                  </Typography>
                }
                list={[
                  ...(listTranslator(router.locale || '', jobTypes?.data || []).map((el) => ({
                    name: el.attributes.name,
                    value: el.id.toString(),
                  })) || []),
                ]}
                selectedItems={watch('skills')}
                onChange={(list) => setValue('skills', list)}
                errorText={errors.skills?.message}
                error={errors.skills?.message !== undefined}
              />

              <MultiChoice
                label={
                  <Typography variant="h6" fontweight="book">
                    {t('spokenLanguages')}
                  </Typography>
                }
                list={[
                  { value: 'english', name: t('english') },
                  { value: 'arabic', name: t('arabic') },
                ]}
                selectedItems={watch('languages')}
                onChange={(list) => setValue('languages', list)}
                errorText={errors.languages?.message}
                error={errors.languages?.message !== undefined}
              />
              <Controller
                control={control}
                name="drivingLicense"
                render={({ field: { onChange, value } }) => (
                  <Switch onChange={onChange} checked={value}>
                    {t('drivingLicense')}
                  </Switch>
                )}
              />
            </div>

            <Button type="submit" variant="bordered" color="green" className="py-5 mt-8">
              <Typography variant="caption">{t('saveJobPost')}</Typography>
            </Button>
          </form>
        </div>
      </UserLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { locale, query } = ctx;
  let forceLogout = false;
  const postId: string = query['post-id'] as string;

  try {
    // fetch single job post ssr
    if (postId) {
      await queryClient.prefetchQuery<{ data: IJobPost }>(['single-jobPost', postId, locale], () =>
        getSingleJobPost(postId || '', locale, ctx)
      );
    }
    await queryClient.fetchQuery<{ data: IDataList[] }>(['job-types', locale], () =>
      getJobTypes(locale || '')
    );
    await queryClient.fetchQuery<{ data: IDataList[] }>(['nationalities', locale], () =>
      getNationalities(locale || '')
    );
  } catch (error: any) {
    if (error.response?.data?.error?.status === 403) {
      forceLogout = true;
    }
  }

  return ssrAuthHandler({
    ctx,
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'user'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    forceLogout,
  });
};

export default EditPostJob;
