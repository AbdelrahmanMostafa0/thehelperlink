// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';
import Image from 'next/image';

// i18next
import { useTranslation } from 'next-i18next';

import { User, BriefcaseFillout } from '@src/assets/icons';

// components
import Typography from '@src/components/Typography';
import TopSectionImages from './TopSectionImages';

interface IProps {
  children?: ReactNode;
}

const TopSection: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('about-us');

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      {/* title & description */}
      <div className="flex flex-col max-w-[500px] gap-9 px-4">
        <Typography variant="h1">{t('aboutUs')}</Typography>
        <Typography className="text-darkBlue-400 leading-relaxed">
          {t('description1')} <span className="h-5"></span>
          {t('description2')}
        </Typography>
      </div>
      {/* floating components around image */}
      <div className="flex w-full relative lg:mt-32 md:mt-[385px] sm:mt-[350px] mt-[320px]">
        {/* radial gradient container */}
        <div className="bg-lightGreen-500 bg-radialGradient ssm:w-full w-[calc(100%-32px)] min-h-[68%] absolute bottom-[0px] left-1/2 -translate-x-1/2 ssm:rounded-none rounded-md" />
        <div className="flex w-full justify-center relative px-[10%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <span className="aspect-[807/530] w-full relative">
            <Image
              src="/images/about-us-bg.png"
              alt="laptop"
              className=""
              fill
              sizes="807px"
              quality={100}
            />
          </span>
          {/* gray background to cover the bottom of the image */}
          {/* <div className="bg-customBackground w-full min-h-[50px] md:min-h-[80px] lg:min-h-[106px] absolute bottom-0 left-0" /> */}
        </div>
        {/* founders  */}
        <div className="absolute top-[-265px] sm:top-[-330px] ltr:right-[0px] ltr:left-unset rtl:left-[0px] rtl:right-unset sm:ltr:right-[150px] sm:ltr:left-unset sm:rtl:left-[150px] sm:rtl:right-unset scale-50 xs:scale-90 md:scale-100">
          <TopSectionImages />
        </div>
        {/* job post card component  */}
        {/* <div className="absolute top-[-100px] ltr:left-[0px] ltr:right-unset rtl:right-0 rtl:left-unset scale-75 lg:block hidden">
          <JobPostCard JobPostData={posts[0]} color="green" postType="helper-application" />
          <div className="absolute top-0 left-0 min-w-full min-h-[calc(100%+30px)]" />
        </div> */}
        {/* brief case icon  */}
        <div className="flex items-center justify-center p-6 text-lightGreen-500 rounded-full bg-white shadow-custom-dark-deep-shadow absolute sm:top-[100px] top-[20px] sm:ltr:right-[160px] sm:ltr:left-unset ltr:left-unset ltr:right-[30px] rtl:left-[30px] rtl:right-unset sm:rtl:left-[90px] sm:rtl:right-unset  sm:scale-100 scale-50">
          <BriefcaseFillout className="w-8 h-8" />
        </div>
        {/* user icon  */}
        <div className="flex items-center justify-center p-6 rounded-full bg-white shadow-custom-dark-deep-shadow absolute sm:top-[200px] top-[80px] // sm:ltr:right-[80px] sm:ltr:left-unset ltr:left-unset ltr:right-[0px] rtl:left-[0px] rtl:right-unset sm:rtl:left-[20px] sm:rtl:right-unset sm:scale-100 scale-50">
          <User className="w-6 h-6 [&_path]:stroke-darkOrange-500" />
        </div>
      </div>
    </div>
  );
};

export default TopSection;
