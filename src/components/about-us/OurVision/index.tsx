// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// icons
import { Accept } from '@src/assets/icons';

// components
import Typography from '@src/components/Typography';
import OurVisionImages from './OurVisionImages';
import EventCard from './EventCard';
import NotificationCard from './NotificationCard';

interface IProps {
  children?: ReactNode;
}

const OurVision: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('about-us');

  return (
    <div className="flex lg:flex-row flex-col-reverse justify-center items-center gap-20 w-full max-w-7xl mx-auto px-4">
      {/* left side notifications  */}
      <div className="relative slg:mt-5 sxs:min-h-[385px] flex flex-col md:w-1/2 w-full gap-6 bg-[url('/images/customer-type-bg-new.png')] bg-center bg-cover bg-no-repeat p-5 md:p-10 rounded-20 mb-20">
        <OurVisionImages />
        <EventCard />
        <NotificationCard />
      </div>
      {/* right side */}
      <div className="flex flex-col md:w-1/2 w-full">
        <Typography variant="caption" fontweight="heavy" className="text-lightBlue-500">
          {t('ourVision')}
        </Typography>
        <Typography variant="h3" className="mb-9 mt-1">
          {t('ourVisionMessage')}
        </Typography>
        {/* <Typography variant="body1" className="text-darkBlue-400">
          {t('connectHelperToEmployer')}
        </Typography> */}
        {/* <hr className="border-darkBlue-100 border my-6" /> */}
        <div className="flex flex-col gap-3">
          {/* <div className="flex gap-3 items-center">
            <span className="p-2 rounded-full bg-darkOrange-500">
              <Accept className="w-3 h-3" />
            </span>
            <Typography variant="h6" className="text-darkBlue-400">
              {t('ourOverarching')}
            </Typography>
          </div> */}
          {/* <div className="flex gap-3 items-center">
            <span className="p-2 rounded-full bg-darkOrange-500">
              <Accept className="w-3 h-3" />
            </span>
            <Typography variant="h6" className="text-darkBlue-400">
              {t('deposit')}
            </Typography>
          </div>
          <div className="flex gap-3 items-center">
            <span className="p-2 rounded-full bg-darkOrange-500">
              <Accept className="w-3 h-3" />
            </span>
            <Typography variant="h6" className="text-darkBlue-400">
              {t('support')}
            </Typography>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OurVision;
