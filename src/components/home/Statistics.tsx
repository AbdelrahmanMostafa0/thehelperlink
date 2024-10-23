// react
import { ReactNode, useState } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// components
import Typography from '@src/components/Typography';
interface IProps {
  children?: ReactNode;
}

const Statistics: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const { t } = useTranslation('home');

  const [countUp, setCountUp] = useState<boolean[]>([false, false, false, false]);

  const onChangeVisibilitySensor1 = (isVisible: boolean) => {
    if (!isVisible) return;
    const newCountUp = [...countUp];
    newCountUp[0] = true;
    setCountUp(newCountUp);
  };

  return (
    // min-h-screen
    <div className="w-full flex flex-col bg-darkBlue-500 px-4">
      {/* py-16 lg:py-36 */}
      <div className="w-full flex flex-col max-w-7xl mt-12 mb-24 mx-auto">
        {/* mb-16 lg:mb-36 */}
        <Typography variant="h1" className="text-white max-w-[790px]">
          {t('youHaveGoals')}
        </Typography>
        {/* <div className="flex w-full gap-12 lg:gap-20 flex-col lg:flex-row">
         // Daily New Job Vacatures
          <div className="flex flex-col max-w-[281px]">
            <div className="w-14 h-[10px] bg-lightGreen-500 mb-7" />
            <VisibilitySensor onChange={onChangeVisibilitySensor1}>
              <Typography
                variant="h2"
                className={`text-lightGreen-200 transition-all text-[70px] leading-[80px] ${
                  countUp[0] ? 'opacity-100' : 'opacity-0'
                }`}>
                {countUp[0] ? <CountUp decimals={1} start={0} end={1.4} duration={1.3} /> : '1.4'}
                {t('milion')}+
              </Typography>
            </VisibilitySensor>
            <Typography className="text-darkBlue-200 font-book mt-2">{t('dailyNewJob')}</Typography>
          </div>
           // The average time that it takes to connect employee to employer
          <div className="flex flex-col max-w-[281px]">
            <div
              className={`w-14 h-[10px] bg-lightGreen-500 mb-7 transition-all ${
                countUp[0] ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <VisibilitySensor onChange={onChangeVisibilitySensor1}>
              <Typography
                variant="h2"
                className={`text-lightGreen-200 transition-all text-[70px] leading-[80px] ${
                  countUp[0] ? 'opacity-100' : 'opacity-0'
                }`}>
                {countUp[0] ? <CountUp start={0} end={5} duration={1.3} /> : '5'} {t('days')}
              </Typography>
            </VisibilitySensor>
            <Typography className="text-darkBlue-200 font-book mt-2">{t('avarageTime')}</Typography>
          </div>
          // More possibility to find work
          <div className="flex flex-col max-w-[281px]">
            <div
              className={`w-14 h-[10px] bg-lightGreen-500 mb-7 transition-all ${
                countUp[0] ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <Typography
              variant="h2"
              className={`text-lightGreen-200 transition-all text-[70px] leading-[80px] ${
                countUp[0] ? 'opacity-100' : 'opacity-0'
              }`}>
              {countUp[0] ? <CountUp decimals={1} start={0} end={5.8} duration={1.3} /> : '5.8'} %
            </Typography>
            <Typography className="text-darkBlue-200 font-book mt-2">
              {t('possibilityToWork')}
            </Typography>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Statistics;
