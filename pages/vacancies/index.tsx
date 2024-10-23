// react
import { ReactNode, useEffect, useState, useRef } from 'react';

// next js
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// i18next
import { useTranslation } from 'next-i18next';

// next-usequerystate
import { useQueryState } from 'next-usequerystate';

// utils
import { colorDetector } from '@src/utils/colorUtils';
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';

// types
import { IJobPost } from '@src/@types/jobPost';

// react-query
import { dehydrate, QueryClient, useQuery } from 'react-query';

// api
import { getJobPosts, getSingleJobPost } from '@src/api/GET/getJobPosts';

// layout
import VacanciesLayout from '@src/layout/vacanciesLayout';

// i18n-next
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// hooks
import useMediaQuery from '@src/hooks/useMediaQuery';

// components
import DetailJobPost from '@src/components/vacancies/DetailJobPost';
import DetailSkeleton from '@src/components/global/skeleton/DetailSkeleton';

interface IProps {
  children?: ReactNode;
}

const Vacancies: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('vacancies');

  const [currentJob, setCurrentJob] = useState<IJobPost | null>(null);
  const [currentJobId, setCurrentJobId] = useQueryState('currentJobId');
  const [mobilePage, setMobilePage] = useState<'detail' | 'jobs'>('jobs');

  const [page, setPage] = useQueryState('page', { defaultValue: '1' });
  const [pageCount, setPageCount] = useState(5);
  const [total, setTotal] = useState(0);

  // job list max-height
  const [maxHeightJobList, setMaxHeightJobList] = useState<string | number>('auto');

  const routerQueries = { ...router.query };
  delete routerQueries['currentJobId'];

  // fetch job posts list csr
  const {
    data: jobPosts,
    isFetched,
    isLoading,
    refetch: refetchJobPosts,
  } = useQuery<{
    results: IJobPost[];
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }>(['get-job-posts', +page, routerQueries, router.locale], () =>
    getJobPosts({ page: +page, pageSize: 10, queries: routerQueries, locale: router.locale })
  );

  // update pagination state
  useEffect(() => {
    if (jobPosts?.results?.length) {
      setTotal(jobPosts?.pagination.total);
      setPageCount(jobPosts.pagination.pageCount);
    }
  }, [jobPosts]);

  // fetch singler job csr
  const {
    isIdle,
    data: singleJobData,
    isLoading: isSingleJobLoading,
    refetch: refetchSingleJob,
  } = useQuery<IJobPost>(
    ['single-jobPost', currentJobId, router.locale],
    () => getSingleJobPost(currentJobId || '', router.locale),
    {
      enabled: currentJobId !== null || (jobPosts?.results && jobPosts.results.length > 0),
    }
  );

  // if theres no currentJobId, selects the first job post
  useEffect(() => {
    if (!currentJobId && jobPosts?.results && jobPosts?.results.length > 0) {
      setCurrentJob(jobPosts?.results[0] || null);
      // setCurrentJobId(jobPosts?.results[0].id?.toString(), { scroll: false, shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentJobId, jobPosts?.results]);

  // when we have a valid currentJobId we select the single job post data
  useEffect(() => {
    if (currentJobId && singleJobData) {
      setCurrentJob(singleJobData);
      setMobilePage('detail');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleJobData, currentJobId]);

  return (
    <>
      <Head>
        <title>{t('vacanciesPage')}</title>
        <meta name="description" content="vacancies page" />
      </Head>
      <VacanciesLayout
        refetchJobPosts={refetchJobPosts}
        refetchSingleJob={refetchSingleJob}
        isLoading={isLoading}
        maxHeightJobList={maxHeightJobList}
        total={total}
        pageCount={pageCount}
        setMobilePage={setMobilePage}
        mobilePage={mobilePage}
        jobPosts={jobPosts?.results}>
        {isIdle || isSingleJobLoading ? (
          <DetailSkeleton setMaxHeight={setMaxHeightJobList} />
        ) : (
          <DetailJobPost
            setMaxHeightJobList={setMaxHeightJobList}
            JobPostData={currentJob || undefined}
            color={colorDetector(currentJob?.id || 0)}
            refetchJobPosts={refetchJobPosts}
          />
        )}
      </VacanciesLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { locale, query } = ctx;
  const routerQueries = { ...query };
  delete routerQueries['currentJobId'];
  const postId: string = query['currentJobId'] as string;
  let forceLogout = false;
  try {
    // fetch job posts list ssr
    await queryClient.fetchQuery<{
      results: IJobPost;
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    }>(['get-job-posts', +query['page']! || 1, routerQueries, locale], () =>
      getJobPosts({ page: +query['page']! || 1, pageSize: 10, queries: routerQueries, locale })
    );

    // fetch single job post ssr
    if (postId) {
      await queryClient.prefetchQuery<{ data: IJobPost }>(['single-jobPost', postId, locale], () =>
        getSingleJobPost(postId || '', locale, ctx)
      );
    }
  } catch (error: any) {
    if (error.response?.data?.error?.status === 403) {
      forceLogout = true;
    }
  }

  return ssrAuthHandler({
    ctx,
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'vacancies'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    forceLogout,
  });
};

export default Vacancies;
