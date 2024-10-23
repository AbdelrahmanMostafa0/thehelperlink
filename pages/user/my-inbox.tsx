// react
import { ReactNode } from 'react';

// next js
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// utils
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';

// routes
import { ROUTES_URL } from '@src/routes';

// components
import BreadCrumb from '@src/components/BreadCrumb';
import ChatEngine from '@src/components/user/chat/Chat-engine';

interface IProps {
  children?: ReactNode;
}

const Home: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user');

  return (
    <>
      <Head>
        <title>{t('myInbox')}</title>
        <meta name="description" content="My Inbox" />
      </Head>
      <div className="relative overflow-x-hidden">
        <img
          src="/images/home-page-bg-2.png"
          alt="home-bg"
          className="rotate-bg-animation fixed origin-center left-0 right-0 m-auto mt-[300px] w-[100px] h-[100px] max-w-none"
        />
        <div className="w-full flex flex-col gap-8 mx-auto max-w-7xl mt-10 mb-24 ssm:my-10 px-5 z-10 relative">
          <BreadCrumb
            routesList={[
              { name: t('profile'), url: ROUTES_URL.navRoutes.user.profile, isLink: true },
              { name: t('myInbox'), url: ROUTES_URL.navRoutes.user.myInbox },
            ]}
          />
          <div className="flex w-full flex-col gap-8">
            <div className="flex w-full flex-col gap-4 mb-10">
              <ChatEngine />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { locale } = ctx;
  let forceLogout = false;

  return ssrAuthHandler({
    ctx,
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'user'])),
    },
    forceLogout,
  });
};

export default Home;
