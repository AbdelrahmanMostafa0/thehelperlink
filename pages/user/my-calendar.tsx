// react
import { ReactNode } from 'react';

// next js
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// utils
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';

// components
import BreadCrumb from '@src/components/BreadCrumb';
import { ROUTES_URL } from '@src/routes';
const MyCalendar = dynamic(() => import('@src/components/user/calendar/MyCalendar'), {
  ssr: false,
});

interface IProps {
  children?: ReactNode;
}

const CalendarPage: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user');

  return (
    <>
      <Head>
        <title>{t('myCalendar')}</title>
        <meta name="description" content="My calendar" />
      </Head>
      <div className="w-full flex flex-col gap-8 mx-auto max-w-7xl mt-10 mb-24 ssm:my-10 px-5">
        <BreadCrumb
          routesList={[
            { name: t('profile'), url: ROUTES_URL.navRoutes.user.profile, isLink: true },
            { name: t('myCalendar'), url: '' },
          ]}
        />
        <MyCalendar />
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

export default CalendarPage;
