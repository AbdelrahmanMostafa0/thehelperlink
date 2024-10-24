// react
import { ReactNode, useEffect, useState } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// i18next
import { useTranslation } from 'next-i18next';

// zustand store
import { shallow } from 'zustand/shallow';
import { useUserStore } from '@src/zustand_stores/user';

// hooks
import useComponentVisible from '@src/hooks/useComponentVisible';
import useMediaQuery from '@src/hooks/useMediaQuery';

// routes
import { navRoutes, ROUTES_URL } from '@src/routes';

// react-query
import { useQuery } from 'react-query';

// icons
import { User, HamburgerButton, Cancel, Globe } from '@src/assets/icons';

// api
import { getQuestions } from '@src/api/GET/getQuestions';

// types
import { IQuiz } from '@src/@types/quiz';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import UserRoutesList from '@src/layout/UserRoutesList';

interface IProps {
  children?: ReactNode;
}
const adminEmail = 'mahmoud.fcas63@gmail.com';
const Navbar: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const user = useUserStore((state) => state.userState, shallow);
  const [expand, setExpand] = useState({ user: false, menu: false });
  console.log(user?.email);

  // function for detecting routes
  const routeDetector = () => `/${router.pathname.split('/')[1]}`;

  const { isComponentVisible, ref, setIsComponentVisible } = useComponentVisible(false);

  const HAS_ACCESS = (() => {
    if (user) {
      if (user?.email === adminEmail) return true;
    }
    if (!user || user?.userType === 'helper') return false;
    return user?.confirmed && user.confirmedPhoneNumber;
  })();

  const isHelper = user?.userType === 'helper' && user?.email !== adminEmail;

  const { data: quizes } = useQuery<{ results: IQuiz[] }>(
    ['questions', router.locale],
    () => getQuestions(router.locale || ''),
    { enabled: user?.userType === 'helper' }
  );

  const windowWidth = useMediaQuery();

  useEffect(() => {
    if (windowWidth > 1024) {
      setExpand({ menu: false, user: false });
    }
  }, [windowWidth]);
  console.log(user);

  const routes = (
    <div
      className={`gap-12 flex ${
        expand.menu ? 'flex-col items-start px-6 pb-6 pt-10' : 'flex-row items-center'
      }`}>
      {navRoutes.map((route, index) => {
        const isPostAJob = route.name === 'postAJob';
        return isPostAJob && !HAS_ACCESS ? null : (
          <Link
            className={`${route.name === 'postAJob' ? (isPostAJob ? 'block' : 'hidden') : 'block'}`}
            onClick={() => setExpand({ menu: false, user: false })}
            key={index}
            href={route.url}>
            <Typography
              variant="caption"
              className={`${
                routeDetector() === route.url ? 'text-lightGreen-500' : ''
              } hover:text-lightGreen-500`}>
              {t(route.name)}
            </Typography>
          </Link>
        );
      })}
      <Link
        className="lg:hidden"
        href={{ pathname: router.pathname, query: router.query }}
        locale={router.locale === 'en-GB' ? 'ar-SA' : 'en-GB'}>
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6" />
          <Typography>{router.locale === 'en-GB' ? 'عربی' : 'EN'}</Typography>
        </div>
      </Link>
    </div>
  );

  const userRoutes = user?.email ? (
    <>
      <div ref={ref} className={'relative  flex items-center gap-3'}>
        <Button
          onClick={() => setIsComponentVisible((prevState) => !prevState)}
          color={user.userType === 'helper' ? 'orange' : 'blue'}
          variant="bordered"
          className="px-5">
          <User className="w-[17px] h-[17px]" />
          <Typography variant="caption" className="whitespace-nowrap pl-2 rtl:pr-2 capitalize">
            {t('hi')}, {user.firstName}
          </Typography>
        </Button>
        <UserRoutesList open={isComponentVisible} setOpen={setIsComponentVisible} />
        <Link
          className="hidden lg:block"
          href={{ pathname: router.pathname, query: router.query }}
          locale={router.locale === 'en-GB' ? 'ar-SA' : 'en-GB'}>
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6" />
            <Typography>{router.locale === 'en-GB' ? 'عربی' : 'EN'}</Typography>
          </div>
        </Link>
      </div>
      <div className="lg:hidden flex flex-col gap-5">
        <UserRoutesList
          callBack={() => setExpand({ menu: false, user: false })}
          isDropDown={false}
        />
        <div className="flex w-full px-2 pb-2 max-w-[360px] mx-auto">
          {HAS_ACCESS && !isHelper && (
            <Link
              href={ROUTES_URL.navRoutes.postAJob}
              onClick={() => setExpand({ menu: false, user: false })}
              className="w-full">
              <Button variant="bordered" color="blue" className="py-5 w-full mb-4">
                <Typography variant="caption">{t('postAJob')}</Typography>
              </Button>
            </Link>
          )}
          {HAS_ACCESS && isHelper && quizes?.results && quizes?.results.length > 0 && (
            <Link href={ROUTES_URL.navRoutes.user.quiz} className="w-full">
              <Button variant="bordered" color="orange" className="py-5 mb-4 w-full">
                <Typography variant="caption">{t('takeTheQuiz')}</Typography>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  ) : (
    <div
      className={`gap-7 flex ${
        expand.user ? 'flex-col-reverse items-start px-6 pb-6 pt-10' : 'flex-row items-center'
      }`}>
      <Link
        href={ROUTES_URL.authRoutes.login}
        onClick={() => setExpand({ menu: false, user: false })}>
        <Typography variant="caption">{t('login')}</Typography>
      </Link>
      <Link
        href={ROUTES_URL.authRoutes.register}
        onClick={() => setExpand({ menu: false, user: false })}>
        <Button color="green" variant="bordered" className="px-5">
          <User className="w-[17px] h-[17px]" />
          <Typography variant="caption" className="whitespace-nowrap pl-2">
            {t('signUp')}
          </Typography>
        </Button>
      </Link>
      <Link
        className="hidden lg:block"
        href={{ pathname: router.pathname, query: router.query }}
        locale={router.locale === 'en-GB' ? 'ar-SA' : 'en-GB'}>
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6" />
          <Typography>{router.locale === 'en-GB' ? 'عربی' : 'EN'}</Typography>
        </div>
      </Link>
    </div>
  );

  return (
    <nav
      className={`flex flex-col shadow-custom-shadow bg-white fixed top-0 left-0 w-full z-10 transition-all duration-500 ease-in ${
        expand.menu || expand.user ? 'h-full overflow-hidden' : 'h-[70px] xs:h-[100px]'
      }`}>
      {/* desktop  */}
      <div className="hidden lg:flex items-center p-4 h-[70px] xs:h-[100px] justify-evenly w-full mx-auto">
        <Link href={ROUTES_URL.navRoutes.home}>
          <Image
            src="/images/logo.png"
            alt="logo"
            width={62}
            height={62}
            className="object-contain hidden lg:block"
          />
        </Link>
        {/* <video
          onClick={() => router.push(ROUTES_URL.navRoutes.home)}
          autoPlay
          muted
          playsInline
          loop
          controls={false}
          width={80}
          height={80}
          className="object-contain cursor-pointer sm:block hidden"
          src="/logo.mp4"
        /> */}

        {routes}
        {userRoutes}
      </div>
      {/* tablet or smaller  */}
      <div className="flex lg:hidden items-center p-4 h-[70px] xs:h-[100px] justify-between lg:justify-evenly w-full mx-auto">
        {/* hamburger menu icon  */}
        <span
          className="lg:hidden inline cursor-pointer"
          onClick={() =>
            setExpand((prevState) => {
              if (prevState.menu || prevState.user) {
                return { menu: false, user: false };
              } else {
                return { menu: true, user: false };
              }
            })
          }>
          {expand.menu ? (
            <Cancel className="w-10 h-10" />
          ) : (
            <HamburgerButton className="w-10 h-10 scale-75 xs:scale-100" />
          )}
        </span>
        <Link href={ROUTES_URL.navRoutes.home}>
          <Image
            src="/images/logo.png"
            alt="logo"
            width={62}
            height={62}
            className="object-contain lg:hidden block"
          />
        </Link>
        {/* <video
          onClick={() => router.push(ROUTES_URL.navRoutes.home)}
          autoPlay
          muted
          playsInline
          loop
          controls={false}
          className="cursor-pointer sm:block hidden object-contain absolute left-1/2 -ml-[25px] xs:-ml-[40px] h-[50px] w-[50px] xs:h-[80px] xs:w-[80px]"
          src="/logo.mp4"
        /> */}

        {/* user icon mobile menu  */}
        <span
          className="lg:hidden inline cursor-pointer"
          onClick={() =>
            setExpand((prevState) => {
              if (prevState.menu || prevState.user) {
                return { menu: false, user: false };
              } else {
                return { menu: false, user: true };
              }
            })
          }>
          {expand.user ? (
            <Cancel className="w-10 h-10" />
          ) : (
            <User className="w-10 h-10 scale-75 xs:scale-100" />
          )}
        </span>
      </div>
      {/* mobile section to render routes link or users links */}
      <div className="flex flex-col max-h-full overflow-y-auto w-full">
        {!expand.menu && !expand.user ? <></> : expand.menu ? routes : userRoutes}
      </div>
    </nav>
  );
};

export default Navbar;
