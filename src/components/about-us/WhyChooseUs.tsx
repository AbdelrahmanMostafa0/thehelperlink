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

interface IProps {
  children?: ReactNode;
}

const WhyChooseUs: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('about-us');

  return (
    <div className="flex lg:flex-row flex-col-reverse justify-center items-center gap-20 w-full max-w-7xl mx-auto px-4">
      {/* left side notifications  */}
      <div className="flex flex-col md:w-1/2 w-full gap-6 bg-[url('/images/customer-type-bg-new.png')] bg-center bg-cover bg-no-repeat p-5 md:p-10 rounded-20">
        {/* {notifications.map((notif, index) => (
          <div
            key={index}
            className={`shadow-custom-deep-shadow rounded-10 px-5 py-4 bg-white flex gap-4 ${
              index === 1
                ? 'md:ltr:translate-x-[18%] md:rtl:-translate-x-[18%] ltr:translate-x-[12%] rtl:-translate-x-[12%]'
                : ''
            } ${
              index === 2
                ? 'ltr:md:translate-x-[12%] ltr:translate-x-[6%] rtl:md:-translate-x-[12%] rtl:-translate-x-[6%]'
                : ''
            } ${index === 3 ? 'ltr:-translate-x-[3%] rtl:translate-x-[3%]' : ''}`}>
            <Image
              src={notif.image}
              alt={notif.type}
              width={54}
              height={54}
              className="h-[54px] rounded-full bg-darkBlue-100 object-cover object-center"
            />
            <div className="flex flex-col gap-1 items-start">
              <Typography
                fontweight="heavy"
                textTransform="first-letter-capital"
                variant="caption"
                className="text-lightBlue-500 py-1 px-2 rounded-sm bg-lightBlue-100">
                {t(notif.type)}
              </Typography>
              <Typography variant="caption">{t(notif.description)}</Typography>
            </div>
          </div>
        ))} */}
      </div>
      {/* right side */}
      <div className="flex flex-col md:w-1/2 w-full">
        <Typography variant="caption" fontweight="heavy" className="text-lightBlue-500">
          {t('ourMessageIs')}
        </Typography>
        <Typography variant="h3" className="mb-9 mt-1">
          {t('toIncentivize')}
        </Typography>
        {/* <Typography variant="body1" className="text-darkBlue-400">
          {t('connectHelperToEmployer')}
        </Typography> */}
        <hr className="border-darkBlue-100 border my-6" />
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <span className="p-2 rounded-full bg-darkOrange-500">
              <Accept className="w-3 h-3" />
            </span>
            <Typography variant="h6" className="text-darkBlue-400">
              {t('ourOverarching')}
            </Typography>
          </div>
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

export default WhyChooseUs;
