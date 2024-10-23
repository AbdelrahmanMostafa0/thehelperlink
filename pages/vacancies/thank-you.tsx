// react
import { ReactNode, useEffect } from 'react';

// next js
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// icons
import { RocketLetter } from '@src/assets/icons';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// routes
import { ROUTES_URL } from '@src/routes';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';

interface IProps {
  children?: ReactNode;
}

const ThankYouPage: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('vacancies');
  const user = useUserStore((state) => state.userState);

  useEffect(() => {
    if (!user || user?.userType === 'employer') {
      router.push(ROUTES_URL.navRoutes.home);
    }
  }, [router, user]);

  return (
    <>
      <Head>
        <title>{t('thankYou')}</title>
        <meta name="description" content="thank you page" />
      </Head>
      <div className="w-full p-4 flex justify-center items-center min-h-screen bg-[url('/images/customer-type-bg.png')] bg-center bg-cover bg-no-repeat">
        <div
          className={` transition-all duration-200 ease-in flex-col w-full lg:w-1/2 p-6 md:p-12 pt-8 md:pt-16 shadow-custom-shadow rounded-20 bg-white text-start items-start max-w-[592px]`}>
          <RocketLetter className="w-13 h-12 [&>path]:stroke-lightGreen-500" />
          <Typography className="mt-11 mb-10" variant="h3">
            {t('thankYouForYourApplication')}
          </Typography>
          {/*<Typography className="mt-3 mb-10 text-darkBlue-400" fontweight="book">*/}
          {/*  {t('haveExperienceORNot')}*/}
          {/*</Typography>*/}
          <div className="flex items-start md:items-center gap-2 flex-wrap">
            <Link href={ROUTES_URL.navRoutes.user.applications.main}>
              <Button loadMoreButton color="green">
                <Typography variant="caption">{t('myApplications')}</Typography>
              </Button>
            </Link>
            <Link href={ROUTES_URL.navRoutes.vacancies}>
              <Button loadMoreButton color="blue">
                <Typography variant="caption">{t('otherVacancies')}</Typography>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: any }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'vacancies'])),
    },
  };
};

export default ThankYouPage;
