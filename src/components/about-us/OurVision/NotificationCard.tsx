// react & next js
import { ReactNode } from 'react';
import Image from 'next/image';

// EXTERNAL PACKAGES START
// i18next
import { useTranslation } from 'next-i18next';
// EXTERNAL PACKAGES END

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';

interface IProps {
  children?: ReactNode;
}

const NotificationCard: React.FC<IProps> = () => {
  const { t } = useTranslation('about-us') as any;

  return (
    <div className="slg:-top-[80px] smd:flex smd:top-[50px] ssm:scale-75 sxs:-top-[80px] shadow-custom-deep-shadow rounded-10 px-5 py-4 bg-white flex gap-4 absolute top-[50px] ltr:-right-[20px] ltr:left-unset rtl:-left-[20px] rtl:right-unset max-w-[320px]">
      <Image
        src="/images/avatarNotif.png"
        alt="Interview request"
        width={54}
        height={54}
        className="h-[54px] rounded-full bg-darkBlue-100 object-cover object-center"
      />
      <div className="flex flex-col gap-3 items-start">
        <Typography
          fontweight="heavy"
          textTransform="first-letter-capital"
          variant="caption"
          className="text-lightBlue-500 py-1 px-2 rounded-sm bg-lightBlue-100">
          {t('interviewRequest')}
        </Typography>
        <Typography variant="caption">
          {t('youRecievedInterview')} <span className="font-medium">{t('salmaan')}</span> {t('on')}{' '}
          <span className="font-medium">{t('interviewTime')}</span>
        </Typography>
        <div className="flex items-center gap-1">
          <Button color="green">
            <Typography variant="caption">{t('accept')}</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
