// react & next js
import { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// EXTERNAL PACKAGES START
// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// EXTERNAL PACKAGES END

// components
import ChooseUserType from '@src/components/global/ChooseUserType';

interface IProps {
  children?: ReactNode;
}

const Register: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('common') as any;

  return (
    <>
      <Head>
        <title>{t('registerPage')}</title>
        <meta name="description" content="Register page" />
      </Head>
      <div className="w-full p-4 flex justify-center items-center min-h-screen bg-[url('/images/customer-type-bg.png')] bg-center bg-cover bg-no-repeat">
        <ChooseUserType />
      </div>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: any }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Register;
