import { INotification } from '@src/@types/notification';
import Typography from '@src/components/Typography';
import { formatDateTimeParts } from '@src/utils/dateConvertor';
import { useRouter } from 'next/router';

interface IProps {
  notif: INotification;
  t: any;
}

const NotificationMessage: React.FC<IProps> = ({ notif, t }) => {
  const router = useRouter();
  const { date, time } = formatDateTimeParts(
    notif.extraData?.meeting?.start || '',
    router.locale || ''
  );

  switch (notif.type) {
    case 'staff':
      return <Typography variant="caption">{notif.message}</Typography>;
    case 'new-applicant':
      return (
        <Typography variant="caption">
          {t('youReceivedNewApplicationFrom')}{' '}
          <span className="font-heavy capitalize">
            {notif.extraData?.helper?.firstName} {notif.extraData?.helper?.lastName}
          </span>{' '}
          {t('for')} <span className="font-heavy capitalize">{notif.extraData?.job?.title}</span>.
        </Typography>
      );
    case 'event-request-created':
      return (
        <Typography variant="caption">
          {t('youReceivedAnInterviewFrom')}{' '}
          <span className="font-heavy capitalize">
            {notif.extraData?.meeting?.employer?.firstName}{' '}
            {notif.extraData?.meeting?.employer?.lastName}
          </span>{' '}
          {t('on')}{' '}
          <span className="font-heavy capitalize">
            {date.day} {date.month} {date.year}
          </span>{' '}
          {/* {t('at')} */}{' '}
          <span className="font-heavy uppercase">
            {time.hour}:{time.minute} {time.period}
          </span>
          .
        </Typography>
      );
    case 'event-request-edited':
      return (
        <Typography variant="caption">
          {t('yourMeetingGotUpdatedBy')}{' '}
          <span className="font-heavy capitalize">
            {notif.extraData?.meeting?.employer?.firstName}{' '}
            {notif.extraData?.meeting?.employer?.lastName}
          </span>{' '}
          {t('on')}{' '}
          <span className="font-heavy capitalize">
            {date.day} {date.month} {date.year}
          </span>{' '}
          {/* {t('at')}{' '} */}
          <span className="font-heavy uppercase">
            {time.hour}:{time.minute} {time.period}
          </span>
          .
        </Typography>
      );
    case 'event-request-deleted':
      return (
        <Typography variant="caption">
          {t('yourMeetingGotCanceledBy')}{' '}
          <span className="font-heavy capitalize">
            {notif.extraData?.meeting?.employer?.firstName}{' '}
            {notif.extraData?.meeting?.employer?.lastName}
          </span>{' '}
          {t('on')}{' '}
          <span className="font-heavy capitalize">
            {date.day} {date.month} {date.year}
          </span>{' '}
          {/* {t('at')}{' '} */}
          <span className="font-heavy uppercase">
            {time.hour}:{time.minute} {time.period}
          </span>
          .
        </Typography>
      );
    case 'event-request-answer':
      return (
        <Typography variant="caption">
          <span className="font-heavy capitalize">
            {notif.extraData?.meeting?.helper?.firstName}{' '}
            {notif.extraData?.meeting?.helper?.lastName}
          </span>{' '}
          {t('acceptedTheMeetingOn')}{' '}
          <span className="font-heavy capitalize">
            {date.day} {date.month} {date.year}
          </span>{' '}
          {/* {t('at')}{' '} */}
          <span className="font-heavy uppercase">
            {time.hour}:{time.minute} {time.period}
          </span>
          .
        </Typography>
      );
    case 'application-status':
      return (
        <Typography variant="caption">
          {t('youAreSelectedFor')}{' '}
          <span className="font-heavy capitalize">{notif.extraData?.job?.title}</span>.
        </Typography>
      );
    default:
      return <></>;
  }
};

const imageDetector = (notif: INotification, userType: 'employer' | 'helper') => {
  switch (notif.type) {
    case 'staff':
      return '/images/logo.png';
    case 'new-applicant':
      return notif.extraData?.helper?.profileImage?.url || '/images/user-avatar.png';
    case 'event-request-created':
      return notif.extraData?.meeting?.employer?.profileImage?.url || '/images/user-avatar.png';
    case 'event-request-edited':
      return notif.extraData?.meeting?.employer?.profileImage?.url || '/images/user-avatar.png';
    case 'event-request-deleted':
      return notif.extraData?.meeting?.employer?.profileImage?.url || '/images/user-avatar.png';
    case 'event-request-answer':
      return notif.extraData?.meeting?.helper?.profileImage?.url || '/images/user-avatar.png';
    case 'application-status':
      return userType === 'employer'
        ? '/images/notification_icon_green.png'
        : '/images/notification_icon_orange.png';
    default:
      return '';
  }
};

export { imageDetector, NotificationMessage };
