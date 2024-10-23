// react
import { useState } from 'react';

// next js
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// i18next
import { useTranslation } from 'next-i18next';

// utils
import { addSuffixDay } from '@src/utils/addSuffixDay';
import { formatDateTimeParts } from '@src/utils/dateConvertor';

// icons
import { CloseV2, Trash, Edit } from '@src/assets/icons';

// zustand store
import { useUserStore } from '@src/zustand_stores/user';

// types
import { IAttendee, IEvent } from '@src/@types/calendarEvent';

// api
import { acceptEvent } from '@src/api/PUT/acceptEvent';

// components
import Typography from '@src/components/Typography';
import Button from '@src/components/Button';
import Modal from '@src/components/Modal';
import Spinner from '@src/components/Spinner';

interface IProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  setIsEventClicked: React.Dispatch<React.SetStateAction<boolean>>;
  selectedHelper: IAttendee | null;
  onEdit: (eventData: IEvent) => void;
  onRemove: () => void;
  onAcceptEvent: () => void;
  selectedDate: {
    start: string | null;
    end: string | null;
  };
  selectedEventId: string;
}

const EventModal: React.FC<IProps> = ({
  modalOpen,
  setModalOpen,
  selectedHelper,
  setIsEventClicked,
  onEdit,
  onRemove,
  onAcceptEvent,
  selectedDate,
  selectedEventId,
}) => {
  const router = useRouter();
  const { t } = useTranslation('user') as any;
  const [loading, setLoading] = useState(false);
  const user = selectedHelper;
  const { userState } = useUserStore((state) => state);
  const editable = userState?.userType === 'employer';
  const {
    date: startDate,
    time: startTime,
    weekday: startWeekDay,
  } = formatDateTimeParts(selectedDate?.start || '', router.locale || '');

  const { date: endDate, time: endTime } = formatDateTimeParts(
    selectedDate?.end || '',
    router.locale || ''
  );

  return (
    <Modal
      open={modalOpen}
      setOpen={setModalOpen}
      hideCloseIcon
      className="sm:min-w-[393px] min-w-[auto]"
      onClose={() => {
        setIsEventClicked(false);
        setModalOpen(false);
      }}>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex w-full items-center gap-3 justify-end">
          {/* deleting the event */}
          {editable && (
            <span tabIndex={0} role="button" aria-label="close modal" onClick={onRemove}>
              <Trash className="w-5 h-5" />
            </span>
          )}
          {/* editing the event */}
          {editable && (
            <span
              tabIndex={0}
              role="button"
              aria-label="close modal"
              onClick={() => {
                if (selectedHelper && selectedDate.start && selectedDate.end) {
                  onEdit({
                    end: selectedDate.end,
                    start: selectedDate.start,
                    extendedProps: { attendee: selectedHelper },
                    id: selectedEventId,
                    title: `${t('meetingWith')} ${selectedHelper?.firstName} ${
                      selectedHelper?.lastName
                    }`,
                  });
                }
              }}>
              <Edit className="w-5 h-5" />
            </span>
          )}
          <span
            tabIndex={0}
            role="button"
            aria-label="close modal"
            onClick={() => {
              setIsEventClicked(false);
              setModalOpen(false);
            }}>
            <CloseV2 className="w-5 h-5" />
          </span>
        </div>
        <Image
          src={user?.profileImage || '/images/user-avatar.png'}
          alt={user?.firstName || ''}
          width={42}
          height={42}
          className="rounded-full min-w-[42px] min-h-[42px] max-h-[42px] object-cover"
        />
        <div className="flex flex-col gap-2">
          <Typography textTransform="first-letter-capital">
            {t('meetingWith')} {user?.firstName} {user?.lastName}
          </Typography>
          <Typography
            variant="caption"
            className={`${
              editable ? 'bg-lightGreen-500' : 'bg-darkOrange-500 text-white'
            } self-start px-5 py-0.5 rounded-full`}
            textTransform="first-letter-capital">
            {user?.accepted ? (editable ? t('helperAccepted') : t('youAccepted')) : t('pending')}
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="caption" className="text-darkBlue-300">
            {startWeekDay},{' '}
            {router.locale === 'en-GB' ? addSuffixDay(+startDate.day) : startDate.day}{' '}
            {startDate.month} {startDate.year}
          </Typography>
          <Typography variant="caption" className="text-darkBlue-300">
            {startTime.hour}:{startTime.minute} {startTime.period} - {endTime.hour}:{endTime.minute}{' '}
            {endTime.period}
          </Typography>
        </div>
        {!user?.accepted && !editable ? (
          <Button
            disabled={loading}
            color="green"
            className=""
            onClick={async () => {
              setLoading(true);
              acceptEvent(+selectedEventId || 0, router, t)
                .then(() => {
                  onAcceptEvent();
                  setLoading(false);
                })
                .catch(() => setLoading(false));
            }}>
            {loading ? (
              <Spinner />
            ) : (
              <Typography variant="caption">{t('acceptThisMeeting')}</Typography>
            )}
          </Button>
        ) : (
          <Link
            className="w-full flex"
            href={user?.wherebyLink || ''}
            target="_blank"
            onClick={(e) => (!user?.accepted || !user?.wherebyLink) && e.preventDefault()}>
            <Button
              disabled={!user?.accepted || !user?.wherebyLink}
              className="w-full"
              color={editable ? 'green' : 'orange'}>
              <Typography variant="caption">{t('joinVideoCall')}</Typography>
            </Button>
          </Link>
        )}
      </div>
    </Modal>
  );
};

export default EventModal;
