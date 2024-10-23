// react
import { ReactNode, useRef } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// icons
import { Growth, Collaboration, Simplicity, Empowerment, ArrowRightV2 } from '@src/assets/icons';

// utils
import { bgColorLight, strokeColor, textColor } from '@src/utils/colorUtils';

// components
import Typography from '@src/components/Typography';
interface IProps {
  children?: ReactNode;
}

const content = [
  { title: 'growth', description: 'weStrive', icon: Growth, color: 'blue' },
  {
    title: 'collaboration',
    description: 'collaborateDescription',
    icon: Collaboration,
    color: 'orange',
  },
  {
    title: 'simplicity',
    description: 'simlicityDescription',
    icon: Simplicity,
    color: 'green',
  },
  {
    title: 'empowerment',
    description: 'empowermentDescription',
    icon: Empowerment,
    color: 'gray',
  },
];

const OurValues: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('about-us');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleArrowClick = (isLeft: boolean) => {
    const scrollAmount = 340;
    if (isLeft) {
      containerRef.current?.scrollBy({
        top: 0,
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
    if (!isLeft) {
      containerRef.current?.scrollBy({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col gap-24 w-full">
      <div className="flex flex-col gap-2 items-center w-full max-w-7xl mx-auto text-center">
        {/* <Typography className="text-lightBlue-500" fontweight="heavy" variant="caption">
          {t('mainValues')}
        </Typography> */}
        <Typography variant="h1">{t('ourValues')}</Typography>
      </div>

      <div className="flex w-full relative">
        <span
          onClick={() => handleArrowClick(true)}
          tabIndex={0}
          role="button"
          aria-label="previous value"
          className="p-3 ssm:hidden bg-white rounded-full shadow-custom-shadow absolute top-1/2 left-4 text-black -translate-y-1/2">
          <ArrowRightV2 className="w-6 h-6 rotate-180" />
        </span>
        <span
          onClick={() => handleArrowClick(false)}
          tabIndex={0}
          role="button"
          aria-label="next value"
          className="p-3 ssm:hidden bg-white rounded-full shadow-custom-shadow absolute top-1/2 right-4 text-black -translate-y-1/2">
          <ArrowRightV2 className="w-6 h-6" />
        </span>
        {/* <ScrollContainer
        horizontal
        // vertical
        nativeMobileScroll
        hideScrollbars
        className="flex w-full justify-start items-start px-4 gap-4 md:gap-6"> */}
        <div
          ref={containerRef}
          className="flex w-full justify-start items-start ssm:flex-col flex-row scrollbar-hidden overflow-x-hidden sm:overflow-x-auto px-4 gap-4 md:gap-6">
          {content.map((content, index) => (
            <div
              key={index}
              className={`md:min-w-[592px] md:min-h-[368px] min-w-[340px] ssm:w-full ssm:min-w-[auto] min-h-[364px] rounded-20 ${bgColorLight(
                content.color as 'green' | 'blue' | 'orange' | 'gray'
              )} flex items-start flex-col p-12`}>
              <div
                className={
                  index === 0 || index === 3
                    ? 'flex items-center justify-center p-6 rounded-full bg-white shadow-custom-dark-deep-shadow mb-14'
                    : 'flex items-center justify-center p-6 rounded-full bg-white shadow-custom-dark-deep-shadow mb-16'
                }>
                <content.icon
                  className={`${strokeColor(
                    content.color as 'green' | 'blue' | 'orange' | 'gray'
                  )} m-auto`}
                />
              </div>
              <Typography
                variant="h3"
                className={`${textColor(content.color as 'green' | 'blue' | 'orange' | 'gray')}`}>
                {t(content.title)}
              </Typography>
              <Typography variant="h5" className="mt-2">
                {t(content.description)}
              </Typography>
            </div>
          ))}
        </div>
        {/* </ScrollContainer> */}
      </div>
    </div>
  );
};

export default OurValues;
