// react
import { ReactNode, useEffect } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// routes
import { ROUTES_URL } from '@src/routes';

interface IProps {
  children?: ReactNode;
}

const Application: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;

  useEffect(() => {
    router.push(ROUTES_URL.navRoutes.user.applications.main);
  }, [router]);

  return <></>;
};

export const getServerSideProps = async ({ locale }: { locale: any }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'user'])),
    },
  };
};

export default Application;
