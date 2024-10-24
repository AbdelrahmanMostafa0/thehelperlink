// react
import { ReactNode, useEffect, useState } from 'react';

// next js
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// routes
import { ROUTES_URL } from '@src/routes';

// layout
import UserLayout from '@src/layout/UserLayout';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';
import { shallow } from 'zustand/shallow';
import { useCandidateSelection } from '@src/zustand_stores/candidateSelection';

// next-usequerystate
import { useQueryState } from 'next-usequerystate';

// utils

// react-query
import { dehydrate, QueryClient, useQuery } from 'react-query';

// api
import { getSingleJobPost } from '@src/api/GET/getJobPosts';
import { getJobCandidates } from '@src/api/GET/getJobCandidates';

// types
import { IJobPost } from '@src/@types/jobPost';
import { ICandidate } from '@src/@types/helper';

// icons
import { Info } from '@src/assets/icons';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import HelperCard from '@src/components/helpers/HelperCard';
import CandidatesFilter from '@src/components/user/employer-jobs/CandidatesFilter';
import HelpersListSkeleton from '@src/components/global/skeleton/HelpersListSkeleton';
import Pagination from '@src/components/Pagination';

interface IProps {
  children?: ReactNode;
}

const PostJobCandidates: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const { t: tCommon } = useTranslation('common');
  const user = useUserStore((state) => state.userState, shallow);
  const isHelper = user?.userType === 'helper';
  const jobId = router.query['post-id'] as string;
  // pagination states
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });

  const { isReadyToSend, changeCandidatesList, setIsReadyToSend } = useCandidateSelection(
    (state) => state
  );

  // remove currentHelperId query to stop unnecessary rerendering
  const routerQueries = { ...router.query };
  delete routerQueries['post-id'];

  // fetch helpers list list csr
  // const {
  //   data: candidates,
  //   isIdle: isCandidatesIdle,
  //   isLoading: isCandidatesLoading,
  // } = useQuery<{
  //   results: ICandidate[];
  //   pagination: {
  //     page: number;
  //     pageSize: number;
  //     pageCount: number;
  //     total: number;
  //   };
  // }>(['get-job-candidates', +page, routerQueries, jobId, router.locale], () =>
  //   getJobCandidates({ page: +page, pageSize: 10, queries: routerQueries, jobId: jobId || '' })
  // );

  // fetch single job csr
  // const {
  //   data: singleJobData,
  //   isIdle: isSingleJobDataIdle,
  //   isLoading: isSingleJobLoading,
  //   refetch: refetchSingleJob,
  // } = useQuery<IJobPost>(
  //   ['single-jobPost', jobId, router.locale],
  //   () => getSingleJobPost(jobId || '', router.locale),
  //   {
  //     enabled: jobId !== undefined,
  //   }
  // );

  // useEffect(() => {
  //   if (isHelper) {
  //     router.push(ROUTES_URL.navRoutes.user.profile);
  //   }
  // }, [router, isHelper]);

  useEffect(() => {
    return () => {
      setIsReadyToSend(false);
      changeCandidatesList([]);
    };
  }, []);

  const isActive = true;
  const dummyHelpers = [
    {
      id: 1,
      firstName: 'Maria',
      lastName: 'Santos',
      profileImage: {
        url: '/images/user-avatar.png',
      },
      nationality: {
        name: 'Filipino',
        localizations: [{ locale: 'ar', name: 'فلبيني' }],
      },
      jobType: ['Nanny', 'Cook'],
      bio: 'Experienced in providing full-time care for children and preparing nutritious meals.',
      isFavourite: true,
      chatengineUsername: 'mariaSantos',
    },

    {
      id: 2,
      firstName: 'Grace',
      lastName: 'Muthoni',
      profileImage: {
        url: '/images/user-avatar.png',
      },
      nationality: {
        name: 'Kenyan',
        localizations: [{ locale: 'ar', name: 'كيني' }],
      },
      jobType: ['Housemaid'],
      bio: 'Skilled in housekeeping, laundry, and maintaining a clean environment.',
      isFavourite: false,
      chatengineUsername: 'graceMuthoni',
    },
    {
      id: 3,
      firstName: 'Somchai',
      lastName: 'Chaiya',
      profileImage: {
        url: '/images/user-avatar.png',
      },
      nationality: {
        name: 'Thai',
        localizations: [{ locale: 'ar', name: 'تايلاندي' }],
      },
      jobType: ['Gardener'],
      bio: 'Professional gardener with 5 years of experience maintaining residential gardens.',
      isFavourite: false,
      chatengineUsername: 'somchaiChaiya',
    },
    {
      id: 4,
      firstName: 'Anusha',
      lastName: 'Perera',
      profileImage: {
        url: '/images/user-avatar.png',
      },
      nationality: {
        name: 'Sri Lankan',
        localizations: [{ locale: 'ar', name: 'سريلانكي' }],
      },
      jobType: ['Nanny', 'Housemaid'],
      bio: 'Nanny and housemaid with a focus on childcare and household cleaning.',
      isFavourite: true,
      chatengineUsername: 'anushaPerera',
    },
  ];

  return (
    <>
      <Head>
        <title>
          {t('candidatesOfPost')} {router.query['post-id']}
        </title>
        <meta name="description" content="candidates of post" />
      </Head>
      <UserLayout>
        {/* employer job post candidates */}
        <div className="flex flex-col relative slg:mt-5">
          {/* {isActive && <CandidatesFilter />}
          {!isActive && !isSingleJobLoading && !isSingleJobDataIdle && (
            <Typography variant="body2" className="mb-2">
              {t('listOfSelectedCandidates')}
            </Typography>
          )} */}
          <div
            className={`flex items-center gap-4 text-black transition-all duration-300 ease-in-out ${
              isReadyToSend
                ? 'mb-4 static visible opacity-100'
                : 'mb-0 absolute top-0 invisible opacity-0'
            }`}>
            <Info className="w-6 h-6" />
            <Typography variant="body2" className="">
              {t('selectOneOrMoreCandidates')}
            </Typography>
          </div>
          {/* 
          {isActive ? (
            // candidates list when job post is active
            isCandidatesIdle || isCandidatesLoading ? (
              <HelpersListSkeleton mobilePage="helpers" />
            ) : candidates && candidates?.results.length > 0 ? ( */}
          <div
            className={`relative flex flex-col overflow-x-visible w-full gap-8 md:gap-0 md:w-[403px] max-h-[auto] md:shadow-custom-light-shadow rounded-[4px] slg:mt-10 mb-10`}>
            {dummyHelpers.map((user, index) => (
              // @ts-ignore
              <HelperCard key={index} userData={user} applicationId={user.id} isCandidate />
            ))}
          </div>
          {/* ) : (
              <div className="flex flex-col items-center justify-center gap-3 mt-10">
                <Typography variant="caption">
                  {routerQueries ? tCommon('couldNotFindHelpers') : tCommon('noHelperYet')}
                </Typography>
                {routerQueries && (
                  <Link
                    href={`${ROUTES_URL.navRoutes.user.jobPosts.main}/${router.query['post-id']}${ROUTES_URL.navRoutes.user.jobPosts.candidates}`}
                    shallow
                    scroll={false}>
                    <Button loadMoreButton>
                      <Typography variant="caption">{tCommon('clearFilters')}</Typography>
                    </Button>
                  </Link>
                )}
              </div>
            )
          ) : isSingleJobDataIdle || isSingleJobLoading ? (
            // selected candidates list when job post is not active
            <HelpersListSkeleton mobilePage="helpers" />
          ) : singleJobData?.acceptedApplicants && singleJobData?.acceptedApplicants?.length > 0 ? (
            <div
              className={`relative flex flex-col overflow-x-visible w-full gap-8 md:gap-0 md:w-[403px] max-h-[auto] md:shadow-custom-light-shadow rounded-[4px] slg:mt-10 mb-10`}>
              {singleJobData?.acceptedApplicants?.map((user, index) => (
                <HelperCard key={index} userData={user.helper} />
              ))}
            </div>
          ) : null} */}
          {/* pagination */}
          {/* {candidates && candidates.results?.length && isActive ? (
            <Pagination
              pageCount={candidates.pagination.pageCount || 1}
              pageSize={10}
              total={candidates.pagination.total}
            />
          ) : (
            <></>
          )} */}
        </div>
      </UserLayout>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: any }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'user'])),
    },
  };
};

export default PostJobCandidates;
