// next js
import { useRouter } from 'next/router';
import Image from 'next/image';

// i18next
import { useTranslation } from 'next-i18next';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';

interface IProps {}

const EventCard: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const { t } = useTranslation('about-us') as any;

  return (
    <div
      className={`flex absolute top-[300px] ltr:left-[13px] ltr:right-unset rtl:right-[13px] rtl:left-unset w-auto sm:w-[330px] h-auto scrollbar-hidden overflow-x-auto p-5 bg-white shadow-custom-shadow rounded-20 transition-all duration-300 ease-in-out visible opacity-100 sxs:scale-75 sxs:-left-[50px]`}>
      <div className="flex flex-col gap-5 w-full">
        <Image
          // src={user? || (isHelper ? '/images/user-avatar.png' : '/images/company-avatar.png')}
          src={'/images/user2.png'}
          alt="Masooma"
          width={42}
          height={42}
          className="rounded-full min-w-[42px] min-h-[42px] max-h-[42px] object-cover"
        />
        <Typography textTransform="first-letter-capital">{t('meetingWithMasooma')}</Typography>
        <div className="flex flex-col gap-2">
          <Typography variant="caption" className="text-darkBlue-300">
            {t('friday')}
          </Typography>
          <Typography variant="caption" className="text-darkBlue-300">
            {t('startTime')}
          </Typography>
        </div>
        <div className="flex items-center gap-1 ssm:justify-start justify-center">
          <Button className="w-full" color="green">
            <Typography variant="caption" className="whitespace-nowrap">
              {t('joinVideoCall')}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
