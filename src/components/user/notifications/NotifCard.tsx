// react
import { ReactNode, useState } from 'react';

// next js
import { useRouter } from 'next/router';
import Image from 'next/image';

// i18next
import { useTranslation } from 'next-i18next';

// types
import { INotification } from '@src/@types/notification';

// api
import { acceptEvent } from '@src/api/PUT/acceptEvent';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import {
  NotificationMessage,
  imageDetector,
} from '@src/components/user/notifications/NotificationMessage';
import Spinner from '@src/components/Spinner';

interface IProps {
  children?: ReactNode;
  notif: INotification;
  refetch: () => void;
}

const NotifCard: React.FC<IProps> = ({ notif, refetch }) => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const user = useUserStore((state) => state.userState);
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`shadow-custom-deep-shadow rounded-10 px-5 py-4 flex gap-4 max-w-[500px] ${
        notif.unseen
          ? user?.userType === 'employer'
            ? 'bg-lightGreen-100'
            : 'bg-darkOrange-100'
          : 'bg-white'
      }`}>
      <Image
        src={imageDetector(notif, user?.userType || 'helper')}
        alt="user"
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
          {t(notif.type)}
        </Typography>
        <NotificationMessage notif={notif} t={t} />
        {!notif.extraData?.meeting?.accepted && notif.type === 'event-request-created' && (
          <Button
            disabled={loading}
            color="green"
            className="min-w-[105px] min-h-[38px]"
            onClick={async () => {
              setLoading(true);
              acceptEvent(notif.extraData?.meeting?.id || 0, router, t)
                .then(() => {
                  refetch();
                  setLoading(false);
                })
                .catch(() => setLoading(false));
            }}>
            {loading ? <Spinner /> : <Typography variant="caption">{t('accept')}</Typography>}
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotifCard;
