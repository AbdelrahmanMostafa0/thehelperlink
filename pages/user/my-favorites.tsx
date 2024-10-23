// react
import { ReactNode, useEffect, useState } from 'react';

// next js
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// i18next
import { useTranslation, Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// react-query
import { dehydrate, QueryClient, useQuery } from 'react-query';

// routes
import { ROUTES_URL } from '@src/routes';

// layout
import UserLayout from '@src/layout/UserLayout';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';
import { shallow } from 'zustand/shallow';

// utils
import { repeatedColors } from '@src/utils/colorUtils';
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';

// icons
import { Heart } from '@src/assets/icons';

// types
import { IUser } from '@src/@types/user';
import { getMyProfile } from '@src/api/GET/getMyProfile';
import { IJobPost } from '@src/@types/jobPost';
import { IHelper } from '@src/@types/helper';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import JobPostCard from '@src/components/global/JobPostCard';
import HelperCard from '@src/components/helpers/HelperCard';
import HelpersListSkeleton from '@src/components/global/skeleton/HelpersListSkeleton';
import JobPostSkeleton from '@src/components/global/skeleton/JobPostSkeleton';

interface IProps {
  children?: ReactNode;
}

const colors = ['green', 'blue', 'orange'];

const MyFavorites: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const user = useUserStore((state) => state.userState, shallow);
  const isHelper = user?.userType === 'helper';
  const [jobPosts, setJobPosts] = useState<IJobPost[]>([]);
  const [favoriteHelpers, setFavoriteHelpers] = useState<IHelper[]>([]);

  const {
    data: userData,
    refetch,
    isLoading,
  } = useQuery<IUser>(['get-my-profile'], () => getMyProfile(undefined, router.locale));

  useEffect(() => {
    if (userData) {
      if (isHelper) {
        setJobPosts(
          userData.helper?.favouriteJobs
            ? userData.helper?.favouriteJobs?.map((el) => ({ ...el, isFavourite: true }))
            : []
        );
      } else {
        setFavoriteHelpers(
          userData.employer?.favouriteHelpers
            ? userData.employer?.favouriteHelpers?.map((el) => ({ ...el, isFavourite: true }))
            : []
        );
      }
    }
  }, [userData]);

  const NoFavorite = () => {
    return (
      <div className="flex flex-col gap-5 items-center">
        <Heart className="w-14 h-w-14 [&_path]:fill-darkOrange-500 [&_path]:stroke-darkOrange-500" />
        <Typography fontweight="medium" variant="h5">
          {isHelper ? t('thereIsNoFavoriteJobPost') : t('thereIsNoFavoriteHelper')}
        </Typography>
        <Link href={isHelper ? ROUTES_URL.navRoutes.vacancies : ROUTES_URL.navRoutes.helpers}>
          <Button color={isHelper ? 'orange' : 'blue'}>
            <Typography variant="caption">{t('tryToAddSome')}</Typography>
          </Button>
        </Link>
      </div>
    );
  };

  console.log('userData:', userData);

  return (
    <>
      <Head>
        <title>{t('userFavorites')}</title>
        <meta name="description" content="favorites" />
      </Head>
      <UserLayout
        mobileTitle={user?.userType === 'employer' ? t('myFavoriteHelpers') : t('myFavoritePosts')}
        routeLinks={[
          { name: t('myProfile'), url: ROUTES_URL.navRoutes.user.profile, isLink: true },
          {
            name: user?.userType === 'employer' ? t('myFavoriteHelpers') : t('myFavoritePosts'),
            url: '',
            isLink: false,
          },
        ]}>
        {!isHelper ? (
          // employer favorite helpers' lists
          <div
            className={`flex flex-col overflow-x-visible w-full gap-8 md:gap-0 md:w-[403px] max-h-[auto] ${
              favoriteHelpers.length > 0 ? 'md:shadow-custom-light-shadow rounded-[4px]' : ''
            }`}>
            {isLoading ? (
              <HelpersListSkeleton mobilePage="helpers" />
            ) : favoriteHelpers.length > 0 ? (
              favoriteHelpers.map((user, index) => (
                <HelperCard onFavoriteClicked={refetch} key={index} userData={user} />
              ))
            ) : (
              <NoFavorite />
            )}
          </div>
        ) : (
          // helper favorite job posts
          <div className="w-full flex flex-col lg:items-start items-center gap-10">
            {isLoading ? (
              Array.from(Array(10).keys()).map((_, idx) => <JobPostSkeleton key={idx} />)
            ) : jobPosts.length > 0 ? (
              jobPosts.map((post, index) => (
                <JobPostCard
                  postType="helper-favorite-post"
                  key={index}
                  JobPostData={post}
                  color={repeatedColors({
                    length: jobPosts.length,
                    selectedIndex: index,
                    colorList: colors,
                  })}
                  onFavoriteClicked={refetch}
                />
              ))
            ) : (
              <NoFavorite />
            )}
          </div>
        )}
      </UserLayout>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { locale } = ctx;
  let forceLogout = false;
  try {
    await queryClient.fetchQuery<{ data: IUser }>(['get-my-profile'], () =>
      getMyProfile(ctx, locale)
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

export default MyFavorites;
