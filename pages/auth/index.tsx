// react & next js
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

// EXTERNAL PACKAGES START
// i18next
import { useTranslation } from 'next-i18next';
// EXTERNAL PACKAGES END

// routes
import { ROUTES_URL } from '@src/routes';

interface IProps {
  children?: ReactNode;
}

const Auth: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('layout');

  useEffect(() => {
    router.push(ROUTES_URL.authRoutes.login);
  }, [router]);

  return null;
};

export default Auth;
