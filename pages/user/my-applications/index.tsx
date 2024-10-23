// react
import { ReactNode, useEffect } from 'react';

// next js
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

// api
import { getMyApplications } from '@src/api/GET/getMyApplications';

// react-query
import { dehydrate, QueryClient, useQuery } from 'react-query';

// utils
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';

// utils
import { repeatedColors } from '@src/utils/colorUtils';

// types
import { IJobPost } from '@src/@types/jobPost';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import JobPostCard from '@src/components/global/JobPostCard';
import JobPostSkeleton from '@src/components/global/skeleton/JobPostSkeleton';
import Pagination from '@src/components/Pagination';

interface IProps {
  children?: ReactNode;
}

const colors = ['green', 'blue', 'orange'];

const MyApplications: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const user = useUserStore((state) => state.userState, shallow);
  const isHelper = user?.userType === 'helper';
  const {
    data: applications,
    isIdle,
    isLoading,
  } = useQuery<{
    results: { id: number; description: string; job: IJobPost }[];
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }>(['get-my-applications'], () => getMyApplications());

  const page = +Number((router.query['page'] as string) || '') || 1;

  useEffect(() => {
    if (!isHelper) {
      router.push(ROUTES_URL.navRoutes.user.profile);
    }
  }, [router, isHelper]);

  return (
    <>
      <Head>
        <title>{t('myApplications')}</title>
        <meta name="description" content="my applications" />
      </Head>
      <UserLayout
        mobileTitle={t('myApplications')}
        routeLinks={[
          { name: t('myProfile'), url: ROUTES_URL.navRoutes.user.profile, isLink: true },
          { name: t('myApplications'), url: '#', isLink: false },
        ]}>
        {/* employer job posts */}
        <div className="w-full flex flex-col lg:items-start items-center gap-10">
          {!isLoading || !isIdle ? (
            applications && applications?.results?.length > 0 ? (
              applications?.results
                .filter((el) => el.job !== null)
                .map((post, index) => (
                  <JobPostCard
                    applicationId={post?.id}
                    postType="helper-application"
                    key={index}
                    JobPostData={post?.job}
                    color={repeatedColors({
                      length: applications?.results.length,
                      selectedIndex: index,
                      colorList: colors,
                    })}
                  />
                ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 mt-10">
                <Typography variant="caption">{t('youHaveNotAppliedForAnyJobYet')}</Typography>
                {router.query && (
                  <Link href={ROUTES_URL.navRoutes.vacancies} shallow scroll={false}>
                    <Button loadMoreButton>
                      <Typography variant="caption">{t('applyForJobs')}</Typography>
                    </Button>
                  </Link>
                )}
              </div>
            )
          ) : (
            Array.from(Array(10).keys()).map((_, idx) => <JobPostSkeleton key={idx} />)
          )}
          {applications && applications.results?.length ? (
            <Pagination
              pageCount={applications.pagination.pageCount || 1}
              pageSize={10}
              total={applications.pagination.total}
            />
          ) : (
            <></>
          )}
        </div>
      </UserLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { locale } = ctx;
  let forceLogout = false;
  try {
    await queryClient.fetchQuery<{ results: any[] }>(['get-my-applications'], () =>
      getMyApplications(ctx)
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

export default MyApplications;
