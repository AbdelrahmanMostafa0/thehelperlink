// react
import React, { ReactNode, useEffect } from 'react';

// next js
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// react-query
import { dehydrate, QueryClient, useQuery } from 'react-query';

// layout
import UserLayout from '@src/layout/UserLayout';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';
import { shallow } from 'zustand/shallow';

// utils
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';

// types
import { IUser } from '@src/@types/user';

// components
import MyDocuments from '@src/components/user/documents/MyDocuments';
import { getMyProfile } from '@src/api/GET/getMyProfile';
import { ROUTES_URL } from '@src/routes';

interface IProps {
  children?: ReactNode;
}

const myDocument: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user');
  const user = useUserStore((state) => state.userState, shallow);
  const isEmployer = user?.userType === 'employer';
  const { data: userData } = useQuery(['get-my-profile'], () =>
    getMyProfile(undefined, router.locale)
  );

  useEffect(() => {
    if (isEmployer) {
      router.push(ROUTES_URL.navRoutes.user.profile);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{t('myDocuments')}</title>
        <meta name="description" content="user documents" />
      </Head>
      <UserLayout>
        <div className="w-full bg-white rounded-20 shadow-custom-shadow flex flex-col text-center py-8 px-5 md:px-9 lg:px-16">
          {isEmployer ? null : <MyDocuments data={userData} />}
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

export default myDocument;
