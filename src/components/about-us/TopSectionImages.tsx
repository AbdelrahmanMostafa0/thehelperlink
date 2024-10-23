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
    <div className="flex items-center justify-end min-h-[385px] min-w-[365px]">
      <ImageInsetContainer fill={false} image="/images/logo.png">
        <ImageInsetContainer
          position="absolute"
          image="/images/person.png"
          className="top-[-125px] ltr:left-[-214px] ltr:right-unset rtl:right-[-214px] rtl:left-unset"
        />
        <ImageInsetContainer
          image="/images/person2.png"
          position="absolute"
          className="top-[120px] ltr:left-[-221px] ltr:right-unset rtl:right-[-221px] rtl:left-unset"
        />
        {/* changed */}
        <div className="ltr:bg-[url('/images/snakeRight.png')] rtl:bg-[url('/images/snakeLeft.png')] bg-center bg-no-repeat bg-contain w-[113px] h-[86px] absolute top-[-60px] ltr:right-[108px] ltr:left-unset rtl:left-[108px] rtl:right-unset" />
        <div className="ltr:bg-[url('/images/snakeLeft.png')] rtl:bg-[url('/images/snakeRight.png')] bg-center bg-no-repeat bg-contain w-[113px] h-[86px] absolute top-[105px] ltr:right-[112px] ltr:left-unset rtl:left-[112px] rtl:right-unset" />
      </ImageInsetContainer>
    </div>
  );
};

export default TopSectionImages;
