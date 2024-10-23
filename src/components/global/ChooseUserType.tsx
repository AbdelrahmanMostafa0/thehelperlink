// react
import { ReactNode } from 'react';

// next js
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// i18next
import { useTranslation } from 'next-i18next';

// routes
import { ROUTES_URL } from '@src/routes';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import ImageInsetContainer from '@src/components/global/ImageInsetContainer';

interface IProps {
  children?: ReactNode;
  isHomePage?: boolean;
}

const ChooseUserType: React.FC<IProps> = ({ isHomePage = false }) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <div className={`w-full flex slg:flex-col slg:items-center gap-6 justify-center px-5 ssm:px-0`}>
      {/* employer section */}
      <div
        className={`flex min-w-[300px] transition-all duration-200 ease-in flex-col w-full lg:w-1/2 p-6 md:p-12 pt-8 md:pt-16 shadow-custom-shadow rounded-20 bg-white text-start items-start max-w-[592px]`}>
        <ImageInsetContainer
          className="border-darkOrange-500"
          defaultBorder={false}
          image="/images/employer-register-new.png"
        />
        <Typography className="mt-11 tracking-tighter max-w-[410px]" variant="h3">
          {t('employerHire')}
        </Typography>
        <Typography className="mt-3 mb-10 text-darkBlue-400" fontweight="book">
          {t('employerHireDescription')}
        </Typography>
        <span className="flex items-end flex-1">
          <Link href={ROUTES_URL.authRoutes.employerRegister}>
            <Button loadMoreButton color="green">
              <Typography variant="caption" textTransform="first-letter-capital">
                {t('startNow')}
              </Typography>
            </Button>
          </Link>
        </span>
      </div>
      {/* helper section */}
      <div
        className={`flex min-w-[300px] transition-all duration-200 ease-in flex-col w-full lg:w-1/2 p-6 md:p-12 pt-8 md:pt-16 shadow-custom-shadow rounded-20 bg-white text-start items-start max-w-[592px]`}>
        <ImageInsetContainer image="/images/helper-register-new.png" />

        <Typography className="mt-11 tracking-tighter max-w-[410px]" variant="h3">
          {t('helperWork')}
        </Typography>
        <Typography className="mt-3 mb-10 text-darkBlue-400" fontweight="book">
          {t('helperWorkDescription')}
        </Typography>
        <span className="flex items-end flex-1">
          <Link href={ROUTES_URL.authRoutes.helperRegister}>
            <Button loadMoreButton color="orange">
              <Typography variant="caption" textTransform="first-letter-capital">
                {t('startNow')}
              </Typography>
            </Button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ChooseUserType;
