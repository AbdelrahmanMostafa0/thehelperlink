// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// react-indiana-drag-scroll
import ScrollContainer from 'react-indiana-drag-scroll';

// components
import Typography from '@src/components/Typography';

interface IProps {
  children?: ReactNode;
}

const Testimotionals: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('about-us');
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex lg:flex-row flex-col-reverse justify-start items-center gap-20 w-full max-w-7xl mx-auto px-4">
        <Typography className="text-h6  text-lightBlue-500">{t('clientsPartner')}</Typography>
      </div>
      <div className="flex lg:flex-row flex-col-reverse justify-start items-center gap-20 w-full max-w-7xl mx-auto px-4">
        <Typography className="text-5xl text-darkBlue-500">{t('testimonials')}</Typography>
      </div>
      <div className="flex lg:flex-row flex-col-reverse justify-start items-center gap-20 w-full max-w-7xl mx-auto px-4 mb-16">
        <div className="w-3/6">
          <Typography className="text-darkBlue-500 text-body3">{t('weSoOpinion')}</Typography>
        </div>
      </div>
      {/* Slider Testimonials */}
      <div className="flex flex-col gap-24 w-full">
        <ScrollContainer
          horizontal
          // vertical
          nativeMobileScroll
          hideScrollbars
          className="flex w-full justify-start items-start px-4 gap-4 md:gap-6 ">
          {/* {testimonial.map((content, index) => (
            <div
              key={index}
              className={`md:min-w-[549px] md:min-h-[400px] min-w-[340px] min-h-[364px] rounded-20 flex items-start flex-col gap-12 p-12 bg-white`}>
              <div>
                <content.icon className={'-mt-10'} />
              </div>
              <Typography className={`text-2xl text-darkBlue-500`}>{t(content.comment)}</Typography>
              <Typography className="text-h6 py-8 text-darkBlue-500">
                {t(content.author)}
              </Typography>
            </div>
          ))} */}
        </ScrollContainer>
      </div>
    </div>
  );
};

export default Testimotionals;
