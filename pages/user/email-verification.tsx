// react
import { ReactNode } from 'react';

// next js
import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// icons
import { Email } from '@src/assets/icons';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// routes
import { ROUTES_URL } from '@src/routes';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import { ssrAuthHandler } from '@src/utils/ssrAuthHandler';

interface IProps {
  children?: ReactNode;
}

const EmailVerification: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;

  return (
    <>
      <Head>
        <title>{t('emailConfirmation')}</title>
        <meta name="description" content={t('emailConfirmation')} />
      </Head>

      <div className="w-full p-4 flex justify-center items-center min-h-screen bg-[url('/images/customer-type-bg.png')] bg-center bg-cover bg-no-repeat">
        <div
          className={` transition-all duration-200 ease-in flex-col w-full flex gap-6 lg:w-1/2 p-6 md:p-12 pt-8 md:pt-16 shadow-custom-shadow items-center rounded-20 bg-white text-start max-w-[592px]`}>
          <Email className="w-9 h-9" />
          <Typography
            variant="h5"
            className="my-3 text-center"
            textTransform="first-letter-capital">
            {t('emailConfirmed')}
          </Typography>
          <div className="flex items-center gap-3 w-full flex-wrap">
            <Link href={ROUTES_URL.navRoutes.home} className="flex-1 flex">
              <Button className="w-full" color="orange">
                {t('home')}
              </Button>
            </Link>
            <Link href={ROUTES_URL.navRoutes.user.profile} className="flex-1 flex">
              <Button className="w-full" color="blue">
                {t('myProfile')}
              </Button>
            </Link>
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
      ...(await serverSideTranslations(locale || '', ['common'])),
    },
    forceLogout,
  });
};

export default EmailVerification;
