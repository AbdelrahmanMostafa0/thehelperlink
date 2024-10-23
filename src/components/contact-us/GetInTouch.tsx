// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';

interface IProps {
  children?: ReactNode;
}

const GetInTouch: React.FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation('contact-us');

  return (
    <div className="flex flex-col gap-8 py-11 md:px-20 px-5  pb-24 bg-white rounded-10 text-center">
      <Typography variant="h3">{t('getInTouch')}</Typography>
      <div className="flex flex-col gap-10">
        {/* <Typography>{t('phone')}</Typography>
        <Typography>{t('address')}</Typography> */}
        <Typography>info@thehelperlink.com</Typography>
      </div>
    </div>
  );
};

export default GetInTouch;
