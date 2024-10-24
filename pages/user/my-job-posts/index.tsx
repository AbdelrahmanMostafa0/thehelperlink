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

// react-query
import { dehydrate, QueryClient, useQuery } from 'react-query';

// routes
import { ROUTES_URL } from '@src/routes';

// utils
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';
import { repeatedColors } from '@src/utils/colorUtils';

// layout
import UserLayout from '@src/layout/UserLayout';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';
import { shallow } from 'zustand/shallow';

// api
import { getEmployerJobs } from '@src/api/GET/getEmployerJobs';

// types
import { IJobPost } from '@src/@types/jobPost';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import JobPostCard from '@src/components/global/JobPostCard';
import Pagination from '@src/components/Pagination';
import JobPostSkeleton from '@src/components/global/skeleton/JobPostSkeleton';

interface IProps {
  children?: ReactNode;
}

const dummyJobPosts = [
  {
    id: 1,
    title: 'Nanny',
    jobType: ['Full-Time', 'Live-In'],
    employer: {
      location: {
        region: {
          name: 'Riyadh',
          localizations: [{ locale: 'ar', name: 'الرياض' }],
        },
        city: {
          name: 'Al Olaya',
          localizations: [{ locale: 'ar', name: 'العليا' }],
        },
      },
      adults: 2,
      children: 3,
    },
    nationality: {
      name: 'Filipino',
      localizations: [{ locale: 'ar', name: 'فلبيني' }],
    },
    gender: 'Female',
    minAge: 25,
    maxAge: 40,
    yearsOfExperience: 5,
    religion: 'Christian',
    languages: ['English', 'Arabic'],
    startingDate: '2024-11-01T00:00:00Z',
    publishedAt: '2024-10-01T00:00:00Z',
    active: true,
    isFavourite: true,
    applicants: {
      count: 2,
    },
  },
  {
    id: 2,
    title: 'Housemaid',
    jobType: ['Part-Time', 'On-Site'],
    employer: {
      location: {
        region: {
          name: 'Jeddah',
          localizations: [{ locale: 'ar', name: 'جدة' }],
        },
        city: {
          name: 'Al Hamra',
          localizations: [{ locale: 'ar', name: 'الحمرا' }],
        },
      },
      adults: 2,
      children: 1,
    },
    nationality: {
      name: 'Sri Lankan',
      localizations: [{ locale: 'ar', name: 'سريلانكي' }],
    },
    gender: 'Female',
    minAge: 30,
    maxAge: 45,
    yearsOfExperience: 10,
    religion: 'Buddhist',
    languages: ['English', 'Arabic'],
    startingDate: '2024-12-01T00:00:00Z',
    publishedAt: '2024-09-20T00:00:00Z',
    active: false,
    isFavourite: false,
    applicants: {
      count: 1,
    },
  },
  {
    id: 3,
    title: 'Cook',
    jobType: ['Full-Time', 'Live-In'],
    employer: {
      location: {
        region: {
          name: 'Dammam',
          localizations: [{ locale: 'ar', name: 'الدمام' }],
        },
        city: {
          name: 'Al Faisaliyah',
          localizations: [{ locale: 'ar', name: 'الفيصلية' }],
        },
      },
      adults: 3,
      children: 2,
    },
    nationality: {
      name: 'Thai',
      localizations: [{ locale: 'ar', name: 'تايلاندي' }],
    },
    gender: 'Male',
    minAge: 28,
    maxAge: 50,
    yearsOfExperience: 8,
    religion: 'Buddhist',
    languages: ['English', 'Arabic'],
    startingDate: '2024-11-15T00:00:00Z',
    publishedAt: '2024-09-30T00:00:00Z',
    active: true,
    isFavourite: true,
    applicants: {
      count: 3,
    },
  },
  {
    id: 4,
    title: 'Gardener',
    jobType: ['Part-Time', 'On-Site'],
    employer: {
      location: {
        region: {
          name: 'Khobar',
          localizations: [{ locale: 'ar', name: 'الخبر' }],
        },
        city: {
          name: 'Corniche',
          localizations: [{ locale: 'ar', name: 'الكورنيش' }],
        },
      },
      adults: 1,
      children: 0,
    },
    nationality: {
      name: 'Kenyan',
      localizations: [{ locale: 'ar', name: 'كيني' }],
    },
    gender: 'Male',
    minAge: 22,
    maxAge: 40,
    yearsOfExperience: 3,
    religion: 'Christian',
    languages: ['English', 'Arabic'],
    startingDate: '2024-12-20T00:00:00Z',
    publishedAt: '2024-10-05T00:00:00Z',
    active: false,
    isFavourite: false,
    applicants: {
      count: 0,
    },
  },
];

const colors = ['green', 'blue', 'orange'];

const MyJobPosts: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const user = useUserStore((state) => state.userState, shallow);
  const isHelper = user?.userType === 'helper';

  // useEffect(() => {
  //   if (isHelper && user?.email !== 'elrefai99@gmail.com') {
  //     router.push(ROUTES_URL.navRoutes.user.profile);
  //   }
  // }, [router, isHelper]);

  // const page = +Number((router.query['page'] as string) || '') || 1;

  // fetch job posts list csr
  // const {
  //   data: jobPosts,
  //   isIdle,
  //   isLoading,
  // } = useQuery<{
  //   results: IJobPost[];
  //   pagination: {
  //     page: number;
  //     pageSize: number;
  //     pageCount: number;
  //     total: number;
  //   };
  // }>(
  //   ['employer-job-posts', +page, router.locale],
  //   () => getEmployerJobs({ page: page, pageSize: 10, locale: router.locale }),
  //   {}
  // );

  // console.log('jobPosts:', jobPosts);

  return (
    <>
      <Head>
        <title>{t('myJobPosts')}</title>
        <meta name="description" content="my job posts" />
      </Head>
      <UserLayout mobileTitle={t('myJobPosts')}>
        {/* employer job posts */}
        <div className="w-full flex flex-col lg:items-start items-center gap-10">
          {dummyJobPosts &&
            (dummyJobPosts.length > 0 ? (
              dummyJobPosts.map((post, index) => (
                <JobPostCard
                  postType="employer-post"
                  key={index}
                  // @ts-ignore
                  JobPostData={post}
                  color={repeatedColors({
                    length: dummyJobPosts.length,
                    selectedIndex: index,
                    colorList: colors,
                  })}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 mt-10">
                <Typography variant="caption">{t('youHaveNoJobPostsYetTryToCreateOne')}</Typography>
                {router.query && (
                  <Link href={ROUTES_URL.navRoutes.postAJob} shallow scroll={false}>
                    <Button loadMoreButton>
                      <Typography variant="caption">{t('postAJob')}</Typography>
                    </Button>
                  </Link>
                )}
              </div>
            ))}

          {/* {dummyJobPosts && dummyJobPosts?.length ? (
            <Pagination
              pageCount={jobPosts.pagination.pageCount || 1}
              pageSize={10}
              total={jobPosts.pagination.total}
            />
          ) : (
            <></>
          )} */}
        </div>
      </UserLayout>
    </>
  );
};

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const queryClient = new QueryClient();
//   const { locale, query } = ctx;
//   let forceLogout = false;
//   try {
//     // fetch employer job posts
//     await queryClient.prefetchQuery<{
//       results: IJobPost[];
//       pagination: {
//         page: number;
//         pageSize: number;
//         pageCount: number;
//         total: number;
//       };
//     }>(['employer-job-posts', Number(query['page'] || '') || 1, locale], () =>
//       getEmployerJobs({ page: +query['page']! || 1, pageSize: 10, locale, ctx })
//     );
//   } catch (error: any) {
//     if (error.response?.data?.error?.status === 403) {
//       forceLogout = true;
//     }
//   }

//   return ssrAuthHandler({
//     ctx,
//     props: {
//       ...(await serverSideTranslations(locale || '', ['common', 'user'])),
//       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//     },
//     // forceLogout,
//   });
// };

export default MyJobPosts;
