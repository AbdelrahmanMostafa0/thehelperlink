// react
import { ReactNode } from 'react';

// next js
import { useRouter } from 'next/router';

// i18next
import { useTranslation } from 'next-i18next';

// types
import { IEvent } from '@src/@types/calendarEvent';

// utils
import { addSuffixDay } from '@src/utils/addSuffixDay';
import { formatDateTimeParts } from '@src/utils/dateConvertor';

// luxon
import { DateTime } from 'luxon';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// components
import Typography from '@src/components/Typography';

interface IProps {
  children?: ReactNode;
  event: IEvent;
  onClick: () => void;
}

const CloseEventCard: React.FC<IProps> = ({ event, onClick }) => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const { userState } = useUserStore((state) => state);
  const editable = userState?.userType === 'employer';
  const { date, time } = formatDateTimeParts(event?.start, router.locale || '');
  const user = event.extendedProps?.attendee;

  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-4 px-4 py-3 rounded-md w-full cursor-pointer ${
        editable ? 'bg-lightGreen-300' : 'bg-darkOrange-300'
      }`}
      tabIndex={0}
      aria-label={`${t('reminder')}: ${t('meetingWith')} ${user?.firstName} ${user?.lastName}`}
      role="button">
      <Typography variant="body2" fontweight="medium">
        {t('reminder')}: {t('meetingWith')} {user?.firstName} {user?.lastName}
      </Typography>
      <div className="flex justify-between gap-3 flex-wrap">
        <Typography variant="caption" fontweight="book">
          {router.locale !== 'ar-SA' ? addSuffixDay(+date.day) : date.day} {date.month} {date.year}
        </Typography>
        <Typography variant="caption" fontweight="book">
          {time.hour}:{time.minute} {time.period}
        </Typography>
      </div>
    </div>
  );
};

export default CloseEventCard;
