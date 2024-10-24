// NEXT JS
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { MdOutlineUploadFile } from 'react-icons/md';
// i18next
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// api
import { getJobPosts } from '@src/api/GET/getJobPosts';

// react-query
import { dehydrate, QueryClient } from 'react-query';

// types
import { IJobPost } from '@src/@types/jobPost';

// utils
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';

// components
import TopSection from '@src/components/home/TopSection';
import HowItWorks from '@src/components/home/HowItWorks';
import Slider from '@src/components/home/Slider';
import Link from 'next/link';
import { getLangBoolean } from '@src/utils/getLangBoolean';
import { shallow } from 'zustand/shallow';
import { useUserStore } from '@src/zustand_stores/user';

export default function Home() {
  const router = useRouter();
  const lang = getLangBoolean();
  const user = useUserStore((state) => state.userState, shallow);
  console.log(user);
  const linkToApply = user ? '/vacancies' : '/auth/register';

  // const { data: jobPosts } = useQuery<{ results: IJobPost[] }>(['get-job-posts'], () =>
  //   getJobPosts({ pageSize: 5, page: 1, queries: router.query })
  // );

  return (
    <>
      <Head>
        <title>The Helper Link</title>
        <meta
          name="description"
          content="A perfect link between possible employers that look for helpers!"
        />
      </Head>
      <div className="flex flex-col pt-24 w-full gap-28 pb-20">
        <TopSection />
        <div className="flex items-start justify-center">
          <Link
            href={linkToApply}
            className="max-w-[350px] text-center -mt-14 w-full borer py-4 font-heavy px-4 flex items-center gap-2 justify-center rounded-lg border border-darkGreen-400 bg-lightGreen-500 text-darkBlue-500 hover:bg-lightGreen-300 duration-150">
            {lang ? 'التقديم على وظيفة' : 'Register up as a Helper'}
            <MdOutlineUploadFile className="text-xl" />
          </Link>
        </div>
        <HowItWorks />
        {/* <RecentJob jobPosts={jobPosts?.results?.slice(0, 3)} /> */}
        {/* <Statistics /> */}
        <Slider />
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { locale, query } = ctx;
  let forceLogout = false;
  try {
    await queryClient.fetchQuery<{ results: IJobPost[] }>(['get-job-posts'], () =>
      getJobPosts({ pageSize: 5, page: 1, queries: query })
    );
  } catch (error: any) {
    if (error.response?.data?.error?.status === 403) {
      forceLogout = true;
    }
  }

  return ssrAuthHandler({
    ctx,
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'home'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    forceLogout,
  });
};
