// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// components
import Typography from '@src/components/Typography';
import USerTypeTab from '@src/components/home/UserTypeTab';
import Slider from './Slider';
import Image from 'next/image';
import { getLangBoolean } from '@src/utils/getLangBoolean';
import Link from 'next/link';

interface IProps {
  children?: ReactNode;
}

const TopSection: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const { t } = useTranslation('home');
  const { userState } = useUserStore((state) => state);
  const lang = getLangBoolean();

  const isArabic = router.locale === 'ar-SA';

  return (
    <div className="w-full flex flex-col justify-center text-center relative overflow-hidden">
      <div className="w-full flex flex-col  z-[2] px-3 xs:px-5">
        {/* slogan */}
        <div className="z-10 w-full flex flex-col   px-3 xs:px-5">
          {isArabic ? (
            <div className="flex flex-col justify-center gap-2">
              <Typography variant="h1" className="inline-block">
                {t('weLink')}{' '}
                <span className=" rounded-md xs:px-1 inline-block bg-color-animation-left">
                  بينك
                </span>
              </Typography>
              <Typography variant="h1" className="inline-block">
                وبين اصحاب العمل
                <span className="rounded-md xs:px-1 inline-block bg-color-animation-left-2">
                  {t('employers')}
                </span>
              </Typography>
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-2">
              <Typography variant="h1" className="inline-block">
                {t('weLink')}{' '}
                <span className=" rounded-md xs:px-1 inline-block">
                  {'you'.split('').map((letter, index) => (
                    <span
                      key={index}
                      style={{ animationDelay: `4.${index + 1}s` }}
                      className="bg-color-animation-left inline-block !pl-0">
                      {letter}
                    </span>
                  ))}
                </span>
              </Typography>
              <Typography variant="h1" className="inline-block">
                {t('toFuture')}{' '}
                <span className="rounded-md xs:px-1 inline-block">
                  {t('employers')
                    .split('')
                    .map((letter, index) => (
                      <span
                        key={index}
                        style={{ animationDelay: `5.${index + 1}s` }}
                        className="bg-color-animation-left-2 inline-block !pl-0">
                        {letter}
                      </span>
                    ))}
                </span>{' '}
              </Typography>
            </div>
          )}
          <Typography fontweight="book" className="pt-8 pb-10 max-w-[610px] self-center">
            {t('topSectionDescription')}
          </Typography>
        </div>

        <div className="absolute left-0 opacity-60 brightness-75">
          {' '}
          <Slider />
        </div>

        {/* <SearchField /> */}
        {/* <Typography variant="caption" className="pt-6">
          {t('AreYouAnEmployer')}{' '}
          <Link
            href={
              userState?.email
                ? ROUTES_URL.navRoutes.postAJob
                : ROUTES_URL.authRoutes.employerRegister
            }>
            <span className="underline font-black">{t('postAJob')}</span>
          </Link>{' '}
          {t('now')}
        </Typography> */}
      </div>
      <div className="mb-[85px]"></div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* <img
        // src="/images/home-page-bg-new.png"
        src="/images/home-bg.png"
        alt="home-bg"
        className="z-[1] min-w-[350px] sm:min-w-[450px] mt-[280px] sm:mt-[250px] lg:mt-0"
        // className="hidden sm:block z-[1] min-h-screen min-w-[450px] mt-[280px] sm:mt-[250px] lg:mt-0"
      /> */}
      {/* <div>
        <Image src={'/images/maid-noBg.png'} width={600} height={600} alt="maid" />
      </div> */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* <img
        src="/images/home-page-bg-mobile.png"
        alt="home-bg"
        className="sm:hidden z-[1] min-w-[450px] mt-[280px] sm:mt-[250px] lg:mt-0"
      /> */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* <img
        src="/images/home-page-bg-2.png"
        alt="home-bg"
        className="rotate-bg-animation absolute origin-center left-0 right-0 m-auto top-[600px] w-[100px] h-[100px] max-w-none"
      /> */}

      {/* <ChooseUserType isHomePage /> */}
    </div>
  );
};

export default TopSection;
