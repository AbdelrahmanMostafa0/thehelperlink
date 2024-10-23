// react
import { ReactNode } from 'react';

// next js
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import { ROUTES_URL } from '@src/routes';

interface IProps {
  children?: ReactNode;
}

const NotFound: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('404PageTitle')}</title>
      </Head>
      <div className="w-full p-4 flex justify-center items-center min-h-screen bg-[url('/images/customer-type-bg.png')] bg-center bg-cover bg-no-repeat">
        <div className="bg-white p-5 md:p-10 flex flex-col text-center gap-5 rounded-10 shadow-custom-shadow">
          <Typography variant="h2">{t('404')}</Typography>
          <Typography variant="h6" fontweight="light">
            {t('pageNotExists')}
          </Typography>
          <Link href={ROUTES_URL.navRoutes.home} className="self-center">
            <Button loadMoreButton className="px-10">
              <Typography>{t('home')}</Typography>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: any }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default NotFound;
