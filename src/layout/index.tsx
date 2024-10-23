// react
import { ReactNode, useEffect } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// hooks
import useHasHydrated from '@src/hooks/useHasHydrated';

// zustand store
import { useThemeStore, ThemeState } from '@src/zustand_stores/Theme';

// layout
import Loading from '@src/layout/Loading';

// components
import Navbar from './Navbar';
import Footer from './Footer';

interface IProps {
  children?: ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const { t } = useTranslation('layout');
  const hydrated = useHasHydrated();

  const setShowWelcomePage = useThemeStore((state) => state.setShowWelcomePage);

  const showWelcomePage = useThemeStore((state: ThemeState) => state.showWelcomePage);

  useEffect(() => {
    window.onload = function () {
      setShowWelcomePage(false);
    };
    setTimeout(() => {
      setShowWelcomePage(false);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hydrated) return <></>;
  return (
    <div
      dir={router.locale === 'ar-SA' ? 'rtl' : 'ltr'}
      className="flex flex-col relative font-AvenirArabi">
      {process.env.NODE_ENV !== 'development' && <Loading visible={showWelcomePage} />}
      <main
        className={`w-full flex flex-col bg-customBackground  overflow-x-hidden ${
          router.locale !== 'th-TH' ? 'pt-[70px] md:pt-[100px]' : 'pt-0'
        }`}>
        {children}
      </main>
      {router.locale !== 'th-TH' && <Navbar />}
      {router.locale !== 'th-TH' && <Footer />}
    </div>
  );
};

export default Layout;
