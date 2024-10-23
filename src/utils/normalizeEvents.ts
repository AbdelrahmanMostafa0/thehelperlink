import { IEvent, IMeeting } from '@src/@types/calendarEvent';

export const normalizeEvent = (events: IMeeting[], isHelper: boolean, t: any): IEvent[] => {
  return events.map((event) => {
    return {
      id: event.id.toString(),
      title: `${t('meetingWith')} ${isHelper ? event.helper.firstName : event.employer.firstName} ${
        isHelper ? event.helper.lastName : event.employer.lastName
      }`,
      start: event.start,
      end: event.end,
      extendedProps: {
        attendee: {
          id: isHelper ? event.helper.id : event.employer.id,
          firstName: isHelper ? event.helper.firstName : event.employer.firstName,
          lastName: isHelper ? event.helper.lastName : event.employer.lastName,
          profileImage: isHelper
            ? event.helper?.profileImage?.url
            : event.employer?.profileImage?.url,
          accepted: event.accepted,
          wherebyLink: isHelper ? event.whereby?.roomUrl : event.whereby?.hostRoomUrl,
        },
      },
    };
  });
};
