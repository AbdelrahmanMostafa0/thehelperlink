// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// components
import ImageInsetContainer from '@src/components/global/ImageInsetContainer';

interface IProps {
  children?: ReactNode;
}

interface IInsetContainerProps {
  children?: ReactNode;
  image: string;
  isLogo?: boolean;
  className?: string;
  position?: 'relative' | 'absolute';
}

const TopSectionImages: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('layout');

  return (
    <div className="flex items-center justify-end h-[385px] w-[365px] relative ssm:scale-75 sxs:absolute sxs:-left-[50px] sxs:top-0">
      <ImageInsetContainer
        position="absolute"
        image="/images/person.png"
        className="ltr:left-[84px] ltr:right-unset rtl:right-[84px] top-[10px] rtl:left-unset"
      />
      <ImageInsetContainer
        image="/images/person2.png"
        position="absolute"
        className="top-[200px] ltr:left-[251px] ltr:right-unset rtl:right-[251px] rtl:left-unset"
      />
      {/* changed */}
      {/* <div className="ltr:bg-[url('/images/snakeRight.png')] rtl:bg-[url('/images/snakeLeft.png')] bg-center bg-no-repeat bg-contain w-[113px] h-[86px] absolute top-[-60px] ltr:right-[108px] ltr:left-unset rtl:left-[108px] rtl:right-unset" /> */}
      <div className="ltr:bg-[url('/images/snakeLeft.png')] rtl:bg-[url('/images/snakeRight.png')] bg-center bg-no-repeat bg-contain w-[113px] h-[86px] absolute top-[137px] ltr:right-[82px] ltr:left-unset rtl:left-[82px] rtl:right-unset -rotate-90" />
    </div>
  );
};

export default TopSectionImages;
