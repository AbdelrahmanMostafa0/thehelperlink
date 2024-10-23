// react
import { ReactNode, useContext, useEffect } from 'react';

// next js
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// i18next
import { useTranslation, Trans } from 'next-i18next';

// react-intersection-observer
import { useInView } from 'react-intersection-observer';

// routes
import { ROUTES_URL } from '@src/routes';

// hooks
import useMediaQuery from '@src/hooks/useMediaQuery';

// components
import SearchField from '../global/SearchField';
import userTypeStore from '@src/zustand_stores/userTypeStore';
import Typography from '../Typography';
import Button from '../Button';

// import ScrollTrigger from 'gsap/dist/ScrollTrigger';
// import gsap from 'gsap';

// gsap.registerPlugin(ScrollTrigger);

interface IProps {
  children?: ReactNode;
}

const HowItWorks: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const { t } = useTranslation('home');
  const windowWidth = useMediaQuery();
  const { userType } = userTypeStore();

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    animate(inView);
  }, [inView]);

  const animate = (inView: boolean) => {
    let distance = ['20vw', '-20vw', '20vw', '-20vw'];

    if (inView) {
      distance = ['20vw', '-20vw', '20vw', '-20vw'];
      if (windowWidth < 1050) distance = ['15vw', '-15vw', '15vw', '-15vw'];
      if (windowWidth < 900) distance = ['10vw', '-10vw', '10vw', '-10vw'];
      // 768px
    } else {
      distance = ['0', '0', '0', '0'];
    }

    const step1 = document.querySelector('.step-1-animation') as HTMLElement;
    const step2 = document.querySelector('.step-2-animation') as HTMLElement;
    const step3 = document.querySelector('.step-3-animation') as HTMLElement;
    const step4 = document.querySelector('.step-4-animation') as HTMLElement;

    step1.style.transform = 'translateX(' + distance[0] + ')';
    step2.style.transform = 'translateX(' + distance[1] + ')';
    step3.style.transform = 'translateX(' + distance[2] + ')';
    step4.style.transform = 'translateX(' + distance[3] + ')';
  };

  return (
    <div className="w-full flex flex-col" ref={ref}>
      {/* wraper */}
      <div className="w-full flex flex-col max-w-7xl mx-auto">
        {/* how it works section */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 px-5">
          <div className="flex flex-col items-center md:items-start">
            {/* <Typography variant="caption" className="text-lightBlue-500">
              {t('steps')}
            </Typography> */}
            <Typography variant="h1">{t('howITWorks')}</Typography>
          </div>
          <Link href={ROUTES_URL.navRoutes.faq}>
            <Button loadMoreButton color="green">
              <Typography variant="caption">{t('FAQ')}</Typography>
            </Button>
          </Link>
        </div>
        <hr className="my-11 border-darkBlue-100" />
      </div>
      {userType && userType === 'employer' ? (
        <>
          {/* sign up section */}
          <div className="flex w-full h-[228px]">
            <div className="bg-lightGreen-100 flex-[1] w-35" />
            <div className=" absolute flex flex-col justify-center px-3 md:px-14 gap-3 bg-customBackground left-0 w-[230px] xs:w-[300px] md:w-[500px] h-[228px] duration-1000 transition-all step-1-animation">
              <Typography className="!text-lightGreen-500">{t('step1')}</Typography>
              <Typography variant="h3">{t('signUp')}</Typography>
              <Typography className="text-xs sm:text-base text-darkBlue-400 font-book">
                {t('signUpDescription')}
              </Typography>
            </div>
            <div className="bg-lightGreen-200 flex-[1] w-65" />
          </div>
          <hr className="my-11 border-darkBlue-100 w-full max-w-7xl mx-auto" />

          {/* post or search section */}
          <div className="flex w-full h-[228px]">
            <div className="bg-darkOrange-500 flex-[1]" />
            <div className=" absolute flex flex-col justify-center px-3 md:px-14 gap-3 bg-customBackground right-0 w-[230px] xs:w-[300px] md:w-[500px] h-[228px] duration-1000 transition-all step-2-animation">
              <Typography className="text-darkOrange-500">{t('step2')}</Typography>
              <Typography variant="h3">{t('postOrSearch')}</Typography>
              <Typography className="text-xs sm:text-base text-darkBlue-400 font-book">
                {t('PostOrSearchDescription')}
              </Typography>
            </div>
            <div className="bg-darkOrange-100 flex-[1]" />
          </div>
          <hr className="my-11 border-darkBlue-100 w-full max-w-7xl mx-auto" />
          {/* find and Interview section */}
          <div className="flex w-full h-[228px]">
            <div className="bg-lightBlue-100 flex-[1]" />
            <div className=" absolute flex flex-col justify-center px-3 md:px-14 gap-3 bg-customBackground left-0 w-[230px] xs:w-[300px] md:w-[500px] h-[228px] duration-1000 transition-all step-3-animation">
              <Typography className="text-lightBlue-500">{t('step3')}</Typography>
              <Typography variant="h3">{t('findAndInterview')}</Typography>
              <Typography className="text-xs sm:text-base text-darkBlue-400 font-book">
                {t('findAndInterviewDescription')}
              </Typography>
            </div>
            <div className="bg-lightBlue-500 flex-[1]" />
          </div>
          <hr className="my-11 border-darkBlue-100 w-full max-w-7xl mx-auto" />
          {/* hire the best helper section */}
          <div className="flex w-full h-[228px]">
            <div className="bg-darkBlue-500 flex-[1]" />
            <div className=" absolute flex flex-col justify-center px-3 md:px-14 gap-3 bg-customBackground right-0 w-[230px] xs:w-[300px] md:w-[500px] h-[228px] duration-1000 transition-all step-4-animation">
              <Typography className="text-darkOrange-500">{t('step4')}</Typography>
              <Typography variant="h3">{t('hireTheBest')}</Typography>
              <Typography className="text-xs sm:text-base text-darkBlue-400 font-book">
                {t('hireTheBestDescription')}
              </Typography>
            </div>
            <div className="bg-darkBlue-100 flex-[1]" />
          </div>
        </>
      ) : (
        <>
          {/* sign up section */}
          <div className="flex w-full h-[228px]">
            <div className="bg-lightGreen-100 flex-[1]" />
            <div className=" absolute flex flex-col justify-center px-3 md:px-14 gap-3 bg-customBackground left-0 w-[230px] xs:w-[300px] md:w-[500px] h-[228px] duration-1000 transition-all step-1-animation">
              <Typography className="!text-lightGreen-500">{t('step1')}</Typography>
              <Typography variant="h3">{t('signUp')}</Typography>
              <Typography className="text-xs sm:text-base text-darkBlue-400 font-book">
                {t('signUpDescription')}
              </Typography>
            </div>
            <div className="bg-lightGreen-200 flex-[1]" />
          </div>
          <hr className="my-11 border-darkBlue-100 w-full max-w-7xl mx-auto" />

          {/* Search and Find section */}
          <div className="flex w-full h-[228px]">
            <div className="bg-darkOrange-500 flex-[1]" />
            <div className=" absolute flex flex-col justify-center px-3 md:px-14 gap-3 bg-customBackground right-0 w-[230px] xs:w-[300px] md:w-[500px] h-[228px] duration-1000 transition-all step-2-animation">
              <Typography className="text-darkOrange-500">{t('step2')}</Typography>
              <Typography variant="h3">{t('searchAndFind')}</Typography>
              <Typography className="text-xs sm:text-base text-darkBlue-400 font-book">
                {t('searchAndFindDescription')}
              </Typography>
            </div>
            <div className="bg-darkOrange-100 flex-[1]" />
          </div>
          <hr className="my-11 border-darkBlue-100 w-full max-w-7xl mx-auto" />
          {/* have an Interview section */}
          <div className="flex w-full h-[228px]">
            <div className="bg-lightBlue-100 flex-[1]" />
            <div className=" absolute flex flex-col justify-center px-3 md:px-14 gap-3 bg-customBackground left-0 w-[230px] xs:w-[300px] md:w-[500px] h-[228px] duration-1000 transition-all step-3-animation">
              <Typography className="text-lightBlue-500">{t('step3')}</Typography>
              <Typography variant="h3">{t('haveAnInterview')}</Typography>
              <Typography className="text-xs sm:text-base text-darkBlue-400 font-book">
                {t('haveAnInterviewDescription')}
              </Typography>
            </div>
            <div className="bg-lightBlue-500 flex-[1]" />
          </div>
          <hr className="my-11 border-darkBlue-100 w-full max-w-7xl mx-auto" />
          {/* Get Hired section */}
          <div className="flex w-full h-[228px]">
            <div className="bg-darkBlue-500 flex-[1]" />
            <div className=" absolute flex flex-col justify-center px-3 md:px-14 gap-3 bg-customBackground right-0 w-[230px] xs:w-[300px] md:w-[500px] h-[228px] duration-1000 transition-all step-4-animation">
              <Typography className="text-darkOrange-500">{t('step4')}</Typography>
              <Typography variant="h3">{t('getHired')}</Typography>
              <Typography className="text-xs sm:text-base text-darkBlue-400 font-book">
                {t('getHiredDescription')}
              </Typography>
            </div>
            <div className="bg-darkBlue-100 flex-[1]" />
          </div>
        </>
      )}
    </div>
  );
};

export default HowItWorks;
